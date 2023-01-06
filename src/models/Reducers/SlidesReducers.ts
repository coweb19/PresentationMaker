import { Program } from "typescript"
import { createNewId, deepFreeze } from "../CommonFunctions/supportFunctions/commonOperations"
import { createDefaultSlide, searchChangedSlideIndex, searchChangedSlideIndexById, supportSlidesWithoutSelectedSlides, supportSortingSelectedSlides } from "../CommonFunctions/supportFunctions/supportSlideOperations"
import { ActionType, borderLightType, MainProg, Programm, Slide } from "../types"


export {
  re_addSlide,
  re_moveSlide,
  re_setSelectedSlides,
  re_deleteSlide,
  re_removeOneElemFromSelectedSlides,
  re_switchSlide
}


function re_addSlide(state: Programm): Programm {

  deepFreeze(state)

  const mainProg = state.mainProg

  const commonDeps = state.commonDeps 
    
  const newSlide: Slide = createDefaultSlide();

  return {
    mainProg: {...mainProg,
      currentPresentation: {
        ...mainProg.currentPresentation,
        slides: [
            ...mainProg.currentPresentation.slides,
            newSlide
        ]
      },
      selectedSlides: [newSlide.id],
      selectedElements: []
    },
    commonDeps: {
      ...commonDeps,
      canDeleteSlides: true,
      elemsMoveCount: 0,
      saveToArch: true,
      slideBorderLight: {
        borderLightPlace: 'unset',
        slideId: ''
      },      
    }          
  } 
}



function re_setSelectedSlides(state: MainProg, action: ActionType) {
  return {
    ...state,
    selectedSlides: action.payload,
    selectedElements: []
  }
}

function re_deleteSlide(state: MainProg, action: ActionType) {
  let oldPos: number = state.currentPresentation.slides.length - 1;

  for (let i = 0; i < state.currentPresentation.slides.length; i++) {
    if ((state.selectedSlides.includes(state.currentPresentation.slides[i].id)) && (oldPos >= i)) {
      oldPos = i;
    }
  }

  const slidesWithoutSelectedSlides: Array<Slide> = supportSlidesWithoutSelectedSlides(state.currentPresentation.slides, state.selectedSlides)

  return {
    ...state,
    currentPresentation: {
    ...state.currentPresentation,
    slides: slidesWithoutSelectedSlides
    },
    selectedSlides:
      (slidesWithoutSelectedSlides.length === 0) 
      ? []
      : (slidesWithoutSelectedSlides.length - 1 < oldPos)
      ? [slidesWithoutSelectedSlides[oldPos - 1].id]
      : (slidesWithoutSelectedSlides.length - 1 == oldPos)
      ? [slidesWithoutSelectedSlides[oldPos].id]
      : [slidesWithoutSelectedSlides[slidesWithoutSelectedSlides.length - 1].id]
    }    
}

export function re_copySlides(state: Programm): Programm {
  let slidesToCopy: Array<string> = []
  const selectedSlides: Array<string> = state.mainProg.selectedSlides

  return {
    ...state,
    commonDeps: {
      ...state.commonDeps,
      copyElemsArr: [],
      copySlidesArr: selectedSlides
    }
  }
}

export function re_pasteSlides(state: Programm): Programm {
  const prevState = {...state}
  deepFreeze(prevState)
  const slides = prevState.mainProg.currentPresentation.slides
  const copySlidesId = prevState.commonDeps.copySlidesArr

  let newSelectedSlides: Array<string> = []

  let pasteSlides: Array<Slide> = []

  for(let i = 0; i < slides.length; i++) {
    if(copySlidesId.includes(slides[i].id)){
      pasteSlides.push({...slides[i]})
    }
  }

  pasteSlides.forEach((slide: Slide) => {
    slide.id = createNewId(); 
    newSelectedSlides.push(slide.id);
  })

  const indexes: Array<number> = [] 
  copySlidesId.forEach(slideId => indexes.push(searchChangedSlideIndexById(slides, slideId)))
  const maxSlideIndex: number = Math.max.apply(null, indexes)

  const newSlidesBefor: Array<Slide> = []
  slides.forEach((slide, i = 0) => {
    if (i <= maxSlideIndex) {
      newSlidesBefor.push(slides[i])
    }
  })

  const newSlidesAfter: Array<Slide> = []
  slides.forEach((side, i = 0) => {
    if( i > maxSlideIndex) {
      newSlidesAfter.push(slides[i])
    }
  })

  const newSlides: Array<Slide> = [
    ...newSlidesBefor,
    ...pasteSlides,
    ...newSlidesAfter
  ]

  return {
    mainProg: {
      ...state.mainProg,
      currentPresentation: {
        ...state.mainProg.currentPresentation,
        slides: newSlides
      },
      selectedSlides: newSelectedSlides
    },
    commonDeps: {
      canDeleteSlides: true,
      elemsMoveCount: 0,
      saveToArch: true,
      slideBorderLight: {
          borderLightPlace: 'unset',
          slideId: ''
      },
      copyElemsArr: [],
      copySlidesArr: newSelectedSlides,
      playerIsOpen: false
    }
  }
}



function re_moveSlide(state: MainProg, action: ActionType) {

  const prog = state
  const posBefore = action.payload
  const selectedSlides = state.selectedSlides
  const slides = state.currentPresentation.slides

  let newSelectedSlides: Array<string> = []

  let sortedSelectedSlides: Array<Slide> = supportSortingSelectedSlides(prog.currentPresentation.slides, prog.selectedSlides);
  let slidesWithoutSelectedSlides: Array<Slide> = supportSlidesWithoutSelectedSlides(prog.currentPresentation.slides, prog.selectedSlides);
  
  const indexes: Array<number> = [] 
  selectedSlides.forEach(slideId => indexes.push(searchChangedSlideIndexById(slides, slideId)))
  const minSlideIndex: number = Math.min.apply(null, indexes)

  sortedSelectedSlides.forEach((slide: Slide) => newSelectedSlides.push(slide.id))


  return {
    ...prog,
    currentPresentation: {
      ...prog.currentPresentation,
      slides: 
        (posBefore == 0) 
          ? [...sortedSelectedSlides, ...slidesWithoutSelectedSlides]
          : (prog.currentPresentation.slides.length == posBefore)
          ? [...slidesWithoutSelectedSlides, ...sortedSelectedSlides]
          : (state.selectedSlides.length == 1 || (state.selectedSlides.length != 1 && posBefore <= minSlideIndex))
          ? [
              ...slidesWithoutSelectedSlides.filter((e, i) => i < posBefore),
              ...sortedSelectedSlides,
              ...slidesWithoutSelectedSlides.filter((e, i) => i >= posBefore)
            ]
          : [
              ...slidesWithoutSelectedSlides.filter((e, i) => i < posBefore - (sortedSelectedSlides.length - 1)),
              ...sortedSelectedSlides,
              ...slidesWithoutSelectedSlides.filter((e, i) => i >= posBefore - (sortedSelectedSlides.length - 1))
            ]         
    }
  }
}



function re_removeOneElemFromSelectedSlides(state: MainProg, action: ActionType): MainProg {

  const selectedSlides: Array<string> = [...state.selectedSlides]
  let newSlides: Array<string> = []
  for(let i = 0; i < selectedSlides.length; i++) {
    if (selectedSlides[i] !== action.payload) {
      newSlides.push(selectedSlides[i])
    }
  }

  return {
      ...state,
      selectedSlides: newSlides
  }
}

export function re_setSlideBorderLight(action: ActionType): borderLightType {
  return {
      borderLightPlace: action.payload.borderLightPlace,
      slideId: action.payload.slideId
    } 
}


function re_switchSlide(mainProg: MainProg, action: ActionType): MainProg {
  const slides = mainProg.currentPresentation.slides
  const selectedSlides = mainProg.selectedSlides
  let nextSlideId = selectedSlides[0]
  const selectSlideIndex = searchChangedSlideIndex(slides, selectedSlides)

  if (action.payload == 'forward' && selectSlideIndex + 1 < slides.length) {
    nextSlideId = slides[selectSlideIndex + 1].id
  }

  if (action.payload == 'back' && selectSlideIndex - 1 >= 0) {
    nextSlideId = slides[selectSlideIndex - 1].id
  }
  
  return {
    ...mainProg,
    selectedSlides: [nextSlideId]
  }
}
import { createNewId, deepFreeze } from '../CommonFunctions/supportFunctions/commonOperations'
import { createPictureObj, createEmtyTextObj, createShapeObj, getChangedElem, getElemsWithChangedElem, getElemsWithNewElem, getNewElemWithNewPosition, getNewResizedElem, getNewShapeElem, getNewTextElem, searchChangedElemIndexById } from '../CommonFunctions/supportFunctions/supportElemOperations'
import { searchChangedSlideIndex, getSlidesWithChangedSlide, getSlideWithNewBackground, getSlideWithChangedElems } from '../CommonFunctions/supportFunctions/supportSlideOperations'
import { isColor, isPictureObj, isShapeObj, isTextObj } from '../CommonFunctions/typesChecking'
import {
  Programm,
  MainProg,
  Slide,
  Picture,
  PictureObj,
  TextObj,
  Color,
  ShapeObj,
  borderLightType,
  ActionType,
} from '../types'


export {
  re_setSlideBackground,
  re_addPictureObj,
  re_addTextObj,
  re_changeTextObj,
  re_addShapeObj,
  re_changeShapeObj,
  re_resizeElement,
  re_changeElemPosition,
  re_setSelectedElement,
  re_removeOneElemFromSelectedElems,
  re_deleteSelectedElements,
  re_copyElems,
  re_pasteElems
}


function re_setSlideBackground(state: MainProg, action: ActionType) {

  let backgroundObj: Picture | Color = {
    hexColor: '', 
    type: 'color',
  }

  deepFreeze(state)
  
  const changedSlideIndex: number = searchChangedSlideIndex(state.currentPresentation.slides, state.selectedSlides)

  if (isPictureObj(action.payload)) {
    backgroundObj = {
      imgB64: action.payload.imgB64,
      type: 'picture',
      fillColor: 'unset',
      borderColor: 'unset',
      borderWidth: 1
    }
  }
  if (isColor(action.payload)) {
    backgroundObj = {
      hexColor: action.payload.hexColor, 
      type: 'color',
    }
  }
  const changedSlide = getSlideWithNewBackground(state, changedSlideIndex, backgroundObj)

  const slidesWithChangedSlide = getSlidesWithChangedSlide(state, changedSlide, changedSlideIndex)

  return {
      ...state,
      currentPresentation: {
        ...state.currentPresentation,
        slides: slidesWithChangedSlide
      } 
  }
}




function re_addPictureObj(state: MainProg, action: ActionType) {
  

  const width = action.payload.width
  const height = action.payload.height
  const imgB64 = action.payload.imgB64


  deepFreeze(state)

  const changedSlideIndex = searchChangedSlideIndex(state.currentPresentation.slides, state.selectedSlides)

  const newPictureObj = createPictureObj(width, height, imgB64)
  const changedElems = getElemsWithNewElem(state, newPictureObj, changedSlideIndex)

  const slideWithChangedElems = getSlideWithChangedElems(state, changedElems, changedSlideIndex)
  const slidesWithChangedSlide = getSlidesWithChangedSlide(state, slideWithChangedElems, changedSlideIndex)

  return {
      ...state,
      currentPresentation: {
          ...state.currentPresentation,
          slides: slidesWithChangedSlide
      },
      selectedElements: [newPictureObj.id]
  }           
}



function re_addTextObj(state: MainProg, action: ActionType) {

  deepFreeze(state)
  
  const changedSlideIndex = searchChangedSlideIndex(state.currentPresentation.slides, state.selectedSlides)

  const newTextObj = createEmtyTextObj()

  const changedElems = getElemsWithNewElem(state, newTextObj, changedSlideIndex)

  const slideWithChangedElems = getSlideWithChangedElems(state, changedElems, changedSlideIndex)
  const slidesWithChangedSlide = getSlidesWithChangedSlide(state, slideWithChangedElems, changedSlideIndex)

  return {
    ...state,
    currentPresentation: {
        ...state.currentPresentation,
        slides: slidesWithChangedSlide
    },
    selectedElements: [newTextObj.id]        
  }
}


function re_changeTextObj(state: MainProg, action: ActionType) { 
  
  const paramToChange = action.payload.paramToChange
  const newParam = action.payload.newParam
  const id = action.payload.id

  deepFreeze(state)

  const changedSlideIndex = searchChangedSlideIndex(state.currentPresentation.slides, state.selectedSlides)
  const elemsLength = state.currentPresentation.slides[changedSlideIndex].elements.length

  let changedElemsArr = []

  if (action.payload.paramToChange !== 'text') {
    for (let i = 0; i < elemsLength; i++) {
      let changedElem = getChangedElem(state.currentPresentation.slides, changedSlideIndex, i)    
      if(isTextObj(changedElem) && state.selectedElements.includes(changedElem.id)) {
        changedElem = getNewTextElem(changedElem, newParam, paramToChange)
      }
      changedElemsArr.push(changedElem)
    }
  } else { 

    const changedElemIndex = searchChangedElemIndexById(state.currentPresentation.slides, changedSlideIndex, id)
    
    let changedElem = getChangedElem(state.currentPresentation.slides, changedSlideIndex, changedElemIndex)
    
    if (isTextObj(changedElem)) {
      changedElem = getNewTextElem(changedElem, newParam, paramToChange)
    }

    changedElemsArr = getElemsWithChangedElem(state, changedSlideIndex, changedElemIndex, changedElem)
  }
  const slideWithChangedElems = getSlideWithChangedElems(state, changedElemsArr, changedSlideIndex)
  
  const slidesWithChangedSlide = getSlidesWithChangedSlide(state, slideWithChangedElems, changedSlideIndex)
  
  return {
      ...state,
      currentPresentation: {
          ...state.currentPresentation,
          slides: slidesWithChangedSlide
      }
  }  
}


function re_addShapeObj(state: MainProg, action: ActionType) {

  deepFreeze(state)
  
  const changedSlideIndex = searchChangedSlideIndex(state.currentPresentation.slides, state.selectedSlides)

  let newShapeObj: ShapeObj
  newShapeObj = createShapeObj(action.payload)
  
  const changedElems = getElemsWithNewElem(state, newShapeObj, changedSlideIndex)
  const slideWithChangedElems = getSlideWithChangedElems(state, changedElems, changedSlideIndex)
  const slidesWithChangedSlide = getSlidesWithChangedSlide(state, slideWithChangedElems, changedSlideIndex)

  return { 
    ...state,
    currentPresentation: {
        ...state.currentPresentation,
        slides: slidesWithChangedSlide
    },
    selectedElements: []
  }       
}


function re_changeShapeObj(state: MainProg, action: ActionType) {
  deepFreeze(state)
  
  const changedSlideIndex = searchChangedSlideIndex(state.currentPresentation.slides, state.selectedSlides)
  const elemsLength = state.currentPresentation.slides[changedSlideIndex].elements.length
  let changedElemsArr = []

  for (let i = 0; i < elemsLength; i++) {
    let changedElem = getChangedElem(state.currentPresentation.slides, changedSlideIndex, i)    
    if(state.selectedElements.includes(changedElem.id)) {
      if (isShapeObj(changedElem)) {
        changedElem = getNewShapeElem(changedElem, action.payload.newParam, action.payload.paramToChange)
      }
  
      if (isTextObj(changedElem)) {
        changedElem = getNewTextElem(changedElem, action.payload.newParam, action.payload.paramToChange)
      }      
    }
    changedElemsArr.push(changedElem)
  }

  const slideWithChangedElems = getSlideWithChangedElems(state, changedElemsArr, changedSlideIndex)
  const slidesWithChangedSlide = getSlidesWithChangedSlide(state, slideWithChangedElems, changedSlideIndex) 

  return {
      ...state,
      currentPresentation: {
          ...state.currentPresentation,
          slides: slidesWithChangedSlide
    }  
  }  
}


function re_resizeElement(state: MainProg, action: ActionType): MainProg { 
  
  deepFreeze(state)

  const changedSlideIndex = searchChangedSlideIndex(state.currentPresentation.slides, state.selectedSlides)
  const changedElemIndex = searchChangedElemIndexById(state.currentPresentation.slides, changedSlideIndex, action.payload.id)

  let changedElem = getChangedElem(state.currentPresentation.slides, changedSlideIndex, changedElemIndex)
  
  changedElem = getNewResizedElem(changedElem, action.payload.newWidth, action.payload.newHeigth, action.payload.newPosX, action.payload.newPosY)

  const changedElemsArr = getElemsWithChangedElem(state, changedSlideIndex, changedElemIndex, changedElem)
  const slideWithChangedElems = getSlideWithChangedElems(state, changedElemsArr, changedSlideIndex)
  const slidesWithChangedSlide = getSlidesWithChangedSlide(state, slideWithChangedElems, changedSlideIndex)


  return {
    ...state,
    currentPresentation: {
      ...state.currentPresentation,
      slides: slidesWithChangedSlide
    }  
  }
}


function re_changeElemPosition(state: MainProg, action: ActionType) {
  
  deepFreeze(state)

  const changedSlideIndex = searchChangedSlideIndex(state.currentPresentation.slides, state.selectedSlides)

  const changedElemIndex = searchChangedElemIndexById(state.currentPresentation.slides, changedSlideIndex, action.payload.id)
  let changedElem = getChangedElem(state.currentPresentation.slides, changedSlideIndex, changedElemIndex)
  changedElem = getNewElemWithNewPosition(changedElem, action.payload.newX, action.payload.newY)

  let changedElemsArr = getElemsWithChangedElem(state, changedSlideIndex, changedElemIndex, changedElem)  

  const slideWithChangedElems = getSlideWithChangedElems(state, changedElemsArr, changedSlideIndex)
  const slidesWithChangedSlide = getSlidesWithChangedSlide(state, slideWithChangedElems, changedSlideIndex) 

  return {
    ...state,
    currentPresentation: {
      ...state.currentPresentation,
      slides: slidesWithChangedSlide
    }  
  }
}


function re_copyElems(state: Programm): Programm {
  
  const selectedElems: Array<string> = state.mainProg.selectedElements

  return {
    ...state,
    commonDeps: {
      ...state.commonDeps,
      copyElemsArr: [...selectedElems],
      copySlidesArr: []
    }
  }
}


function re_pasteElems(state: Programm): Programm {

  deepFreeze(state)

  const slides = state.mainProg.currentPresentation.slides

  let newElemsToPaste: Array<ShapeObj | PictureObj | TextObj> = []
  let newCopyElemsArr: Array<string> = []
  let newSelectedElems: Array<string> = []

  const copyElemsArr = state.commonDeps.copyElemsArr
  
  slides.forEach((slide: Slide, i = 0) => {
    const elems = [...state.mainProg.currentPresentation.slides[i].elements]
    elems.forEach(elem => {

      if (copyElemsArr.includes(elem.id)) {
        const newElem = {
          ...elem,
          id: createNewId(),
          position: {
            x: elem.position.x + 10,
            y: elem.position.y + 10,
          }
        }
        if (copyElemsArr.includes(newElem.id)) {
          newElem.id = createNewId()
        }
        //console.log(newElem.id, elem.id)
        newElemsToPaste.push(newElem)
        newCopyElemsArr.push(newElem.id)
        newSelectedElems.push(newElem.id)
      }
    })
  })

  const slideIndex = searchChangedSlideIndex(state.mainProg.currentPresentation.slides, state.mainProg.selectedSlides)

  const currSlideElems = state.mainProg.currentPresentation.slides[slideIndex].elements

  let newElems: Array<TextObj | ShapeObj | PictureObj> = [...currSlideElems, ...newElemsToPaste]
  
  const slideWithChangedElems = getSlideWithChangedElems(state.mainProg, newElems, slideIndex)
  const slidesWithChangedSlide = getSlidesWithChangedSlide(state.mainProg, slideWithChangedElems, slideIndex)

  return {
    mainProg: {
      ...state.mainProg,
      currentPresentation: {
        ...state.mainProg.currentPresentation,
        slides: slidesWithChangedSlide
      },
      selectedElements: newSelectedElems
    },
    commonDeps: {
      ...state.commonDeps,
      copyElemsArr: newCopyElemsArr
    }
  }
}


function re_removeOneElemFromSelectedElems(state: MainProg, action: ActionType) {
  const selectedElems: Array<string> = [...state.selectedElements]
  let newElems: Array<string> = []
  for(let i = 0; i < selectedElems.length; i++) {
    if (selectedElems[i] !== action.payload) {
      newElems.push(selectedElems[i])
    }
  }

  return {
      ...state,
      selectedElements: newElems
  }
}


function re_setSelectedElement(state: MainProg, action: ActionType) {
  
  return {
      ...state,
      selectedElements: action.payload
  }
}


function re_deleteSelectedElements(state: MainProg, action: ActionType) { 

  let copySlides: Array<Slide> = state.currentPresentation.slides
  let newSlides: Array<Slide> = [];

  for (let i = 0; i < copySlides.length; i++) {
    newSlides.push({
        ...copySlides[i],
        elements: [...copySlides[i].elements.filter((elem) => !state.selectedElements.includes(elem.id))]
    })
  }

  return {
      ...state,
      currentPresentation: {
          ...state.currentPresentation,
          slides: newSlides
      },
      selectedElements: []
    }  
}


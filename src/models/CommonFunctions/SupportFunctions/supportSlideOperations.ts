import { store } from "../../..";
import { borderLightType, Color, MainProg, Picture, PictureObj, ShapeObj, Slide, TextObj } from "../../types";
import { createNewId } from "./commonOperations";

export {
  createSlideId,
  createDefaultSlide,
  supportSlidesWithoutSelectedSlides,
  supportSortingSelectedSlides,
  checkSecondSlideIsBeyond,
  searchChangedSlideIndexById,
  searchChangedSlideIndex,
  getSlidesWithoutChangedSlide,
  getChangedSlideObj,
  getSlidesWithChangedSlide,
  getSlideWithNewBackground,
  getSlideWithChangedElems,
  getSlideWithChangedBorderLight
}


function createSlideId(isSmallSlide: boolean): string {
  let id: string = createNewId()
  if (isSmallSlide) {
    id += '.small'
  }
  return id
}


function checkSecondSlideIsBeyond(slides: Array<Slide>, firstSlideId: string, secondSlideId: string): boolean {
  let secondSlideIsBeyond = false;
  const firstSlideIndex = searchChangedSlideIndexById(slides, firstSlideId)
  const secondSlideIndex = searchChangedSlideIndexById(slides, secondSlideId)
  if (secondSlideIndex > firstSlideIndex) {
    secondSlideIsBeyond = true
  }
  return secondSlideIsBeyond
}

function searchChangedSlideIndexById(slides: Array<Slide>, id: string): number {
  const searchSlideId = id
  let changedSlideIndex: number = 0
  for (let i = 0; i < slides.length; i++) {     
      if (slides[i].id == searchSlideId) {
          changedSlideIndex = i
      }
  }
  return changedSlideIndex
}


function searchChangedSlideIndex(slides: Array<Slide>, selectedSlides: Array<string>): number {
  const selectedSlide = selectedSlides[0]
  let changedSlideIndex: number = 0
  for (let i = 0; i < slides.length; i++) {     
      if (slides[i].id == selectedSlide) {
          changedSlideIndex = i
      }
  }
  return changedSlideIndex
}


function getChangedSlideObj(prog: MainProg, changedSlideIndex: number): Slide {
  return {...prog.currentPresentation.slides[changedSlideIndex]}
}

function getSlidesWithoutChangedSlide(prog: MainProg, changedSlideIndex: number): Array<Slide> {
  return [...prog.currentPresentation.slides.filter((elem) => elem != prog.currentPresentation.slides[changedSlideIndex])]
}


function getSlideWithNewBackground(prog: MainProg, changedSlideIndex: number, newBackground: Picture | Color): Slide {
  return {
    ...prog.currentPresentation.slides[changedSlideIndex],
    background: newBackground
  }
}

function getSlidesWithChangedSlide(prog: MainProg, changedSlide: Slide, changedSlideIndex: number): Array<Slide> {
  let slidesWithChangedSlide: Array<Slide> = [] 
  for(let i = 0; i < prog.currentPresentation.slides.length; i++) {
    i == changedSlideIndex
      ? slidesWithChangedSlide[i] = changedSlide
      : slidesWithChangedSlide[i] = prog.currentPresentation.slides[i]
  }
  return slidesWithChangedSlide
}


export function getSlides(): Array<Slide> {
  return store.getState().mainProg.currentPresentation.slides
}

export function getSelectedSlides(): Array<string> {
  return store.getState().mainProg.selectedSlides
}


function getSlideWithChangedElems(prevProgState: MainProg, changedElems: Array<PictureObj | TextObj | ShapeObj>, changedSlideIndex: number): Slide {
  return {
    ...prevProgState.currentPresentation.slides[changedSlideIndex],
    elements: changedElems
  }
}

function getSlideWithChangedBorderLight(prevProgState: MainProg, borderLight: borderLightType, changedSlideIndex: number): Slide {
  return {
    ...prevProgState.currentPresentation.slides[changedSlideIndex],
    //slideBorderLight: borderLight
  }
}

function createDefaultSlide(): Slide {  
  return {
    id: createNewId(),
    background: {
        hexColor: 'rgba(255, 255, 255, 1)',
        type: 'color'
    },
    elements: []
  }
}


function supportSlidesWithoutSelectedSlides(slides: Array<Slide>, selectedSlides: Array<string>): Array<Slide> {
  let newSlides = [...slides.filter((e) => !selectedSlides.includes(e.id))]
  if (newSlides.length == 0) {
    newSlides = [createDefaultSlide()]
  }
  
  return newSlides
}


function supportSortingSelectedSlides(slides: Array<Slide> , selectedSlides: Array<string>): Array<Slide> {
  let sortedSelectedSlides: Array<Slide> = [];
  for (let i = 0; i < slides.length; i++) {
    if (selectedSlides.includes(slides[i].id)){
      sortedSelectedSlides = [...sortedSelectedSlides, slides[i]];
    }
  }
  return sortedSelectedSlides
}

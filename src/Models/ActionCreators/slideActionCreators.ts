import {
  StateTypes,
  Picture,
  Color
} from '../types'

export {
  addSlide,
  moveSlide,
  removeOneSlideFromSelectedSlides,
  setSelectedSlides,
  deleteSlides,
  setSlideBackground,
  copySlides,
  pasteSlides,
  switchNextSlide
}

function addSlide() {
  return {
    type: StateTypes.ADD_SLIDE
  }
}

function moveSlide(posBefore: number) {
  return {
    type: StateTypes.MOVE_SLIDE,
    payload: posBefore
  }
}

function removeOneSlideFromSelectedSlides(slideId: string) {
  return {
    type: StateTypes.REMOVE_ONE_ELEM_FROM_SELECTED_SLIDES,
    payload: slideId
  }
}

function setSelectedSlides(selectedSlides: Array<string>) {
  return {
    type: StateTypes.SET_SELECTED_SLIDES,
    payload: selectedSlides
  }
}

function deleteSlides() {
  return {
    type: StateTypes.DELETE_SLIDE
  }
}

function setSlideBackground(newBackground: Picture | Color) {
  return {
    type: StateTypes.SET_SLIDE_BACKGROUND,
    payload: newBackground
  }
}


function copySlides() {
  return {
    type: StateTypes.COPY_SLIDES
  }
}

function pasteSlides() {
  return {
    type: StateTypes.PASTE_SLIDES
  }
}

function switchNextSlide(direction: 'back' | 'forward') {
  return { 
    type: StateTypes.SWITCH_SLIDE,
    payload: direction
  }
}
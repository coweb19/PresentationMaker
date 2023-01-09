import {
  Programm,
  Slide,
  MainProg,
  ActionType
} from '../types';
import { createDefaultSlide } from './SupportFunctions/supportSlideOperations';

export {
  re_checkProgrammExists,
  re_createProgram,
  re_changePresentationTitle
}


function re_checkProgrammExists() {
  const serializedState = localStorage.getItem("stateProgram");
  if (serializedState === null)
    return re_createProgram()
  else
    return JSON.parse(serializedState) as Programm; 
}


function re_createProgram(): Programm {
  const currSlide: Slide = createDefaultSlide();
  return {
    mainProg: {
      currentPresentation: {
          title: 'Default Presentation',
          slides: [currSlide]
        },
          selectedSlides: [currSlide.id],
          selectedElements: []
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
      copySlidesArr: [],
      playerIsOpen: false    
    }    
  }
}


function re_changePresentationTitle(prevProgState: MainProg, action: ActionType): MainProg {   
  return {
    ...prevProgState,
    currentPresentation: {
        ...prevProgState.currentPresentation,
        title: action.payload
    }
  }
}
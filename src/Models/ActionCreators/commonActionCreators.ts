import {
  MainProg,
  StateTypes,
  Programm,
} from '../types'

export {
  createDefaultProgram,
  setCanDeleteSlide,
  loadProgToStore,
  goBackArchive,
  goForwardArchive,
  setSaveToArch,
  getMainProg,
  setSlideBorderLight,
  changePresentationTitle,
  setPlayerState
}


function createDefaultProgram() {
  return {
    type: StateTypes.CREATE_DEFAULT_PROGRAMM
  }
}

function setCanDeleteSlide(canDelete: boolean) {
  return {
    type: StateTypes.SET_CAN_DELETE_SLIDE,
    payload: canDelete
  }
}

function loadProgToStore(newProg: Programm) {
  return {
      type: StateTypes.LOAD_PROJECT,
      payload: {...newProg}  
  }
}

function goForwardArchive() {
  return {
    type: StateTypes.GO_FORWARD_ARCHIVE
  }
}

function goBackArchive() {
  return {
    type: StateTypes.GO_BACK_ARCHIVE
  }
}

function setSaveToArch(saveToArch: boolean) {
  return {
    type: StateTypes.SET_SAVE_TO_ARCH,
    payload: saveToArch
  }
}

function getMainProg(prog: MainProg) {
  return {
      type: StateTypes.LOAD_PROJECT,
      payload: prog
  }
}

function setSlideBorderLight(borderLightPlace: string, slideId: string) {
  return {
    type: StateTypes.LIGHT_SLIDE,
    payload: {
      borderLightPlace,
      slideId
    } 
  }
}

function changePresentationTitle(newTitle: string) {
  return {
      type: StateTypes.CHANGE_PRESENTATION_TITLE,
      payload: newTitle    
  }
}

function setPlayerState(state: 'open' | 'close') {
  let playerState = StateTypes.OPEN_PLAYER
  if (state == 'close') {
    playerState = StateTypes.CLOSE_PLAYER
  }
  return {
    type: playerState
  }
}
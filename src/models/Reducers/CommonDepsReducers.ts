import { re_setSaveToArch } from "../CommonFunctions/archive"
import { calcElemsIterations } from "../CommonFunctions/supportFunctions/commonOperations"
import { ActionType, borderLightType, CommonDeps, Programm, Slide, StateTypes } from "../types"
import { re_setSlideBorderLight } from "./slidesReducers"

export {
  re_setCanDeleteSlide,
  re_playerState,
  re_slideBorderLight,
  re_saveToArch,
  re_canDeleteSlide,
  re_elemsMoveCount
}

function re_setCanDeleteSlide(state: CommonDeps, action: ActionType) {
  return {
    ...state,
    canDeleteSlides: action.payload
  }
}

function re_playerState(state: boolean, action: ActionType): boolean {
  switch (action.type) {
    case StateTypes.OPEN_PLAYER:
        return true
    case StateTypes.CLOSE_PLAYER:
        return false 
    default:
        return state      
  }  
}


function re_slideBorderLight(slides: Array<Slide>, action: ActionType): borderLightType {
  switch (action.type) {
    case StateTypes.LIGHT_SLIDE:
      return re_setSlideBorderLight(action)    
    default:
      return {
        borderLightPlace: 'unset',
        slideId: '' 
      }
  }  
}


function re_saveToArch(state: Programm, action: ActionType): boolean {
  switch (action.type) {
    case StateTypes.ADD_PICTURE_OBJ:
      return false
    case StateTypes.GO_FORWARD_ARCHIVE: 
      return false
    case StateTypes.GO_BACK_ARCHIVE: 
      return false 
    case StateTypes.SET_SAVE_TO_ARCH:
      return re_setSaveToArch(state.commonDeps.saveToArch, action)  
    case StateTypes.CHANGE_ELEM_POSITION:
      let saveToArch = true
      let selectElemsArrLength = state.mainProg.selectedElements.length
      let elemsMoveCount = state.commonDeps.elemsMoveCount
      if (selectElemsArrLength > 1 && elemsMoveCount < selectElemsArrLength) {
        saveToArch = false
      }
      return saveToArch     
    default:
      return state.commonDeps.saveToArch
  }
}


function re_canDeleteSlide(state: CommonDeps, action: ActionType): boolean {
  switch (action.type) {
    case StateTypes.SET_CAN_DELETE_SLIDE:
      return re_setCanDeleteSlide(state, action).canDeleteSlides
    default:
      return state.canDeleteSlides
  }
}


function re_elemsMoveCount(state: Programm, action: ActionType): number {
  switch (action.type) {
    case StateTypes.CHANGE_ELEM_POSITION:
      let iterCount = state.commonDeps.elemsMoveCount
      const selectedEelemLength = state.mainProg.selectedElements.length
      iterCount = calcElemsIterations(iterCount, selectedEelemLength)
      return iterCount
    default:
      return state.commonDeps.elemsMoveCount
  }
}

import { re_copySlides, re_pasteSlides, re_addSlide } from "./slidesReducers";
import { re_checkProgrammExists, re_createProgram } from "../CommonFunctions/mainProgOperations";
import { StateTypes } from "../types";
import { ActionType, Programm } from "../types";
import { re_goBackArchive, re_goForwardArchive } from "../CommonFunctions/archive";
import { re_getMainProg } from "../CommonFunctions/setGetPresentation";
import { re_mainProgState } from './mainProgReducer'
import { re_canDeleteSlide, re_elemsMoveCount, re_playerState, re_saveToArch, re_slideBorderLight } from "./commonDepsReducers";
import { re_copyElems, re_pasteElems } from "./slideElemReducers";

export function mainReducer(state: Programm = re_createProgram(), action: ActionType) {
  switch (action.type) {
    case StateTypes.CREATE_DEFAULT_PROGRAMM:
      return re_createProgram()

    case StateTypes.LOAD_PROJECT:
      return re_getMainProg(action)

    case StateTypes.ADD_SLIDE:
      return re_addSlide(state)

    case StateTypes.GO_BACK_ARCHIVE:
      return re_goBackArchive()

    case StateTypes.GO_FORWARD_ARCHIVE:
      return re_goForwardArchive()

    case StateTypes.COPY_ELEMS:
      return re_copyElems(state)

    case StateTypes.PASTE_ELEMS:
        return re_pasteElems(state)

    case StateTypes.COPY_SLIDES:
        return re_copySlides(state)

    case StateTypes.PASTE_SLIDES:
      return re_pasteSlides(state)

    default:    
      return {
        mainProg: re_mainProgState(state.mainProg, action),
        commonDeps: {
          canDeleteSlides: re_canDeleteSlide(state.commonDeps, action),
          elemsMoveCount: re_elemsMoveCount(state, action),
          saveToArch: re_saveToArch(state, action),
          slideBorderLight: re_slideBorderLight(state.mainProg.currentPresentation.slides, action),
          copyElemsArr: state.commonDeps.copyElemsArr,
          copySlidesArr: state.commonDeps.copySlidesArr,
          playerIsOpen: re_playerState(state.commonDeps.playerIsOpen, action)
        }
      }    
  }
}






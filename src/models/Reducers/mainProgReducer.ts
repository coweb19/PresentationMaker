import { re_changePresentationTitle } from "../CommonFunctions/mainProgOperations"
import { ActionType, MainProg, StateTypes } from "../types"
import { re_addPictureObj, re_addShapeObj, re_addTextObj, re_changeElemPosition, re_changeShapeObj, re_changeTextObj, re_deleteSelectedElements, re_removeOneElemFromSelectedElems, re_resizeElement, re_setSelectedElement, re_setSlideBackground } from "./slideElemReducers"
import { re_deleteSlide, re_moveSlide, re_removeOneElemFromSelectedSlides, re_setSelectedSlides, re_switchSlide } from "./slidesReducers"



export function re_mainProgState(state: MainProg, action: ActionType): MainProg {
  
  switch (action.type) {

    case StateTypes.CHANGE_PRESENTATION_TITLE:
      return re_changePresentationTitle(state, action)

    case StateTypes.SET_SELECTED_SLIDES:
      return re_setSelectedSlides(state, action)

    case StateTypes.SET_SLIDE_BACKGROUND:
      console.log(action)
      return  re_setSlideBackground(state, action)
      
    case StateTypes.DELETE_SLIDE:
      return re_deleteSlide(state, action)

    case StateTypes.MOVE_SLIDE:
      console.log(action)
      return re_moveSlide(state, action)

    case StateTypes.SWITCH_SLIDE:
      return re_switchSlide(state, action)  

    case StateTypes.ADD_SHAPE_OBJ:
      return re_addShapeObj(state, action)
        
    case StateTypes.SET_SELECTED_ELEMENT:
      return re_setSelectedElement(state, action)       

    case StateTypes.CHANGE_ELEM_POSITION:
        return re_changeElemPosition(state, action)    

    case StateTypes.ADD_TEXT_OBJ:
      return re_addTextObj(state, action)

    case StateTypes.SET_SLIDE_BACKGROUND:
      return re_setSlideBackground(state, action)

    case StateTypes.ADD_PICTURE_OBJ:
      return re_addPictureObj(state, action)

    case StateTypes.CHANGE_TEXT_OBJ:
      return re_changeTextObj(state, action)

    case StateTypes.CHANGE_SHAPE_OBJ:
      return re_changeShapeObj(state, action)

    case StateTypes.RESIZE_ELEMENT:        
      return re_resizeElement(state, action)

    case StateTypes.DELETE_SELECTED_ELEMENTS:
      return re_deleteSelectedElements(state, action)

    case StateTypes.REMOVE_ONE_ELEM_FROM_SELECTED_ELEMS:
      return re_removeOneElemFromSelectedElems(state, action)
      
    case StateTypes.REMOVE_ONE_ELEM_FROM_SELECTED_SLIDES:
      return re_removeOneElemFromSelectedSlides(state, action)  

    default:
      return state
  }
}
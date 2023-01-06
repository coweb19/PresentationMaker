import {
  StateTypes
} from '../types'

export function addShapeObj(shape: 'rect' | 'triangle' | 'circle') {
  return {
    type: StateTypes.ADD_SHAPE_OBJ,
    payload: shape
  }
}

export function changeShapeObj(newParam: string, paramToChange: 'borderColor' | 'fillColor' | 'borderWidth') {
  return {
    type: StateTypes.CHANGE_SHAPE_OBJ,
    payload: {
      newParam,
      paramToChange
    }
  }
}

export function addTextObj() {
  return {
    type: StateTypes.ADD_TEXT_OBJ
  }
}


export function addPictureObj(imgData: {width: number, height: number, imgB64: string}) {
  return {
    type: StateTypes.ADD_PICTURE_OBJ,
    payload: imgData
  }
}


export function changeElemPosition(newX: number, newY: number, id: string) {
  return {
    type: StateTypes.CHANGE_ELEM_POSITION,
    payload: {newX, newY, id}
  }
}

export function resizeElement(newWidth: number, newHeigth: number, newPosX: number, newPosY: number, id: string) {
  return {
    type: StateTypes.RESIZE_ELEMENT,
    payload: {newWidth, newHeigth, newPosX, newPosY, id}
  }
}

export function setSelectedElement(selectedElems: Array<string>) {
  return {
    type: StateTypes.SET_SELECTED_ELEMENT,
    payload: selectedElems
  }
}

export function deleteSelectedElements() {
  return {
    type: StateTypes.DELETE_SELECTED_ELEMENTS
  }
}

export function removeOneElemFromSelectedElems(elemId: string) {
  return {
    type: StateTypes.REMOVE_ONE_ELEM_FROM_SELECTED_ELEMS,
    payload: elemId
  }
}

export function changeTextObj(newParams: {newParam: string, paramToChange: 'text' | 'fontSize' | 'fontFamily' | 'textColor' , id: string}) {
  return {
    type: StateTypes.CHANGE_TEXT_OBJ,
    payload: newParams
  }
}

export function copyElems() {
  return {
    type: StateTypes.COPY_ELEMS
  }
}

export function pasteElems() {
  return {
    type: StateTypes.PASTE_ELEMS
  }
}
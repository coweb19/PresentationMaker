import { MainProg, PictureObj, Point, ShapeObj, Slide, TextObj } from "../../types"
import { createNewId } from "./CommonOperations"
import { searchChangedSlideIndex } from "./supportSlideOperations"

export {
  createPictureObj,
  createEmtyTextObj,
  createShapeObj,
  searchChangedElemIndexById,
  searchChangedElemIndex,
  checkSelectedElem,
  getNewTextElem,
  getElemsWithoutChangedElem,
  getElemsWithNewElem,
  getChangedElem,
  getNewShapeElem,
  getNewResizedElem,
  getNewElemWithNewPosition,
  getElemsWithChangedElem,
  getCurrElemPosition,
  getCurrElemSize,
  getAllElemsIdArr,
  getElemByIdToPalette
}

function createPictureObj(width: number, height: number, imgB64: string): PictureObj {
  return {
    id: createNewId(),
    position: {
      x: 10,
      y: 10 
    },
    height: height,
    width: width,
    type: 'picture',
    imgB64,
    fillColor: 'none',
    borderColor: 'unset',
    borderWidth: 1
  }
}

function createEmtyTextObj(): TextObj {
  return {
    id: createNewId(),
    position: {
      x: 300,
      y: 300
    },
    height: 50,
    width: 400,
    text: "",
    fillColor: 'rgba(255, 255, 255, 0)',
    borderColor: 'unset',
    borderWidth: 1,
    fontFamily: 'Arial',
    fontSize: '25',
    textColor: 'black',
    type: 'text'
  }
}

function createShapeObj(type: 'rect' | 'triangle' | 'circle'): ShapeObj {
  return {
    id: createNewId(),
    position: {
      x: 20,
      y: 20
    },
    width: 200,
    height: 200,
    borderColor: 'rgba(189, 183, 107, 0.5)',
    borderWidth: 1,
    fillColor: 'rgba(189, 183, 107, 0.5)',
    type
  }
} 


function searchChangedElemIndex(prog: MainProg, changedSlideIndex: number): number {
  const elems = prog.currentPresentation.slides[changedSlideIndex].elements
  let selectedElem = prog.selectedElements[prog.selectedElements.length - 1]
  let changedElemIndex: number = -1
  for (let i = 0; i < elems.length; i++) {     
    if (elems[i].id == selectedElem) {
        changedElemIndex = i
    }
  }
  return changedElemIndex
}

function searchChangedElemIndexById(slides: Array<Slide>, changedSlideIndex: number, id: string): number {
  const elems = slides[changedSlideIndex].elements
  let changedElemIndex: number = -1
  for (let i = 0; i < elems.length; i++) {     
    if (elems[i].id === id) {
        changedElemIndex = i
    }
  }
  return changedElemIndex
}


function getElemByIdToPalette(slides: Array<Slide>, elementId: string): PictureObj | ShapeObj | TextObj | null {
  for (let j = 0; j < slides.length; j++) {
    for (let i = 0; i < slides[j].elements.length; i++) {
      if (slides[j].elements[i].id == elementId)
        return slides[j].elements[i];
    }
  }
  return null
}


function getCurrElemPosition(slides: Array<Slide>, selectedSlides: Array<string>, id: string): Point {
  let elemX: number = 0
  let elemY: number = 0
  const changedSlideIndex = searchChangedSlideIndex(slides, selectedSlides)
  const changedElemIndex = searchChangedElemIndexById(slides, changedSlideIndex, id)
  let changedElem = getChangedElem(slides, changedSlideIndex, changedElemIndex)
  if (changedElem != undefined) {
    elemX = changedElem.position.x
    elemY = changedElem.position.y
  } 
  return {
    x: elemX,
    y: elemY
  }
}


function getCurrElemSize(slides: Array<Slide>, selectedSlides: Array<string>, id: string): {width: number, height: number} {
  
  let width: number = 0
  let height: number = 0
  const changedSlideIndex = searchChangedSlideIndex(slides, selectedSlides)
  const changedElemIndex = searchChangedElemIndexById(slides, changedSlideIndex, id)
  let changedElem = getChangedElem(slides, changedSlideIndex, changedElemIndex)
  if (changedElem != undefined) {
    width = changedElem.width
    height = changedElem.height
  } 
  return {
    width: width,
    height: height
  }
}

function checkSelectedElem(selectedElements: Array<String>, currElemId: string): boolean {
  let elemIsSelected: boolean = false
  let selectedElemId: string = '-1'
  
  if (selectedElements.includes(currElemId))
  {
    elemIsSelected = true
  }

  return elemIsSelected
}


function getNewTextElem(changedElem: TextObj, newParam: string, paramToChange: 'text' | 'fontSize' | 'fontFamily' | 'textColor'): TextObj {
  let newElem = changedElem
  if (paramToChange === 'text') {
    newElem = {
      ...changedElem,
      text: newParam
    }
  }
  if (paramToChange === 'fontFamily') {
    newElem = {
      ...changedElem,
      fontFamily: newParam
    }
  }
  if (paramToChange === 'fontSize') {
    newElem =
    {
      ...changedElem,
      fontSize: newParam
    }
  }
  if (paramToChange === 'textColor') {
    console.log(newParam)
    newElem =
    {
      ...changedElem,
      textColor: newParam
    }
  }
  
  return newElem
}


function getElemsWithoutChangedElem(prog: MainProg, changedElemIndex: number, changedSlideIndex: number): Array<PictureObj | TextObj | ShapeObj> {
  return [...prog.currentPresentation.slides[changedSlideIndex].elements.filter((elem) => 
  elem != prog.currentPresentation.slides[changedSlideIndex].elements[changedElemIndex])] 
}

function getElemsWithNewElem(prog: MainProg, newElem: PictureObj | TextObj | ShapeObj, changedSlideIndex: number): Array<PictureObj | TextObj | ShapeObj> {
  return [...prog.currentPresentation.slides[changedSlideIndex].elements, newElem]
}

function getChangedElem(slides: Array<Slide>, changedSlideIndex: number, changedElemIndex: number): PictureObj | TextObj | ShapeObj {
  return slides[changedSlideIndex].elements[changedElemIndex]
}

function getNewShapeElem(changedElem: ShapeObj, newParam: string, paramToChange: 'borderColor' | 'fillColor' | 'borderWidth'): ShapeObj {
  let newElem = changedElem
  if (paramToChange == 'borderColor') {
    newElem = {
      ...changedElem,
      borderColor: newParam
    }
  }
  if (paramToChange == 'fillColor') {
    newElem = {
      ...changedElem,
      fillColor: newParam
    }
  }
  if (paramToChange == 'borderWidth') {
    newElem = {
      ...changedElem,
      borderWidth: Number(newParam)
    }
  }
  return newElem
}

function getNewResizedElem(changedElem: PictureObj | TextObj | ShapeObj, newWidth: number, newHeigth: number, newPosX: number, newPosY: number): PictureObj | TextObj | ShapeObj {
  return {
    ...changedElem,
    position: {
      x: newPosX,
      y: newPosY
    },
    width: newWidth,
    height: newHeigth
  }
}

function getNewElemWithNewPosition(changedElem: PictureObj | TextObj | ShapeObj, newX: number, newY: number): PictureObj | TextObj | ShapeObj {
  return {
    ...changedElem,
    position: {
      x: newX,
      y: newY
    }
  }
}


function getElemsWithChangedElem(prog: MainProg, changedSlideIndex: number, changedElemIndex: number, changedElem: PictureObj | TextObj | ShapeObj): Array<PictureObj | TextObj | ShapeObj> {
  let changedElemsArr: Array<PictureObj | TextObj | ShapeObj> = []

  for(let i = 0; i < prog.currentPresentation.slides[changedSlideIndex].elements.length; i++) {
    i === changedElemIndex
      ? changedElemsArr[i] = changedElem
      : changedElemsArr[i] = prog.currentPresentation.slides[changedSlideIndex].elements[i]
  }

  return changedElemsArr
} 


function getAllElemsIdArr(elems: Array<ShapeObj | TextObj | PictureObj>): Array<string> {
  let allElems: Array<string> = [] 
  elems.forEach(elem => allElems.push(elem.id))
  return allElems
}

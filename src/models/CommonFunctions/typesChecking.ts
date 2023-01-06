import {
  MainProg,
  Slide,
  PictureObj,
  TextObj,
  Color,
  ShapeObj,
  SlideId,
  Point,
} from '../types'


export {
  isMainProg,
  isChangedElemPosType,
  isTextObj,
  isSlideId,
  isColor,
  isSlide,
  isShapeObj,
  isPictureObj,
  isPoint
}

function isMainProg(elem: any): elem is MainProg {
  return elem.currentPresentation !== undefined
}

function isSlideId(elem: any): elem is SlideId {
  return typeof elem == "string"
}

function isSlide(elem: any): elem is Slide {
  return elem.elements !== undefined
}

function isTextObj(elem: any): elem is TextObj {
  return elem.text !== undefined && elem.fontFamily !== undefined;
}

function isShapeObj(elem: any): elem is ShapeObj {
  return elem.borderColor !== undefined && elem.fillColor !== undefined;
}

function isPictureObj(elem: any): elem is PictureObj {
  return elem.imgB64 !== undefined
}

function isColor(elem: any): elem is Color {
  return elem.hexColor !== undefined
}

function isPoint(elem: any): elem is Point {
  return elem.x !== undefined
}

function isChangedElemPosType(obj: any): obj is {newX: number, newY: number, id: string} {
  return obj.newX !== undefined && obj.newY !== undefined && obj.id !== undefined
}

import React, { useRef} from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { connect } from "react-redux"
import { PictureObj, Programm, ShapeObj, Slide, TextObj } from '../../Models/types'
import { ShapeObject } from './ShapesSvg'
import { ImgTextObject } from './TextPictureSvg'


interface SmallSlideElemProps {
  shape: PictureObj | TextObj | ShapeObj,
  slides: Array<Slide>,
  selectedSlides: Array<string>,
  selectedElements: Array<string>,
  canDeleteSlides: boolean,
}

function SmallSlideElement(props: SmallSlideElemProps) {
  const resizeIndex = 10
  let width = props.shape.width / resizeIndex
  let height = props.shape.height / resizeIndex
  let posX = props.shape.position.x  / resizeIndex
  let posY = props.shape.position.y  / resizeIndex
  let borderWidth = props.shape.borderWidth / resizeIndex

  const elemRef = useRef<(SVGPolygonElement & SVGRectElement & SVGImageElement & SVGEllipseElement) | null>(null)

  
  let svgElem: JSX.Element = <rect/>
  let outLineRect: JSX.Element = <rect />

  if (props.shape.type === 'rect' || props.shape.type === 'triangle' || props.shape.type === 'circle') {
    svgElem = <ShapeObject 
      shape={props.shape}
      elemRef={elemRef}
      posX={posX}
      posY={posY}
      width={width}
      height={height}
      borderWidth={borderWidth}
      outlineRect={outLineRect}
    />
  }

  if (props.shape.type === 'picture' || props.shape.type === 'text' ){
    svgElem = <ImgTextObject
      shape={props.shape}
      elemRef={elemRef}
      posX={posX}
      posY={posY}
      width={width}
      height={height}
      outlineRect={outLineRect}
      isSmallElem={true}
      changeTextObj={null}
      setSaveToArch={null}
      setSelectedElement={null}
      selectedElemets={[]}
      canDeleteSlides={false}
      playerIsOpen={false}
    />
  }

  return (svgElem)
}


const mapStateToProps = (state: Programm) => {

return {
  slides: state.mainProg.currentPresentation.slides,
  selectedSlides: state.mainProg.selectedSlides,
  selectedElements: state.mainProg.selectedElements,
  canDeleteSlides: state.commonDeps.canDeleteSlides,
}}

export default connect(mapStateToProps)(SmallSlideElement)
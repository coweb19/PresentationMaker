import React, { useState, useRef} from 'react'
import { PictureObj, TextObj, ShapeObj, Programm, Slide} from '../../Models/types'
import './Element.css'
import { useDragAndDropElement, useReSizeElement} from '../../CustomHooks/ElemMouseEvents'
import { useNormalizeElemSize, useSetElemPropsAfterSlideChanged } from '../../CustomHooks/CommonDifferentHooks'
import { connect } from 'react-redux'
import { setCanDeleteSlide, setSaveToArch } from '../../Models/ActionCreators/commonActionCreators'
import { changeElemPosition, changeTextObj, removeOneElemFromSelectedElems, resizeElement, setSelectedElement } from '../../Models/ActionCreators/elemActionCreators'
import { checkSelectedElem } from '../../Models/CommonFunctions/supportFunctions/supportElemOperations'
import { ShapeObject } from './ShapesSvg'
import { ImgTextObject } from './TextPictureSvg'
import { OutlineRect } from './OutlineSvg'
 

interface BigSlideElementProps {
  slides: Array<Slide>,
  selectedSlides: Array<string>,
  selectedElements: Array<string>,
  canDeleteSlides: boolean,
  setCanDeleteSlide: (canDelete: boolean) => void,
  setSelectedElement: (elemsArr: Array<string>) => void,
  changeElemPosition: (newX: number, newY: number, id: string) => void,
  resizeElement: (newWidth: number, newHeigth: number, newPosX: number, newPosY: number, id: string) => void,
  changeTextObj: (newParams: {newParam: string, paramToChange: 'text' | 'fontSize' | 'fontFamily', id: string}) => void,
  removeOneElemFromSelectedElems: (elemId: string) => void,
  setSaveToArch: (saveToArch: boolean) => void,
  shape: PictureObj | TextObj | ShapeObj,
  svgProps: React.MutableRefObject<SVGSVGElement | null>,
  playerIsOpen: boolean
}

function BigSlideElement(props: BigSlideElementProps) {

  const id = props.shape.id

  const mainSvgProps = props.svgProps.current?.getBoundingClientRect()
  const svgWidth = Number(mainSvgProps?.width)
  const svgHeight = Number(mainSvgProps?.height)

  const elemPosX = props.shape.position.x
  const elemPosY = props.shape.position.y
  const elemWidth = props.shape.width
  const elemHeight = props.shape.height

  const elemRef = useRef<(SVGPolygonElement & SVGRectElement & SVGImageElement & SVGEllipseElement) | null>(null)
  const firstPointRef = useRef<SVGCircleElement | null>(null)
  const secondPointRef = useRef<SVGCircleElement | null>(null)
  const thirdPointRef = useRef<SVGCircleElement | null>(null)
  const fourthPointRef = useRef<SVGCircleElement | null>(null)

  const[pos, setPos] = useState({x: elemPosX, y: elemPosY})

  const[elemSize, setSize] = useState({width: elemWidth, height: elemHeight})


  useNormalizeElemSize({id, resizeElement: props.resizeElement, setSize, elemWidth, elemHeight, svgWidth, svgHeight})


  useDragAndDropElement({
    id: props.shape.id,
    slides: props.slides,
    selectedElements: props.selectedElements,
    selectedSlides: props.selectedSlides,
    canDeleteSlides: props.canDeleteSlides,
    elemRef, 
    mainSvgProps,

    setCanDeleteSlide: props.setCanDeleteSlide,
    setSelectedElement: props.setSelectedElement,
    changeElemPosition: props.changeElemPosition,
    removeOneElemFromSelectedElems: props.removeOneElemFromSelectedElems,
    setPos
  })


  useReSizeElement ({
    id: props.shape.id,
    shapeType: props.shape.type,
    borderWidth: props.shape.borderWidth, 
    firstPointRef, secondPointRef, thirdPointRef, fourthPointRef,
    mainSvgProps,
    slides: props.slides,
    selectedElements: props.selectedElements,
    selectedSlides: props.selectedSlides,
    setSelectedElement: props.setSelectedElement,
    resizeElement: props.resizeElement,
    setPos,
    setSize
  })  

  useSetElemPropsAfterSlideChanged({
    slides: props.slides,
    x: elemPosX,
    y: elemPosY,
    width: elemWidth,
    height: elemHeight,
    setPos,
    setSize
  })

  
  let svgElem: JSX.Element = <rect/>
  let outLineRect: JSX.Element = <rect/>

  if (checkSelectedElem(props.selectedElements, id)) {
    outLineRect = <OutlineRect
      shapeType={props.shape.type}
      firstPointRef={firstPointRef}
      secondPointRef={secondPointRef}
      thirdPointRef={thirdPointRef}
      fourthPointRef={fourthPointRef}
      id={id}
      posX={pos.x}
      posY={pos.y}
      width={elemSize.width}
      height={elemSize.height}
      borderWidth={props.shape.borderWidth}
    />
  }

  if (props.shape.type === 'rect' || props.shape.type === 'triangle'  || props.shape.type === 'circle') {
    svgElem = <ShapeObject 
      shape={props.shape}
      elemRef={elemRef}
      posX={pos.x}
      posY={pos.y}
      width={elemSize.width}
      height={elemSize.height}
      borderWidth={props.shape.borderWidth}
      outlineRect={outLineRect}
    />
  }

  if (props.shape.type === 'picture' || props.shape.type === 'text' ){
    svgElem = <ImgTextObject
      shape={props.shape}
      elemRef={elemRef}
      posX={pos.x}
      posY={pos.y}
      width={elemSize.width}
      height={elemSize.height}
      outlineRect={outLineRect}
      isSmallElem={false}
      changeTextObj={props.changeTextObj}
      setSaveToArch={props.setSaveToArch}
      setSelectedElement={props.setSelectedElement}
      selectedElemets={props.selectedElements}
      canDeleteSlides={props.canDeleteSlides}
      playerIsOpen={props.playerIsOpen}
    />
  }
  return (svgElem)
}



const mapDispatchToProps = {
    setCanDeleteSlide,
    setSelectedElement,
    changeElemPosition,
    resizeElement,
    removeOneElemFromSelectedElems,
    changeTextObj,
    setSaveToArch 
}

const mapStateToProps = (state: Programm) => {
  return {
    slides: state.mainProg.currentPresentation.slides,
    selectedElements: state.mainProg.selectedElements,
    selectedSlides: state.mainProg.selectedSlides,
    canDeleteSlides: state.commonDeps.canDeleteSlides,
    playerIsOpen: state.commonDeps.playerIsOpen
}}

export default connect(mapStateToProps, mapDispatchToProps)(BigSlideElement)

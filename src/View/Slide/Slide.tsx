import React, { useEffect, useRef, useState } from 'react'
import './Slide.css'
import { borderLightType, Programm, Slide} from '../../Models/types'
import { getSlideBackground, getSlideSvgElems, getDivSvgClassNames, calcBlockedDivColor } from '../commonViewFunctions'
import { useDragAndDropSlides, useLighSlideInsertPlace  } from '../../CustomHooks/SlideMouseEvents'
import { connect } from 'react-redux'
import { setCanDeleteSlide, setSlideBorderLight } from '../../Models/ActionCreators/commonActionCreators'
import { useDeleteSelectedElems } from '../../CustomHooks/CommonMouseKeyboardEvents'
import { moveSlide, removeOneSlideFromSelectedSlides, setSelectedSlides } from '../../Models/ActionCreators/slideActionCreators'
import { deleteSelectedElements, setSelectedElement } from '../../Models/ActionCreators/elemActionCreators'
import { useSetGlobalActiveTool } from '../../CustomHooks/supportHooksFunctions'


interface SlideProps  {
  slides: Array<Slide>,
  selectedSlides: Array<string>,
  selectedElements: Array<string>,
  canDeleteSlides: boolean,
  numberOfSlide: number,
  isSmallSlide: boolean,
  slidesPanelRef: React.MutableRefObject<HTMLDivElement | null> | null,
  slideBorderLight: borderLightType,
  playerIsOpen: boolean

  moveSlide: (index: number) => void,
  setSelectedSlides: (slidesArr: Array<string>) => void,
  setCanDeleteSlide: (canDelete: boolean) => void,
  removeOneElemFromSelectedSlides: (slideId: string) => void,
  setSelectedElement: (elemsArr: Array<string>) => void,
  deleteSelectedElements: () => void,
  setSlideBorderLight: (borderLightPlace: string, slideId: string) => void
}

function MainSlide(props: SlideProps) {

  useSetGlobalActiveTool({
    selectedElements: props.selectedElements,
    slides: props.slides
  })
  
  useDeleteSelectedElems(props.selectedElements, props.deleteSelectedElements)

  let currSlide: Slide = props.slides[props.numberOfSlide]
  
  const modelSlideBackground = currSlide.background
  const mainSvgRef = useRef<SVGSVGElement | null>(null)
  const mainDivRef = useRef<HTMLDivElement | null>(null)

  const blockedDivColor = calcBlockedDivColor(props.playerIsOpen, props.isSmallSlide)
  const divClassName = getDivSvgClassNames(props.isSmallSlide, props.playerIsOpen).divClassName
  const svgClassName = getDivSvgClassNames(props.isSmallSlide, props.playerIsOpen).svgClassName
  const svgBackground = getSlideBackground(modelSlideBackground) 

  const svgSlideElems: Array<JSX.Element> = getSlideSvgElems({
    modelSlideElems: currSlide.elements,
    isSmallSlideElem: props.isSmallSlide,
    svgRef: mainSvgRef
  })
 

  useDragAndDropSlides({
    slides: props.slides,
    selectedSlides: props.selectedSlides,
    selectedElements: props.selectedElements,
    canDeleteSlides: props.canDeleteSlides,
    moveSlide: props.moveSlide, 
    setSelectedSlides: props.setSelectedSlides,
    setCanDeleteSlide: props.setCanDeleteSlide,
    removeOneElemFromSelectedSlides: props.removeOneElemFromSelectedSlides,
    setSelectedElement: props.setSelectedElement,
    currSlide,
    svgRef: mainSvgRef,
    isSmallSlide: props.isSmallSlide
  })
  
  useLighSlideInsertPlace({
    slides: props.slides,
    selectedSlides: props.selectedSlides,
    currSlide, svgRef: mainSvgRef, 
    divRef: mainDivRef, 
    slidesPanelRef: props.slidesPanelRef, 
    isSmallSlide: props.isSmallSlide,
    setSlideBorderLight: props.setSlideBorderLight,
    slideBorderLight: props.slideBorderLight
  })

  return (    
    <div id={currSlide.id} ref={mainDivRef} className={divClassName} >
        <svg ref={mainSvgRef} id={currSlide.id} className={svgClassName} xmlns="http://www.w3.org/2000/svg" version="1.1" x="0" y="0" >
            {svgBackground}
            {svgSlideElems} 
          <rect x={0} y={0} width={'100%'} height={'100%'} fill={blockedDivColor}/>
        </svg>
    </div>
  )
}

const mapDispatchToProps = {
  moveSlide,
  setSelectedSlides,
  setCanDeleteSlide,
  removeOneElemFromSelectedSlides: removeOneSlideFromSelectedSlides,
  setSelectedElement,
  deleteSelectedElements,
  setSlideBorderLight
}
  
const mapStateToProps = (state: Programm) => ({
  slides: state.mainProg.currentPresentation.slides,
  selectedSlides: state.mainProg.selectedSlides,
  selectedElements: state.mainProg.selectedElements,

  canDeleteSlides: state.commonDeps.canDeleteSlides,
  slideBorderLight: state.commonDeps.slideBorderLight,
  playerIsOpen: state.commonDeps.playerIsOpen
})
  
export default connect(mapStateToProps, mapDispatchToProps)(MainSlide)
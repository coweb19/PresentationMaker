import React, { useState } from 'react'
import BigSlideElement from './Element/BigSlideElem'
import { Color, Picture, SlideElements, Slide, borderLightType } from '../Models/types'
import MainSlide from './Slide/Slide'
import { isColor, isPictureObj } from '../Models/CommonFunctions/typesChecking'
import SmallSlideElem from './Element/SmallSlideElem'


export {
  calcBlockedDivColor,
  getSlideSvgElems,
  getSlideBackground,
  getListSlides,
  getDivSvgClassNames
}


function calcBlockedDivColor(playerIsOpen: boolean, isSmallSlide: boolean): string {
  let blockedDivColor = 'none'
  if(playerIsOpen || isSmallSlide) {
    blockedDivColor = '#ffffff28'
  }  
  return blockedDivColor
}


function getDivSvgClassNames(isSmallSlide: boolean, playerIsOpen: boolean): {divClassName: string, svgClassName: string} {
  let classNames = {
    divClassName: 'mainSlideDiv',
    svgClassName: 'mainSlideSvg'
  }
  if (isSmallSlide) {
    classNames.divClassName = 'mainSlideDiv_small'
    classNames.svgClassName = 'smallMainSlideSvg'
  }
  return classNames
}



function getSlideBackground(modelSlideBackground: Picture | Color): JSX.Element {

  let svgBackground = <rect x={0} y={0} width={'0'} height={'0'} fill={'unset'}/>
  if (modelSlideBackground.type == 'color')
      svgBackground = <rect x={0} y={0} width={'100%'} height={'100%'} fill={String(modelSlideBackground.hexColor)}/>
  if (modelSlideBackground.type == 'picture')
      svgBackground = <image preserveAspectRatio="none" x={0} y={0} width={'100%'} height={'100%'} href={String(modelSlideBackground.imgB64)}/>    

  return svgBackground
}



interface getSlideElemsPayload {
  modelSlideElems: SlideElements
  isSmallSlideElem: boolean
  svgRef: React.MutableRefObject<SVGSVGElement | null>
} 

function getSlideSvgElems(payload: getSlideElemsPayload): Array<JSX.Element> {

  let svgSlideElems: Array<JSX.Element> = []
  const modelSlideElems = {...payload.modelSlideElems}
  const modelSlideElemsLength = Object.keys(modelSlideElems).length
  
  for(let i = 0; i < modelSlideElemsLength; i++) {
    svgSlideElems.push(
      payload.isSmallSlideElem
        ? <SmallSlideElem key={modelSlideElems[i].id} shape={{...modelSlideElems[i]}} />
        : <BigSlideElement key={modelSlideElems[i].id} shape={{...modelSlideElems[i]}} svgProps={payload.svgRef}/> 
    )
  }
  return svgSlideElems
}



interface getListSlidesProps {
  slideBorderLight: borderLightType,
  slides: Array<Slide>,
  selectedSlides: Array<string>,
  canDeleteSlides: boolean,
  slidesPanelRef: React.MutableRefObject<HTMLDivElement | null> | null
}

function getListSlides(props: getListSlidesProps): Array<JSX.Element> {


  const selectedSlides = props.selectedSlides
  const slides = props.slides
  const canDeleteSlides = props.canDeleteSlides
  const slideBorderLight = props.slideBorderLight
  const slidesPanelRef = props.slidesPanelRef

  let slidesList: Array<JSX.Element> = []
  const slidesLength = Object.keys(slides).length


  function getDivClassname(i: number): string {
    
    let className = "slide-frame " + (selectedSlides.includes(slides[i].id) ? "slide-frame_selected" : "")
    if (slideBorderLight.borderLightPlace == 'top' && slides[i].id == slideBorderLight.slideId) {
      className = "slide-frame slide-frame_selected__top"
    }
    if (slideBorderLight.borderLightPlace == 'bottom' && slides[i].id == slideBorderLight.slideId) {
      className = "slide-frame slide-frame_selected__bottom"
    }
    return className
  }

  for(let i = 0; i < slidesLength; i++) {
    slidesList.push(
      <div key={slides[i].id} className={getDivClassname(i)}> 
        <span className="slide-frame__number">{i + 1}</span>
        <div className={"slide " + (selectedSlides.includes(slides[i].id) && canDeleteSlides ? "slide_selected" : "")}>
          <MainSlide key={slides[i].id} numberOfSlide={i} isSmallSlide={true} slidesPanelRef={slidesPanelRef}/>
        </div>
      </div>
    )
  }
  return slidesList
}
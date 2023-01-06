import React, { useEffect, useRef } from 'react'
import { checkSecondSlideIsBeyond, getSelectedSlides, searchChangedSlideIndexById } from '../Models/CommonFunctions/supportFunctions/supportSlideOperations'
import { borderLightType, Slide } from '../Models/types'
import { setSelectedSlidesInHook } from './supportHooksFunctions'

export {
  useDragAndDropSlides,
  useLighSlideInsertPlace
}


interface dragAndDropSlidesProps {
  slides: Array<Slide>,
  selectedSlides: Array<string>,
  selectedElements: Array<string>,
  canDeleteSlides: boolean,
  moveSlide: (index: number) => void,
  setSelectedSlides: (slidesArr: Array<string>) => void,
  setCanDeleteSlide: (canDelete: boolean) => void,
  removeOneElemFromSelectedSlides: (slideId: string) => void,
  setSelectedElement: (elemsArr: Array<string>) => void,
  currSlide: Slide,
  svgRef: React.MutableRefObject<SVGSVGElement | null>,
  isSmallSlide: boolean
} 

function useDragAndDropSlides(props: dragAndDropSlidesProps) {

  const canMoveSlides = useRef(true)


  useEffect(() => {
    if(props.isSmallSlide) {
      props.svgRef.current?.addEventListener('mousedown', mouseDownSelectSlide)
      return () => props.svgRef.current?.removeEventListener('mousedown', mouseDownSelectSlide)
    }
  })

  const mouseDownSelectSlide = (event: React.MouseEvent | MouseEvent) => {
    if (!event.defaultPrevented ) {
      setSelectedSlidesInHook({
        canMoveSlides,
        event, 
        slideId: props.currSlide.id,
        slides: props.slides,
        selectedSlides: props.selectedSlides,
        selectedElements: props.selectedElements,
        canDeleteSlides: props.canDeleteSlides,
        setSelectedSlides: props.setSelectedSlides,
        setCanDeleteSlide: props.setCanDeleteSlide,
        removeOneElemFromSelectedSlides: props.removeOneElemFromSelectedSlides,
        setSelectedElement: props.setSelectedElement,
        svgRef: props.svgRef
      })

      event.preventDefault()
    }  
  }

  useEffect(() => {
    const selectedSlides = props.selectedSlides
    if (props.isSmallSlide && !selectedSlides.includes(props.currSlide.id) && canMoveSlides) {
      props.svgRef.current?.addEventListener('mouseup', mouseUpSelectSlide)
      return () => props.svgRef.current?.removeEventListener('mouseup', mouseUpSelectSlide)
    }
  })

  const mouseUpSelectSlide = (event: React.MouseEvent | MouseEvent) => {
      const secondSlideId: string = props.currSlide.id 
      const index = searchChangedSlideIndexById(props.slides, secondSlideId)
      if (canMoveSlides.current) {
        props.moveSlide(index)
      }
  } 
}


interface lighInsertPlaceProps {
  slides: Array<Slide>,
  selectedSlides: Array<string>,
  currSlide: Slide,
  svgRef: React.MutableRefObject<SVGSVGElement | null>,
  divRef: React.MutableRefObject<HTMLDivElement | null>,
  slidesPanelRef: React.MutableRefObject<HTMLDivElement | null> | null,
  isSmallSlide: boolean,
  slideBorderLight: borderLightType,
  setSlideBorderLight: (borderLightPlace: string, slideId: string) => void
} 

function useLighSlideInsertPlace(props: lighInsertPlaceProps) {   

  useEffect(() => {
    const selectedSlides = props.selectedSlides
    if (props.isSmallSlide && !props.selectedSlides.includes(props.currSlide.id)) { 
      props.slidesPanelRef?.current?.addEventListener('mousedown', mouseDownNotSelectSlide)
      return () => props.slidesPanelRef?.current?.removeEventListener('mousedown', mouseDownNotSelectSlide)
    }
  })

  const mouseDownNotSelectSlide = (event: React.MouseEvent | MouseEvent) => {
    const selectedSlides = props.selectedSlides
    if (event.defaultPrevented) {
      props.svgRef.current?.addEventListener('mouseenter', mouseEnterNotSelectSlide)
      props.divRef.current?.addEventListener('mouseleave', mouseLeaveNotSelectSlide)
      document.addEventListener('mouseup', mouseUpNotSelectSlide)
    }  
  }


  const mouseEnterNotSelectSlide = () => {
    const selectedSlides = getSelectedSlides()
    if (props.isSmallSlide) { 
      const selectedSlideId = selectedSlides[0]
      const otherSlideId = props.currSlide.id
      
      if (checkSecondSlideIsBeyond(props.slides, selectedSlideId, otherSlideId)) {
        props.setSlideBorderLight('bottom', props.currSlide.id)
      } else {
        props.setSlideBorderLight('top', props.currSlide.id)
      }
    }
  }

  const mouseLeaveNotSelectSlide = () => {
    if(props.slideBorderLight.borderLightPlace !== 'unset') {
      props.setSlideBorderLight('unset', props.currSlide.id)
    }  
  }

  const mouseUpNotSelectSlide = () => {
    props.setSlideBorderLight('unset', props.currSlide.id)
    props.svgRef.current?.removeEventListener('mouseenter', mouseEnterNotSelectSlide)
    document.removeEventListener('mouseup', mouseUpNotSelectSlide)}
}
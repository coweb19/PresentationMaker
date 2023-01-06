import React, { useContext, useEffect }  from 'react'
import { checkSelectedElem, getElemByIdToPalette } from '../Models/CommonFunctions/supportFunctions/supportElemOperations'
import { checkSecondSlideIsBeyond } from '../Models/CommonFunctions/supportFunctions/supportSlideOperations'
import { Slide } from '../Models/types'
import { PaletteContext } from '../View/Palette/Palette'


export {
  setSelectedElemsInHook,
  setSelectedSlidesInHook,
  checkSlideForReplace,
  useSetGlobalActiveTool
}


interface setSelectedElemsProps {
  selectedElements: Array<string>,
  setSelectedElement: (elemsArr: Array<string>) => void,
  removeOneElemFromSelectedElems: (elemId: string) => void,
  event: React.MouseEvent | MouseEvent, 
  elemId: string
}

function setSelectedElemsInHook(props: setSelectedElemsProps) {
  if (!checkSelectedElem(props.selectedElements, props.elemId)) {
    if (props.event.ctrlKey) { 
      props.setSelectedElement([...props.selectedElements, props.elemId]) 
    } else {
      props.setSelectedElement([props.elemId])
    } 
  } else if (props.event.ctrlKey) {
    props.removeOneElemFromSelectedElems(props.elemId)
  }
}


interface setSelectedSlidesProps {
  slides: Array<Slide>,
  selectedSlides: Array<string>,
  selectedElements: Array<string>,
  canDeleteSlides: boolean,
  setSelectedSlides: (slidesArr: Array<string>) => void,
  setCanDeleteSlide: (canDelete: boolean) => void,
  removeOneElemFromSelectedSlides: (slideId: string) => void,
  setSelectedElement: (elemsArr: Array<string>) => void,
  
  event: React.MouseEvent | MouseEvent, 
  slideId: string,
  canMoveSlides: React.MutableRefObject<boolean>,

  svgRef: React.MutableRefObject<SVGSVGElement | null>
}

function setSelectedSlidesInHook(props: setSelectedSlidesProps) {
  const canDeleteSlides = props.canDeleteSlides
  const selectedSlides = props.selectedSlides
  const selectedElements = props.selectedElements
  let reselectSlide = false
  if (!canDeleteSlides) { 
    props.setSelectedSlides([props.slideId])  
    props.setCanDeleteSlide(true)
  }

  const mouseLeaveListner = (e: MouseEvent) => {
    reselectSlide = true
  }

  const mouseEnterListner = (e: MouseEvent) => {
    reselectSlide = false
  }

  const mouseUpListner = () => {
    if (!reselectSlide) {
      props.setSelectedSlides([props.slideId])
    }
    props.svgRef.current?.removeEventListener('mouseover', mouseLeaveListner)
    props.svgRef.current?.addEventListener('mouseenter', mouseEnterListner)
    document.removeEventListener('mouseup', mouseUpListner)
  }

  if (!selectedSlides.includes(props.slideId)) { 
    if (props.event.ctrlKey) { 
      props.setSelectedSlides([...selectedSlides, props.slideId])
    } else {
      props.setSelectedSlides([props.slideId])
    }
  } else if (selectedSlides.length > 1) {
    if (props.event.ctrlKey) {
      props.removeOneElemFromSelectedSlides(props.slideId)
      props.canMoveSlides.current = false
    } else {
      props.svgRef.current?.addEventListener('mouseleave', mouseLeaveListner)
      props.svgRef.current?.addEventListener('mouseenter', mouseEnterListner)
      document.addEventListener('mouseup', mouseUpListner)
    }  
  }   
  
  if (selectedElements.length !== 0) {
    props.setSelectedElement([])
  }
}



interface chekSlideReplaceProps {
  slides: Array<Slide>,
  selectedSlides: Array<string>,
  selectedElements: Array<string>,
  event: React.MouseEvent | MouseEvent,
  svgRef: React.MutableRefObject<SVGSVGElement | null>, 
  slideId: string
}

function checkSlideForReplace(props: chekSlideReplaceProps): boolean {
  let canMoveSlide = false;
  let correctCursorPos = false;
  const mousePosY = props.event.pageY
  const svgPosY = Number(props.svgRef.current?.getBoundingClientRect().y)
  const svgHeight = Number(props.svgRef.current?.getBoundingClientRect().height)
  const selectedSlideId = props.selectedSlides[0]
  const otherSlideId = props.slideId
  const otherSlideIsBeyond = checkSecondSlideIsBeyond(props.slides, selectedSlideId, otherSlideId)

  const elemsArrLength = props.selectedElements.length
  const slidesArrLength = props.selectedSlides.length

  const slideHeightLimit = svgPosY + (svgHeight / 2)

  if ((!otherSlideIsBeyond && mousePosY < slideHeightLimit) || (otherSlideIsBeyond && mousePosY > slideHeightLimit)) {
    correctCursorPos = true
  }

  if(correctCursorPos && elemsArrLength === 0 && slidesArrLength === 1 && !props.event.ctrlKey) {
    canMoveSlide = true
  } 
  
  return canMoveSlide
}


interface setActiveToolProps {
  selectedElements: Array<string>,
  slides: Array<Slide>,
}

function useSetGlobalActiveTool(props: setActiveToolProps) {
  const {setActiveTool, setValue} = useContext(PaletteContext)
  useEffect(() => {
    if (props.selectedElements.length == 0) {
      setActiveTool(0)
    } else if (props.selectedElements.length > 1) {
      setActiveTool(2)
    } else {
      let activeElem = getElemByIdToPalette(props.slides, props.selectedElements[0])
      if (activeElem == null) 
        setActiveTool(0)
      else if (activeElem.type == 'text') {
        setActiveTool(1);
      } else 
        setActiveTool(2)
    } 
  }, [props.selectedElements])
}
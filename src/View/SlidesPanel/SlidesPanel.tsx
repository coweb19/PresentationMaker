import React, { useRef, useState } from 'react'
import './SlidesPanel.css'
import { borderLightType, Programm, Slide, MainProg } from '../../Models/types'
import { getListSlides } from '../commonViewFunctions'
import { connect } from 'react-redux'

interface slidesPanelProps {
  slides: Array<Slide>,
  selectedSlides: Array<string>,
  canDeleteSlides: boolean,
  slideBorderLight: borderLightType
}

function SlidesPanel(props: slidesPanelProps) {

  const slidesPanelRef = useRef<HTMLDivElement | null>(null)
  
  const slidesList = getListSlides({
    slideBorderLight: props.slideBorderLight, 
    slides: props.slides, 
    selectedSlides: props.selectedSlides, 
    canDeleteSlides: props.canDeleteSlides,
    slidesPanelRef 
  })

  return (
    <div ref={slidesPanelRef} className="slides-panel">
      {slidesList}
    </div>
  )  
}


const mapStateToProps = (state: Programm) => ({
  slides: state.mainProg.currentPresentation.slides,
  selectedSlides: state.mainProg.selectedSlides,
  canDeleteSlides: state.commonDeps.canDeleteSlides,
  slideBorderLight: state.commonDeps.slideBorderLight
})
  
export default connect(mapStateToProps)(SlidesPanel)
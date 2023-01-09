import React from 'react'
import './HeaderPanel.css'
import { Commands, MenuItem } from '../Commands/Commands'
import  Tools  from '../Tools/Tools'
import { createDefaultProgram, getMainProg, changePresentationTitle, setPlayerState } from '../../Models/ActionCreators/commonActionCreators'
import { savePresentationAsJSON, loadPresentation, saveProgramAsPDF, openProgramAsPDF } from '../../Models/CommonFunctions/setGetPresentation'
import { connect } from 'react-redux'
import { MainProg, Programm, Slide } from '../../Models/types'
import { addSlide, setSelectedSlides } from '../../Models/ActionCreators/slideActionCreators'


interface HeaderPanelProps {
  slides: Array<Slide>
  addSlide: () => void, title: string, 
  getMainProg: (prog: MainProg) => void,
  createDefaultProgram: () => void,
  changePresentationTitle: (newTitle: string) => void,
  setPlayerState: (playerState: 'open' | 'close') => void,
  setSelectedSlides: (selectedSlides: Array<string>) => void
}


function HeaderPanel(props: HeaderPanelProps) {
  const menu: Array<MenuItem> = [
    {title: "New", onClick: () => props.createDefaultProgram()},
    {title: "Open", onClick: () => loadPresentation(props.getMainProg)},
    {title: "Save", onClick: () => savePresentationAsJSON()},
    {title: "Preview", onClick: () => openProgramAsPDF()},
    {title: "toPDF", onClick: () => saveProgramAsPDF()},
    {title: "Slideshow", onClick: () => {
      let elem = document.querySelector(".mainSlideDiv")
      elem?.requestFullscreen().catch(err => {
        alert(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`)
      })
      props.setPlayerState('open')
      props.setSelectedSlides([props.slides[0].id])
    }}
  ]

  return (
    <div className="header-panel">
      <input type="text" className="title" defaultValue={props.title} 
        onKeyPress= {
          (e) => {if (e.key === "Enter") {
              // eslint-disable-next-line eqeqeq
            e.currentTarget.value = (e.currentTarget.value == '') ? 'Default presentation' : e.currentTarget.value
            props.changePresentationTitle(e.currentTarget.value)
            e.currentTarget.blur()
            }}
        } 
      />
      <img
          src="./logo.png"
          alt='coweb-19'
      />
      <Commands menu={menu} />
      <Tools />
    </div>
  )
}

const mapDispatchToProps = {
    addSlide,
    getMainProg,
    createDefaultProgram,
    changePresentationTitle,
    setPlayerState,
    setSelectedSlides
}

const mapStateToProps = (state: Programm) => ({
  title: state.mainProg.currentPresentation.title,
  slides: state.mainProg.currentPresentation.slides 
})

export default connect(mapStateToProps, mapDispatchToProps)(HeaderPanel)
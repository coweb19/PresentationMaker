import React, { useContext } from 'react'
import './MainPanel.css'
import MainSlide from '../Slide/Slide'
import { PopupContext } from '../Popup/Popup'
import { connect } from 'react-redux'
import { Programm, Slide } from '../../Models/types'
import { searchChangedSlideIndex } from '../../Models/CommonFunctions/supportFunctions/supportSlideOperations'

interface MainPanelProps {
  slides: Array<Slide>, 
  selectedSlides: Array<string>
}

function MainPanel(props: MainPanelProps) {
  const changedSlideIndex = searchChangedSlideIndex(props.slides, props.selectedSlides)
  const {visible, setVisible, value, setValue} = useContext(PopupContext);

  const mouseUpHandler = () => {
    setVisible(false);
    document.removeEventListener('mousedown', mouseUpHandler);
  }

  let mainSlide: JSX.Element = 
    <div className='MainSlide'>
        <svg className='mainSlideSvg'/>    
    </div>    

  if(props.slides.length !== 0) {
    mainSlide = <MainSlide numberOfSlide={changedSlideIndex} isSmallSlide={false} slidesPanelRef={null}/> 
  }

  return (
    <div className={"MainPanel "} onClick={() => ''} 
      onContextMenu={(e) => {
        e.preventDefault();
        setValue({ 
          items: [
            {caption: 'Добавить слайд', action: () => {console.log('Добавить слайд')}},
            {caption: 'Сохранить', action: () => {console.log('Сохранить')}},
            {caption: 'Экспорт в PDF', action: () => {console.log('Экспорт в PDF')}},
          ],
          pos: {x: e.clientX, y: e.clientY},
          width: 150
        })
        setVisible(true)
        document.addEventListener('mousedown', mouseUpHandler)
      }
    }>    
      { mainSlide }    
    </div>
  )
}



const mapStateToProps = (state: Programm) => ({
    slides: state.mainProg.currentPresentation.slides,
    selectedSlides: state.mainProg.selectedSlides 
})

export default connect(mapStateToProps)(MainPanel)
import React, {useState, useContext, useEffect} from 'react'
import './FontPicker.css'
import { PopupContext } from '../Popup/Popup'
import { connect } from 'react-redux'
import { changeTextObj } from '../../Models/ActionCreators/elemActionCreators'
import { Programm, Slide } from '../../Models/types'
import { getElemByIdToPalette } from '../../Models/CommonFunctions/supportFunctions/supportElemOperations'


const defValue = "Arial"

interface FontPickerProps {
  changeTextObj: (newParams: {newParam: string, paramToChange: "textColor" | "text" | "fontSize" | "fontFamily", id: string}) => void,
  selectedElements: Array<string>,
  slides: Array<Slide>
}

function FontPicker(props: FontPickerProps) {
    
  let activeElem = getElemByIdToPalette(props.slides, props.selectedElements[0])

  const [fontName, setFontName] = useState(defValue);
  const {setVisible: setVisiblePopup, setValue: setValuePopup, visible: visiblePopup, parent: parentPopup, setParent: setParentPopup} = useContext(PopupContext)


  useEffect(() => {
    let fName: string = defValue
    if ((activeElem != null) && (activeElem.type == 'text')) {
    fName = activeElem.fontFamily
    }
    setFontName(fName)
  }, [activeElem])

  const mouseUpHandlerPopup = () => {
    setVisiblePopup(false)   
    document.removeEventListener('mousedown', mouseUpHandlerPopup)  
  }
    
  return (
    <div className="fontPicker" onMouseDown = {(e) => {
      e.preventDefault()
      if ((visiblePopup) && (parentPopup == 'fontPicker')) {
        return
      }
      setValuePopup({ 
        items: [
        {caption: 'Arial', action: () => {props.changeTextObj({newParam: String('Arial'), paramToChange: 'fontFamily', id: ''})}},
        {caption: 'Caveat', action: () => {props.changeTextObj({newParam: String('Caveat'), paramToChange: 'fontFamily', id: ''})}},
        {caption: 'Comfortaa', action: () => {props.changeTextObj({newParam: String('Comfortaa'), paramToChange: 'fontFamily', id: ''})}},
        {caption: 'Comic Sans MS', action: () => {props.changeTextObj({newParam: String('Comic Sans MS'), paramToChange: 'fontFamily', id: ''})}},
        {caption: 'Courier New', action: () => {props.changeTextObj({newParam: String('Courier New'), paramToChange: 'fontFamily', id: ''})}},
        {caption: 'Oblique', action: () => {props.changeTextObj({newParam: String('Oblique'), paramToChange: 'fontFamily', id: ''})}}
        ],  
        pos: {x: e.currentTarget.offsetLeft, y: e.currentTarget.offsetTop + e.currentTarget.offsetHeight},
        width: 120
      })
      setVisiblePopup(true)
      setParentPopup('fontPicker')
      document.addEventListener('mousedown', mouseUpHandlerPopup)
    }}>
      {fontName}
    </div>
)
}

const mapDispatchToProps = {
    changeTextObj
}
  
const mapStateToProps = (state: Programm) => {
return {
    selectedElements: state.mainProg.selectedElements,
    slides: state.mainProg.currentPresentation.slides
}}

export default connect(mapStateToProps, mapDispatchToProps)(FontPicker)
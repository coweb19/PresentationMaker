import React, {useState, useContext } from 'react'
import './Palette.css'
import { ColorPickerContext } from '../ColorPicker/ColorPicker'
import SizePicker  from '../SizePicker/SizePicker'
import { Color, Picture, PictureObj, Programm, ShapeObj, TextObj } from '../../Models/types'
import { connect } from 'react-redux'
import { setCanDeleteSlide } from '../../Models/ActionCreators/commonActionCreators'
import { PopupContext } from '../Popup/Popup'
import FontPicker from '../FontPicker/FontPicker'
import { ModalContext } from '../Modal/Modal';
import { setSlideBackground } from '../../Models/ActionCreators/slideActionCreators'
import { changeShapeObj, setSelectedElement } from '../../Models/ActionCreators/elemActionCreators'
import { getAllElemsIdArr } from '../../Models/CommonFunctions/SupportFunctions/supportElemOperations'
import { searchChangedSlideIndex } from '../../Models/CommonFunctions/SupportFunctions/supportSlideOperations'

export {
  PaletteLayer,
  PaletteContext,
}

const defActiveTool: number = 0
type fontValue = {
  fontFamily: string,
  fontSize: string
}
const defValue: fontValue = {fontFamily: 'Arial', fontSize: '15'}

const PaletteProps = {
  activeTool: defActiveTool,
  setActiveTool: (activeTool: number) => {},
  value: defValue,
  setValue: (value: fontValue) => {}
}

const PaletteContext = React.createContext(PaletteProps)

function PaletteLayer({ children }: any) {
  const [activeTool, setActiveTool] = useState(defActiveTool)
  const [value, setValue] = useState(defValue);
       
  return (
     <PaletteContext.Provider value = {{activeTool, setActiveTool, value, setValue}}>
      { children }
    </PaletteContext.Provider>
  )
}



interface PaleteProps {
  setSlideBackground: (newBackground: Picture | Color) => void,
  changeShapeObj: (newParam: string, paramToChange: 'borderColor' | 'fillColor' | 'borderWidth') => void,
  setSelectedElement: (selectedElems: Array<string>) => void,
  setCanDeleteSlide: (canDelete: boolean) => void,
  elems: Array<ShapeObj | PictureObj | TextObj> 
}


function Palette(props: PaleteProps) {
  const {activeTool, setActiveTool, value} = useContext(PaletteContext) 
  const {setVisible, setValue, visible, parent, setParent} = useContext(ColorPickerContext)
  const {setVisible: setVisiblePopup, setValue: setValuePopup, visible: visiblePopup, parent: parentPopup, setParent: setParentPopup} = useContext(PopupContext)  
  const {visible: visibleModal, setVisible: setVisibleModal, setType: setTypeModal} = useContext(ModalContext)
    
  const mouseDownHandler = () => {
    setVisible(false)
    document.removeEventListener('mousedown', mouseDownHandler)  
  }

  const mouseUpHandlerPopup = () => {
    setVisiblePopup(false)
    document.removeEventListener('mousedown', mouseUpHandlerPopup);    
  }

  const colorFill: JSX.Element = 
    <div className="palette__element palette__element_ico ico_colorFill" 
      onMouseDown = {(e) => {
        e.preventDefault()
        if ((visible) && (parent == 'fill')) {
          return
        }
        const pos = {
          x: e.currentTarget.offsetLeft, 
          y: e.currentTarget.offsetTop + e.currentTarget.offsetHeight
        }
        setValue({
          isColorClear: true,
          position: pos,
          action: 'fill'
        }); 
        setVisible(true)
        setParent('fill')
        document.addEventListener('mousedown', mouseDownHandler);
    }}/>        


  const colorBorder: JSX.Element = 
    <div className="palette__element palette__element_ico ico_colorBorder" 
      onMouseDown = {(e) => {
        e.preventDefault()
        if ((visible) && (parent == 'border')) {
          return
        }
        const pos = {
          x: e.currentTarget.offsetLeft, 
          y: e.currentTarget.offsetTop + e.currentTarget.offsetHeight
        };
        setValue({
          isColorClear: true,
          position: pos,
          action: 'border'
        }) 
        setVisible(true)
        setParent('border')
        document.addEventListener('mousedown', mouseDownHandler)
    }}/>

  const borderWidth: JSX.Element = 
    <div className="palette__element palette__element_ico ico_borderWidth" 
      onMouseDown = {(e) => {
        e.preventDefault()
        if ((visiblePopup) && (parentPopup == 'borderWidth')) {
          return;
        }
        setValuePopup({ 
          items: [
            {caption: '0 px', action: () => props.changeShapeObj('0' ,'borderWidth')},
            {caption: '1 px', action: () => props.changeShapeObj('1' ,'borderWidth')},
            {caption: '5 px', action: () => props.changeShapeObj('5' ,'borderWidth')},
            {caption: '10 px.', action: () => props.changeShapeObj('10' ,'borderWidth')},
            {caption: '15 px', action: () => props.changeShapeObj('15' ,'borderWidth')},
            {caption: '20 px', action: () => props.changeShapeObj('20' ,'borderWidth')}
          ],  
          pos: {x: e.currentTarget.offsetLeft, y: e.currentTarget.offsetTop + e.currentTarget.offsetHeight},
          width: 80
        }) 
        setVisiblePopup(true)
        setParentPopup('borderWidth')
        document.addEventListener('mousedown', mouseUpHandlerPopup)
    }}/>

  const colorText: JSX.Element = 
    <div className="palette__element palette__element_ico ico_colorText" 
      onMouseDown = {(e) => {
        e.preventDefault()
        if ((visible) && (parent == 'txt')) {
          return
        }
        const pos = {
          x: e.currentTarget.offsetLeft, 
          y: e.currentTarget.offsetTop + e.currentTarget.offsetHeight
        }

        setValue({
          isColorClear: false,
          position: pos,
          action: 'txt'
        }) 
        setVisible(true)
        setParent('txt')
        document.addEventListener('mousedown', mouseDownHandler)
    }}/>

  return (
    <div className="palette">
      {activeTool == 0 &&
      <>
        <span className="palette__element element_text" 
          onClick={(e) => {
            setTypeModal(0) 
            setVisibleModal(true)
          }}
        > Background </span>
        <span className="palette__element element_text"
          onMouseDown={() => {
            props.setSelectedElement(getAllElemsIdArr(props.elems));
            props.setCanDeleteSlide(false)}}
        > Select all </span>
      </>
      }
      {activeTool == 1 && 
      <>
        {colorFill}
        {colorBorder}
        {borderWidth}
        <FontPicker />
        <SizePicker />
        {colorText}
      </>
      }
      {activeTool == 2 &&
      <>
        {colorFill}
        {colorBorder}
        {borderWidth}
      </>
      }
    </div>    
    )
}


const mapDispatchToProps = {
  setSlideBackground,
  changeShapeObj,
  setSelectedElement,
  setCanDeleteSlide     
}


function mapStateToProps(state: Programm){
  const slides = state.mainProg.currentPresentation.slides
  const selectedSlides = state.mainProg.selectedSlides
  const slideIndex = searchChangedSlideIndex(slides, selectedSlides)

  return {
    slides,
    selectedElements: state.mainProg.selectedElements,
    selectedSlides,
    elems: state.mainProg.currentPresentation.slides[slideIndex].elements
  }    
}

export default connect(mapStateToProps, mapDispatchToProps)(Palette)


import React from 'react';
import './App.css';
import  HeaderPanel  from './View/HeaderPanel/HeaderPanel';
import  SlidesPanel  from './View/SlidesPanel/SlidesPanel';
import  MainPanel from './View/MainPanel/MainPanel';
import { PopupLayer, Popup } from './View/Popup/Popup';
import { useDeleteSelectedElems, useDeleteSelectedSlides, useMouseDownDocumentListner } from './CustomHooks/CommonMouseKeyboardEvents';
import { connect } from 'react-redux';
import { Programm } from './Models/types';
import { setCanDeleteSlide } from './Models/ActionCreators/commonActionCreators';
import { ColorPickerLayer, ColorPicker } from './View/ColorPicker/ColorPicker'; 
import { PaletteLayer } from './View/Palette/Palette'; 
import { copyPasteListners } from './CustomHooks/CommonDifferentHooks';
import Modal, { ModalLayer } from './View/Modal/Modal'
import { deleteSlides, setSelectedSlides } from './Models/ActionCreators/slideActionCreators';
import { setSelectedElement, deleteSelectedElements } from './Models/ActionCreators/elemActionCreators';


interface AppProps {
  canDeleteSlides: boolean,
  selectedSlides: Array<string>,
  selectedElements: Array<string>,
  setSelectedSlides: (slidesArr: Array<string>) => void,
  setCanDeleteSlide: (canDelete: boolean) => void,
  setSelectedElement: (elemsArr: Array<string>) => void,
  deleteSelectedElements: () => void,
  deleteSlide: () => void  
}

function App(props: AppProps) {

  useDeleteSelectedSlides(props.canDeleteSlides, props.deleteSlide)
  useMouseDownDocumentListner({
    canDeleteSlides: props.canDeleteSlides,
    selectedSlides: props.selectedSlides,
    selectedElements: props.selectedElements,
    setCanDeleteSlide: props.setCanDeleteSlide,
    setSelectedSlides: props.setSelectedSlides,
    setSelectedElement: props.setSelectedElement
  })

  return (
    <ModalLayer>
      <PaletteLayer>
        <ColorPickerLayer>
          <PopupLayer>
            <div className="App">
              <div className="App-header">      
                <HeaderPanel />
              </div>
              <div className="App-body">
                <SlidesPanel />
                <MainPanel />
              </div>
              <div className="additional">
                <Popup />
                <ColorPicker />
              </div>
              <div className="App-footer">
              </div>
              <Modal />
            </div>
          </PopupLayer>
        </ColorPickerLayer>
      </PaletteLayer>
    </ModalLayer>
  )
}

const mapDispatchToProps = {
    setSelectedSlides,
    setCanDeleteSlide,
    setSelectedElement,
    deleteSelectedElements,
    deleteSlide: deleteSlides
}

const mapStateToProps = (state: Programm) => ({
  selectedElements: state.mainProg.selectedElements,
  selectedSlides: state.mainProg.selectedSlides,
  canDeleteSlides: state.commonDeps.canDeleteSlides 
}) 

export default connect(mapStateToProps,  mapDispatchToProps)(App)
import React, {useEffect} from 'react'
import { store } from '..'
import { goBackArchive, goForwardArchive, setPlayerState } from '../Models/ActionCreators/commonActionCreators'
import { copyElems, pasteElems } from '../Models/ActionCreators/elemActionCreators'
import { copySlides, pasteSlides, switchNextSlide } from '../Models/ActionCreators/slideActionCreators'
import { saveState, saveStateToArchive } from '../Models/CommonFunctions/archive'
import { Point, Slide } from '../Models/types'


export {
  useNormalizeElemSize,
  useSetElemPropsAfterSlideChanged
}


interface NormalizeImgProps {
  id: string,
  resizeElement: (newWidth: number, newHeigth: number, newPosX: number, newPosY: number, id: string) => void,
  setSize: React.Dispatch<React.SetStateAction<{ width: number; height: number; }>>
  elemWidth: number,
  elemHeight: number, 
  svgWidth: number, 
  svgHeight: number,
}

function useNormalizeElemSize(props: NormalizeImgProps) { 
  useEffect(() => {
    if (props.elemWidth >= props.svgWidth || props.elemHeight >= props.svgHeight) {
      let newImgSize = {
        width: props.elemWidth,
        height: props.elemHeight
      } 
      if (props.elemWidth > props.elemHeight) {
        newImgSize = {
          width: 900,
          height: 700
        }
      }
      if (props.elemWidth < props.elemHeight) {
        newImgSize = {
          width: 700,
          height: 900
        }
      }
      if (props.elemWidth == props.elemHeight) {
        newImgSize = {
          width: 800,
          height: 800
        }
      }
     
      props.resizeElement(newImgSize.width, newImgSize.height, 10, 10, props.id)
      props.setSize(newImgSize)
    } 
  }, [])
}


interface changeElemProps {
  slides: Array<Slide>,
  x: number
  y: number
  width: number
  height: number
  setPos: React.Dispatch<React.SetStateAction<Point>>,
  setSize: React.Dispatch<React.SetStateAction<{width: number, height: number}>>
}

function useSetElemPropsAfterSlideChanged(props: changeElemProps) {
  useEffect(() => {
    props.setPos({x: props.x, y: props.y})
    props.setSize({width: props.width, height: props.height})
  }, [props.slides])    
}


export function saveToArh() {
  const newState = store.getState()
  saveStateToArchive(newState)
  saveState(newState)

  store.subscribe(() => {
    const newState = store.getState()
    if(!newState.commonDeps.playerIsOpen) {
      saveStateToArchive(newState) 
      saveState(newState)
    }
  }) 
}

export function undoRedoListners() {
  const undoListner = (event: KeyboardEvent) => {
    if(!store.getState().commonDeps.playerIsOpen) {
      if (event.code == 'KeyZ' && (event.ctrlKey || event.metaKey)) {
        store.dispatch(goBackArchive())
      }
      if (event.code == 'KeyY' && (event.ctrlKey || event.metaKey)) {
        store.dispatch(goForwardArchive())
      }
    }  
  }
  document.addEventListener('keydown', undoListner)
}

export function fullScrinEvents() {
  const fullScreenListner = (event: any) => {
    if (!document.fullscreenElement) {
      store.dispatch(setPlayerState('close'))
    }
  }
  const leftRightListner = (event: any) => {
    const playerIsOpen = store.getState().commonDeps.playerIsOpen
    if (event.keyCode === 37 && playerIsOpen) {
      store.dispatch(switchNextSlide('back'))
    }
    if (event.keyCode === 39 && playerIsOpen) {
      store.dispatch(switchNextSlide('forward'))
    }
  } 
  document.addEventListener('fullscreenchange', fullScreenListner)
  document.addEventListener('keydown', leftRightListner)
}


export function copyPasteListners() {   
  const copyPasteListner = (event: KeyboardEvent) => {
    const playerIsOpen = store.getState().commonDeps.playerIsOpen
    const canDeleteSlide = store.getState().commonDeps.canDeleteSlides
    const selectedElemsLength = store.getState().mainProg.selectedElements.length
    const copyElemsLength = store.getState().commonDeps.copyElemsArr.length
    const copySlidesLength = store.getState().commonDeps.copySlidesArr.length

    if (event.code == 'KeyC' && (event.ctrlKey || event.metaKey) && !playerIsOpen) {
      if (!canDeleteSlide && selectedElemsLength != 0) {
        store.dispatch(copyElems())
        
      }
      if (canDeleteSlide && selectedElemsLength == 0) {
        store.dispatch(copySlides())
      }
    }
    if (event.code == 'KeyV' && (event.ctrlKey || event.metaKey) && !playerIsOpen) {
      if (copyElemsLength != 0 && copySlidesLength == 0 && !canDeleteSlide) {
        store.dispatch(pasteElems())
        event.preventDefault()
      }
      if (copySlidesLength != 0 && copyElemsLength == 0 && selectedElemsLength == 0) {
        store.dispatch(pasteSlides())
        event.preventDefault()
      }
    }
  }
  
  store.subscribe(() => {
    document.addEventListener('keydown', copyPasteListner)
  }) 
}
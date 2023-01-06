import React, {useEffect, useState, useRef} from 'react'
import { connect } from 'react-redux'
import { changeTextObj } from '../../Models/ActionCreators/elemActionCreators'
import { getElemByIdToPalette } from '../../Models/CommonFunctions/supportFunctions/supportElemOperations'
import { Programm, Slide } from '../../Models/types'
import './SizePicker.css'


const defValue = 50

interface SizePickerProps {
  changeTextObj: (newParams: {newParam: string, paramToChange: "textColor" | "text" | "fontSize" | "fontFamily", id: string}) => void,
  selectedElements: Array<string>,
  slides: Array<Slide>
}

function SizePicker(props: SizePickerProps) {

  let activeElem = getElemByIdToPalette(props.slides, props.selectedElements[0])

  const [value, setValue] = useState(defValue)

  const scope = (n: number) => {
    let newValue: number = n
    if (newValue < 5)
      newValue = 5
    if (newValue > 200)
      newValue = 200
    return newValue    
  }

  const setValueWithCheck = (n: number) => {
    let newValue: number = n
    if (newValue < 5)
      newValue = 5
    if (newValue > 200)
      newValue = 200
    setValue(newValue)
  }

  function increment() {
    setValueWithCheck(value + 1)
  }

  function decrement() {
    setValueWithCheck(value - 1)
  }

  const inputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    let fSize: number = defValue
    if ((activeElem != null) && (activeElem.type == 'text')) {
      fSize = Number(activeElem.fontSize)
    }
    setValueWithCheck(fSize)
  }, [activeElem])

  useEffect(() => {
    if (inputRef.current !== null)
      inputRef.current.value = String(value)
  }, [value])

    return (
      <div className = "sizePicker">
        <div className = "button" onMouseDown = {(event) => {
          event.preventDefault()
          props.changeTextObj({newParam: String(scope(value-1)), paramToChange: 'fontSize', id: ''})
        }}>-</div>

        <input type="text" className = "value" ref={inputRef} defaultValue={value}
          onMouseDown={(e) => {e.preventDefault(); e.currentTarget.focus()}}
          onKeyPress={(e) => {if (e.key === "Enter") e.currentTarget.blur()}}
          onBlur={(e) => {
            if ((e.currentTarget.value !== "") && (!isNaN(Number(e.currentTarget.value)))) {
              props.changeTextObj({newParam: String(scope(Number(e.currentTarget.value))), paramToChange: 'fontSize', id: ''})
            } else {
              e.currentTarget.value = String(scope(value))
            }
            e.preventDefault()
            props.changeTextObj({newParam: e.currentTarget.value, paramToChange: 'fontSize', id: ''})
          }}
        />    
            
        <div className = "button" onMouseDown = {(event) => {
          event.preventDefault()
          props.changeTextObj({newParam: String(scope(value+1)), paramToChange: 'fontSize', id: ''})
        }}>+</div>
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
  }
}
  
export default connect(mapStateToProps, mapDispatchToProps)(SizePicker)
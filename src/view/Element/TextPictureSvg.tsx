import React, { useEffect, useRef} from 'react'
import { checkSelectedElem } from '../../Models/CommonFunctions/supportFunctions/supportElemOperations'
import { PictureObj, TextObj } from '../../Models/types'

interface ImgTextObjectProps {
  shape: PictureObj | TextObj,
  elemRef:  React.MutableRefObject<(SVGPolygonElement & SVGRectElement & SVGImageElement & SVGEllipseElement) | null>,
  posX: number,
  posY: number,
  width: number,
  height: number,
  outlineRect: JSX.Element,
  isSmallElem: boolean,
  changeTextObj: any,
  setSaveToArch: any,
  setSelectedElement: any,
  selectedElemets: Array<string>,
  canDeleteSlides: boolean,
  playerIsOpen: boolean
}
 
export function ImgTextObject(props: ImgTextObjectProps) {
  let svgElem: JSX.Element = <rect/>
  let htmlElem: any
  let pictureRect = <rect/>
  let textRect = <rect/>
  let borderWidth = props.shape.borderWidth
  const resizeIndex = 10
  
  const inputRef = useRef<HTMLTextAreaElement | null>(null)

  if (props.isSmallElem) {
    borderWidth /= resizeIndex
  }

  useEffect(() => {  
    if (!props.isSmallElem && !props.canDeleteSlides && !props.playerIsOpen && checkSelectedElem(props.selectedElemets, props.shape.id)) {
      inputRef.current?.focus() 
      props.setSaveToArch()
    }  
  }, [])


  if (props.shape.type === 'text') {
    let fontSize = props.shape.fontSize
    let isReadOnly = false

    textRect = 
      <rect 
        x={props.posX - props.shape.borderWidth / 2}
        y={props.posY- props.shape.borderWidth / 2}
        width={props.width + props.shape.borderWidth}
        height={props.height + props.shape.borderWidth}
        stroke={props.shape.borderColor}
        strokeWidth={borderWidth}
        fill={props.shape.fillColor}
      />

    if (props.isSmallElem) {
      fontSize = String(Number(fontSize) / resizeIndex)
      isReadOnly = true
    }

    htmlElem = 
      <textarea
        spellCheck={'false'}
        readOnly={isReadOnly}
        ref={inputRef}
        defaultValue={props.shape.text}
        wrap={'off'}
        onMouseDown={(event) => {
            if (!props.isSmallElem) {
              props.setSaveToArch(false); 
              event.preventDefault(); 
              inputRef.current?.focus();
              if (event.ctrlKey) {
                props.setSelectedElement([...props.selectedElemets, props.shape.id])
              } else {
                props.setSelectedElement([props.shape.id])
              }
            }  
          }
        }
        onBlur={ 
          (event) => {
            if (!props.isSmallElem) {
              props.setSaveToArch(true);
              props.changeTextObj({newParam: event.target.value, paramToChange: 'text', id: props.shape.id})
            }  
          }
        }
        style={{
          width: props.width, 
          height: props.height, 
          fontSize: fontSize + 'px',
          fontFamily: props.shape.fontFamily,
          color: props.shape.textColor,
          background: props.shape.fillColor,
          border: 'unset',
          outline: 'unset', 
          resize: 'none',
          overflow: 'hidden'
        }}
      />
  }

  if (props.shape.type === 'picture') {
    pictureRect = 
      <rect 
        x={props.posX}
        y={props.posY}
        width={props.width}
        height={props.height}
        stroke={props.shape.borderColor}
        strokeWidth={props.shape.borderWidth}
        fill={'none'}
      />

    if (props.shape.fillColor == 'none') {
      htmlElem = 
        <img 
          src={props.shape.imgB64}
          alt='lis propal'
          style={{
            width: '100%', 
            height: '100%', 
          }}
        />  
    } else {
      htmlElem = 
        <div 
          style={{
            width: props.width,
            height: props.height,
            backgroundColor: props.shape.fillColor
          }}
        />   
    }    
  } 

  svgElem =
    <>
      {textRect}
      <foreignObject
        ref={props.elemRef}          
        id={props.shape.id}
        x={props.posX}
        y={props.posY}
        width={props.width}
        height={props.height}
      >
        {htmlElem}  
      </foreignObject>
      {pictureRect}
      {props.outlineRect}
    </>

  return svgElem
}
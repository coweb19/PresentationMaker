import React from 'react'
import { PictureObj, ShapeObj, TextObj } from '../../Models/types'

interface ShapeObjProps {
  shape: PictureObj | TextObj | ShapeObj
  elemRef:  React.MutableRefObject<(SVGPolygonElement & SVGRectElement & SVGImageElement & SVGEllipseElement) | null>
  posX: number
  posY: number
  width: number
  height: number
  borderWidth: number
  outlineRect: JSX.Element
}

export function ShapeObject(props: ShapeObjProps) {
  
  let svgElem: JSX.Element = <rect/>

  if (props.shape.type === 'triangle') {
    const leftPoint= {
      x: props.posX,
      y: Number(props.posY) + Number(props.height)
    }  
    const rightPoint = {
      x: Number(props.posX) + Number(props.width),
      y: Number(props.posY) + Number(props.height)
    } 
    const pickPoint = {
      x: Number(props.posX) + props.width / 2,
      y: props.posY
    }

    svgElem =
    <>    
      <polygon      
        ref={props.elemRef}
        id={props.shape.id}      
        points= {
          leftPoint.x + ' ' + leftPoint.y + ', ' +
          rightPoint.x + ' ' + rightPoint.y + ', ' +
          pickPoint.x + ' ' + pickPoint.y
        }
        fill={props.shape.fillColor} 
        stroke={props.shape.borderColor} 
        strokeLinejoin={'miter'}
        strokeWidth={props.borderWidth}
      />
      {props.outlineRect} 
    </>  
  }

  if (props.shape.type === 'rect') {
    svgElem = 
      <>
        <rect
          ref={props.elemRef}
          id={props.shape.id}
          x={props.posX}
          y={props.posY}  
          width={props.width}
          height={props.height}
          stroke={props.shape.borderColor} 
          fill={props.shape.fillColor} 
          strokeWidth={props.borderWidth}
        />
        {props.outlineRect} 
      </>
  }  

  if (props.shape.type === 'circle') {
    svgElem =
      <>
        <ellipse
          ref={props.elemRef} 
          id={props.shape.id}
          cx={props.posX + props.width / 2} 
          cy={props.posY + props.height / 2} 
          rx={props.width / 2}
          ry={props.height / 2} 
          fill={props.shape.fillColor} 
          stroke={props.shape.borderColor} 
          strokeWidth={props.borderWidth}
        />
        {props.outlineRect}  
      </>             
  }

  return svgElem
} 
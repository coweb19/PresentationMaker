import React from 'react'
import './Element.css'

interface OutlineRectProps {
  shapeType: string
  firstPointRef: React.MutableRefObject<SVGCircleElement | null>
  secondPointRef: React.MutableRefObject<SVGCircleElement | null>
  thirdPointRef: React.MutableRefObject<SVGCircleElement | null>
  fourthPointRef: React.MutableRefObject<SVGCircleElement | null>
  id: string
  posX: number
  posY: number
  width: number
  height: number
  borderWidth: number
}

export function OutlineRect(props: OutlineRectProps) {
  let outLineRect: JSX.Element = <rect />

  let width = props.width + props.borderWidth 
  let height = props.height + props.borderWidth

  let firstPointPosX = props.posX - props.borderWidth / 2
  let firstPointPosY = props.posY - props.borderWidth / 2

  let secondPointPosX = props.posX + props.borderWidth / 2 + props.width
  let secondPointPosY = props.posY - props.borderWidth / 2

  let thirdPointPosX = props.posX - props.borderWidth / 2
  let thirdPointPosY = props.posY + props.height + props.borderWidth / 2

  let fourthPointPosX = props.posX + props.borderWidth / 2 + props.width
  let fourthPointPosY = props.posY + props.borderWidth / 2 + props.height

  if (props.shapeType == 'triangle' || props.shapeType == 'text') {

    width = props.width + props.borderWidth * 2
    height = props.height + props.borderWidth * 1.5

    firstPointPosX = props.posX - props.borderWidth
    firstPointPosY = props.posY - props.borderWidth

    secondPointPosX = props.posX + props.borderWidth + props.width
    secondPointPosY = props.posY - props.borderWidth

    thirdPointPosX = props.posX - props.borderWidth
    fourthPointPosX = props.posX + props.borderWidth + props.width

    if (props.shapeType == 'text') {
      height = props.height + props.borderWidth * 2 
      thirdPointPosY += props.borderWidth / 2
      fourthPointPosY += props.borderWidth / 2  
    }
  }
  
  outLineRect =
    <> 
      <rect   
        id={props.id}
        x={firstPointPosX + 'px'} 
        y={firstPointPosY + 'px'}  
        width={width + 'px'}
        height={height + 'px'}
        stroke='black'
        strokeWidth='1'
        strokeDasharray='10, 7'  
        fill='none'
      />

      <circle key={1} id={'1'} ref={props.firstPointRef} cx={firstPointPosX} cy={firstPointPosY} r={5} fill='black' stroke='black'/>

      <circle key={2} id={'2'} ref={props.secondPointRef} cx={secondPointPosX} cy={secondPointPosY} r={5} fill='black' stroke='black'/>

      <circle key={3} id={'3'} ref={props.thirdPointRef} cx={thirdPointPosX} cy={thirdPointPosY} r={5} fill='black' stroke='black'/>

      <circle key={4} id={'4'} ref={props.fourthPointRef} cx={fourthPointPosX} cy={fourthPointPosY} r={5} fill='black' stroke='black'/>
    </>
  return outLineRect
}
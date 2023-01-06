import React, {useState, useContext} from 'react';
import { connect } from 'react-redux';
import { changeShapeObj, changeTextObj } from '../../Models/ActionCreators/elemActionCreators';
import { setSlideBackground } from '../../Models/ActionCreators/slideActionCreators';
import { Programm, Picture, Color } from '../../Models/types';
import './ColorPicker.css';


type RGB = {
  Red: number,
  Green: number,
  Blue: number,
  Opacity: number
};

interface ColorChooserProps {
  color: RGB, action: string, 
  changeShapeObj: (newParam: string, paramToChange: 'borderColor' | 'fillColor') => void,
  changeTextObj: (newParams: {newParam: string, paramToChange: "textColor" | "text" | "fontSize" | "fontFamily", id: string}) => void,
  setSlideBackground: (newBackground: Picture | Color) => void
}


function ColorChooser(props: ColorChooserProps) {
  const {Red, Green, Blue, Opacity} = props.color;

  let className = "colorChooser"
  if (props.color.Blue == 0 && props.color.Green == 0 && props.color.Red == 0 && props.color.Opacity == 0) {
    className = "color_clear"
  }

  const style = {
      backgroundColor: "rgba("+Red+","+Green+","+Blue+","+ Opacity+")"
  }

  const changeFillColor = () => {
    props.changeShapeObj("rgba("+Red+","+Green+","+Blue+","+Opacity+")", 'fillColor')
  }

  const changeBorderColor = () => {
    props.changeShapeObj("rgba("+Red+","+Green+","+Blue+","+Opacity+")", 'borderColor')
  }

  const changeTextColor = () => {
    props.changeTextObj({newParam: "rgba("+Red+","+Green+","+Blue+","+Opacity+")", paramToChange: 'textColor', id: ''})
  }

  const changeBackgroundColor = () => {
    props.setSlideBackground({hexColor: "rgba("+Red+","+Green+","+Blue+","+Opacity+")", type: 'color'})
  }

  return (
      <span className = {className} style = {style} onMouseDown = {
        (e) => {
          e.preventDefault();
          if (props.action == 'fill') {
            changeFillColor()
          }
          if (props.action == 'border') {
            changeBorderColor()
          }  
          if (props.action == 'txt') {
            changeTextColor()
          }
          if (props.action == 'background') {
            changeBackgroundColor()
          }
        }
      }/> 
  )
}


const mapDispatchToProps = {
  changeShapeObj,
  changeTextObj,
  setSlideBackground,
}

const mapStateToProps = (state: Programm) => {
return {
  slides: state.mainProg.currentPresentation.slides
}}

export default connect(mapStateToProps, mapDispatchToProps)(ColorChooser)

import React, {useState, useContext} from 'react';
import ColorChooser from './ColorChooser';
import './ColorPicker.css';

export {
  ColorPickerLayer,
  ColorPicker,
  ColorPickerContext,
}

const defVisible: boolean = false;
const defValue = {
  isColorClear: true,
  position: {x: 10, y: 10},
  action: '' 
}
const defParent: string = ""

const ColorPickerProps = {
  visible: defVisible, 
  setVisible: (visible: boolean) => {},
  value: defValue,
  setValue: (value: {isColorClear: boolean, position: {x: number, y: number}, action: string}) => {},
  parent: defParent,
  setParent: (parent: string) => {}
}

const ColorPickerContext = React.createContext(ColorPickerProps);

function ColorPickerLayer({ children }: any) {
  const [visible, setVisible] = useState(defVisible)
  const [value, setValue] = useState(defValue)
  const [parent, setParent] = useState(defParent)

  return (
      <ColorPickerContext.Provider value = {{visible, setVisible, value, setValue, parent, setParent}}>
          { children }
      </ColorPickerContext.Provider>
  )
}


function ColorPicker() {
  const {visible, setVisible, value} = useContext(ColorPickerContext)
    
  const style = {
      top: value.position.y,
      left: value.position.x
  }
  const toDO = value.action;
  const isColorClear = value.isColorClear;
  const className = "colorPicker "+(visible ? "" : "colorPicker_hide")

  return (
     <div className = {className} style = {style} onMouseDown={(e) => {e.preventDefault(); setVisible(false)}}>
         <ColorChooserContainer action={value.action}/>
     </div>    
   )
}



function ColorChooserContainer(props: {action: string}) {
  return (
    <div className = "colorChooserContainer">
      <ColorChooser color={{Red: 0, Green: 0, Blue: 0, Opacity: 0}} action={props.action}/>
      <ColorChooser color={{Red: 0, Green: 0, Blue: 0, Opacity: 1}} action={props.action}/>
      <ColorChooser color={{Red: 67, Green: 67, Blue: 67, Opacity: 1}} action={props.action}/>
      <ColorChooser color={{Red: 102, Green: 102, Blue: 102, Opacity: 1}} action={props.action}/>
      <ColorChooser color={{Red: 153, Green: 153, Blue: 153, Opacity: 1}} action={props.action}/>
      <ColorChooser color={{Red: 183, Green: 183, Blue: 183, Opacity: 1}} action={props.action}/>
      <ColorChooser color={{Red: 204, Green: 204, Blue: 204, Opacity: 1}} action={props.action}/>
      <ColorChooser color={{Red: 243, Green: 243, Blue: 243, Opacity: 1}} action={props.action}/>
      <ColorChooser color={{Red: 255, Green: 255, Blue: 255, Opacity: 1}} action={props.action}/>

      <ColorChooser color={{Red: 152, Green: 0, Blue: 0, Opacity: 1}} action={props.action}/>
      <ColorChooser color={{Red: 255, Green: 0, Blue: 0, Opacity: 1}} action={props.action}/>
      <ColorChooser color={{Red: 255, Green: 153, Blue: 0, Opacity: 1}} action={props.action}/>
      <ColorChooser color={{Red: 255, Green: 255, Blue: 0, Opacity: 1}} action={props.action}/>
      <ColorChooser color={{Red: 0, Green: 255, Blue: 0, Opacity: 1}} action={props.action}/>
      <ColorChooser color={{Red: 0, Green: 255, Blue: 255, Opacity: 1}} action={props.action}/>
      <ColorChooser color={{Red: 74, Green: 134, Blue: 232, Opacity: 1}} action={props.action}/>
      <ColorChooser color={{Red: 0, Green: 0, Blue: 255, Opacity: 1}} action={props.action}/>
            
      <ColorChooser color={{Red: 221, Green: 126, Blue: 107, Opacity: 1}} action={props.action}/>
      <ColorChooser color={{Red: 234, Green: 153, Blue: 153, Opacity: 1}} action={props.action}/>
      <ColorChooser color={{Red: 249, Green: 203, Blue: 156, Opacity: 1}} action={props.action}/>
      <ColorChooser color={{Red: 255, Green: 229, Blue: 153, Opacity: 1}} action={props.action}/>
      <ColorChooser color={{Red: 182, Green: 215, Blue: 168, Opacity: 1}} action={props.action}/>
      <ColorChooser color={{Red: 162, Green: 196, Blue: 201, Opacity: 1}} action={props.action}/>
      <ColorChooser color={{Red: 164, Green: 194, Blue: 244, Opacity: 1}} action={props.action}/>
      <ColorChooser color={{Red: 159, Green: 197, Blue: 232, Opacity: 1}} action={props.action}/>
            
      <ColorChooser color={{Red: 204, Green: 65, Blue: 37, Opacity: 1}} action={props.action}/>
      <ColorChooser color={{Red: 224, Green: 102, Blue: 102, Opacity: 1}} action={props.action}/>
      <ColorChooser color={{Red: 246, Green: 178, Blue: 107, Opacity: 1}} action={props.action}/>
      <ColorChooser color={{Red: 255, Green: 217, Blue: 102, Opacity: 1}} action={props.action}/>
      <ColorChooser color={{Red: 147, Green: 196, Blue: 125, Opacity: 1}} action={props.action}/>
      <ColorChooser color={{Red: 118, Green: 165, Blue: 175, Opacity: 1}} action={props.action}/>
      <ColorChooser color={{Red: 109, Green: 158, Blue: 235, Opacity: 1}} action={props.action}/>
      <ColorChooser color={{Red: 111, Green: 168, Blue: 220, Opacity: 1}} action={props.action}/>
            
      <ColorChooser color={{Red: 133, Green: 32, Blue: 12, Opacity: 1}} action={props.action}/>
      <ColorChooser color={{Red: 153, Green: 0, Blue: 0, Opacity: 1}} action={props.action}/>
      <ColorChooser color={{Red: 180, Green: 95, Blue: 4, Opacity: 1}} action={props.action}/>
      <ColorChooser color={{Red: 191, Green: 144, Blue: 0, Opacity: 1}} action={props.action}/>
      <ColorChooser color={{Red: 56, Green: 118, Blue: 19, Opacity: 1}} action={props.action}/>
      <ColorChooser color={{Red: 19, Green: 79, Blue: 61, Opacity: 1}} action={props.action}/>
      <ColorChooser color={{Red: 17, Green: 85, Blue: 135, Opacity: 1}} action={props.action}/>
      <ColorChooser color={{Red: 11, Green: 83, Blue: 99, Opacity: 1}} action={props.action}/>
            
      <ColorChooser color={{Red: 53, Green: 28, Blue: 117, Opacity: 1}} action={props.action}/>
      <ColorChooser color={{Red: 103, Green: 78, Blue: 167, Opacity: 1}} action={props.action}/>
      <ColorChooser color={{Red: 142, Green: 124, Blue: 195, Opacity: 1}} action={props.action}/>
      <ColorChooser color={{Red: 153, Green: 0, Blue: 255, Opacity: 1}} action={props.action}/>
      <ColorChooser color={{Red: 116, Green: 27, Blue: 71, Opacity: 1}} action={props.action}/>
      <ColorChooser color={{Red: 166, Green: 77, Blue: 121, Opacity: 1}} action={props.action}/>
      <ColorChooser color={{Red: 194, Green: 123, Blue: 160, Opacity: 1}} action={props.action}/>
      <ColorChooser color={{Red: 255, Green: 0, Blue: 255, Opacity: 1}} action={props.action}/>
    </div>
  )
}



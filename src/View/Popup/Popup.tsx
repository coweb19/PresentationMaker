import React, {useState, useContext} from 'react'
import './Popup.css'

export {
  PopupLayer,
  Popup,
  PopupContext,
}


type PopupItem  = {
  caption: string,
  action: () => void,
}

type Pos = {
  x: number,
  y: number,
}

export type PropsPopup = {
  items: Array<PopupItem>,
  pos: Pos,
  width: number,
}


const defVisible: boolean = false;
const defValue: PropsPopup = {
  items: [{caption: '<Пусто>', action: () => {}}],
  pos: {x: 0, y: 0},
  width: 100
}
const defParent: string = ""

const PopupProps = {
  visible: defVisible,
  setVisible: (visible: boolean) => {},
  value: defValue,
  setValue: (value: PropsPopup) => {},
  parent: defParent,
  setParent: (parent: string) => {}
}

const PopupContext = React.createContext(PopupProps)

function PopupLayer({ children }: any) {  
  const[visible, setVisible] = useState(defVisible)
  const[value, setValue] = useState(defValue)
  const[parent, setParent] = useState(defParent)
    
  return (
    <PopupContext.Provider value = {{visible, setVisible, value, setValue, parent, setParent}}>
      { children }    
    </PopupContext.Provider>
  )
}


function Popup() {
  const {visible, setVisible, value, setValue} = useContext(PopupContext);

  const style = {
      top: value.pos.y,
      left: value.pos.x,
      width: value.width
  }

  const className = "popup "+(visible ? "" : "popup_hide ")
    
  const listMenuItems = value.items.map((item, index) =>
    <li key={index} className="popup__menu__item" onMouseDown = {item.action}>{item.caption}</li>
  )

  return (
    <div className = {className} style = {style} onMouseDown={(e) => {e.preventDefault(); setVisible(false)}}>         
      <ul className="popup__menu">
        {listMenuItems}
      </ul>
    </div>
  )
}

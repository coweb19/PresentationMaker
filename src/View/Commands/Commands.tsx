import React, { useContext } from 'react'
import './Commands.css'
import { PopupContext } from '../Popup/Popup'


export { Commands }
export type MenuItem = {
  title: string,
  onClick: (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void
}


type CommandsProps = {
  menu: Array<MenuItem>
}

function Commands(props: CommandsProps) {
  const menuItems: Array<MenuItem> = props.menu
  const {setVisible} = useContext(PopupContext)

  const mouseUpHandler = () => {
    setVisible(false);
    document.removeEventListener('mouseup', mouseUpHandler)
  }


  const listMenuItems = menuItems.map((item, index) =>
    <span key={index} className="menu-item" onClick={(e) => {item.onClick(e); document.addEventListener('mouseup', mouseUpHandler)}}>{item.title}</span>
  )


  return (
    <div className="commands">
      {listMenuItems}
    </div>
  )
}

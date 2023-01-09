import React, { useContext } from 'react'
import './Tools.css'
import { setCanDeleteSlide } from '../../Models/ActionCreators/commonActionCreators'
import { goBackArchive, goForwardArchive} from '../../Models/ActionCreators/commonActionCreators'
import { Programm } from '../../Models/types'
import { connect } from 'react-redux'
import  Palette from '../Palette/Palette'
import { PopupContext } from '../Popup/Popup'
import { ModalContext } from '../Modal/Modal'
import { addSlide } from '../../Models/ActionCreators/slideActionCreators'
import { addPictureObj, addShapeObj, addTextObj } from '../../Models/ActionCreators/elemActionCreators'


interface toolsProps {
    addSlide: () => void,
    addTextObj: () => void,
    addShapeObj: (shape: 'rect' | 'triangle' | 'circle') => void,
    addPictureObj: (imgData: {width: number, height: number, imgB64: string}) => void,
    goBackArchive: () => void,
    goForwardArchive: () => void,
    setCanDeleteSlide: (canDelete: boolean) => void
}

function Tools(props: toolsProps) {
    const {setVisible, setValue} = useContext(PopupContext)
    const {setVisible: setVisibleModal, setType: setTypeModal} = useContext(ModalContext);


    const mouseUpHandler = () => {
        setVisible(false)
        document.removeEventListener('mouseup', mouseUpHandler)
    }

    return (
        <div className="tools" onClick={() => console.log("ты в инструментах")}>
            <div key={0} className="tool tool_add-slide" onClick={
                () => {props.addSlide(); props.setCanDeleteSlide(true)}}>
                <span className="tool__tooltip">Новый слайд</span>
            </div>
            <div key={1} className="tool tool_back-history" onMouseDown={(event) => {props.goBackArchive(); event.preventDefault()}}>
                <span className="tool__tooltip">Отменить</span>
            </div>
            <div key={2} className="tool tool_future-history" onMouseDown={(event) => {props.goForwardArchive(); event.preventDefault()}}>
                <span className="tool__tooltip">Повторить</span>
            </div>
            <div key={3} className={"tool tool_cursor "} onClick={() => { console.log('Курсор')}}>
                <span className="tool__tooltip">Выбрать</span>
            </div>
            <div key={4} className={"tool tool_text-obj "} onClick={() => {props.addTextObj(); }}>
                <span className="tool__tooltip">Текстовое поле</span>
            </div>
            <div key={5} className={" tool tool_pic-obj "}
                 onClick={(e) => {setTypeModal(1); setVisibleModal(true)}}>
            </div>
            <div key={6} className={"tool tool_shape-obj "}
                 onClick={(e) => {
                     setValue({
                         items: [
                             {caption: 'Прямоугольник', action: () => {props.addShapeObj('rect')}},
                             {caption: 'Треугольник', action: () => {props.addShapeObj('triangle')}},
                             {caption: 'Эллипс', action: () => {props.addShapeObj('circle')}}
                         ],
                         pos: {x: e.currentTarget.offsetLeft, y: e.currentTarget.offsetTop + e.currentTarget.offsetHeight},
                         width: 130
                     });
                     setVisible(true)
                     document.addEventListener('mouseup', mouseUpHandler)}}
            />
            <div key={7} className="splitter"></div>
            <Palette />
        </div>
    )
}


const mapDispatchToProps = ({
    addSlide,
    addTextObj,
    addShapeObj,
    addPictureObj,
    goBackArchive,
    goForwardArchive,
    setCanDeleteSlide
})

function mapStateToProps(state: Programm) {
    return { slides: state.mainProg.currentPresentation.slides }
}

export default connect(mapStateToProps, mapDispatchToProps)(Tools)
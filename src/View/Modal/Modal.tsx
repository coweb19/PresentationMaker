import React, { useState, useContext, useEffect, useRef } from 'react'
import "./Modal.css"
import { ColorPicker, ColorPickerContext } from '../ColorPicker/ColorPicker';
import { connect } from 'react-redux';
import { Programm, Picture, Color, Slide } from '../../Models/types';
import { addPictureObj } from '../../Models/ActionCreators/elemActionCreators';
import { loadPicFromComp, loadPicFromInet } from '../imgLoad';
import { setSlideBackground } from '../../Models/ActionCreators/slideActionCreators';


export {
    ModalLayer,
    ModalContext
}

const defVisible: boolean = false;
const defType: number = 1;

const ModalProps = {
    visible: defVisible,
    setVisible: (visible: boolean) => {},
    type: defType,
    setType: (type: number) => {}
}

const ModalContext = React.createContext(ModalProps);

function ModalLayer({ children }: any) {
    const [type, setType] = useState(defType);
    const [visible, setVisible] = useState(defVisible);

    return (
        <ModalContext.Provider value = {{visible, setVisible, type, setType}}>
            { children }
        </ModalContext.Provider>
    )
}

interface ModalProps {
    slides: Array<Slide>,
    setSlideBackground: (newBackground: Picture | Color) => void,
    addPictureObj: (imgData: {width: number, height: number, imgB64: string}) => void
}

function Modal(props: ModalProps) {
    const {visible, setVisible, type, setType} = useContext(ModalContext);
    const {setVisible: setVisibleCP, setValue: setValueCP, visible: visibleCP} = useContext(ColorPickerContext);

    const inputRef1 = useRef<HTMLInputElement | null>(null)
    const inputRef2 = useRef<HTMLInputElement | null>(null)

    useEffect(()=> {
        if (inputRef1.current !== null)
            inputRef1.current.value = '';
        if (inputRef2.current !== null)
            inputRef2.current.value = '';
    }, [visible])

    return (
        <div className = {visible ? 'modal modal_active' : 'modal'}>
            <div className = 'modal__content'>
                <div className = 'level'>
                    <span className = 'level__title'>{type == 0 ? 'Background' : 'Image'}</span>
                    <span className = 'closeButton' onClick = {() => {
                        setVisibleCP(false);
                        setVisible(false);
                    }}>x</span>
                </div>
                {type == 0 &&
                    <>
                        <ColorPicker />
                        <div className = 'level'>
                            <span>Цвет</span>
                            <span className = 'chooseButton' onClick = {(e) => {
                                if (visibleCP) {
                                    setVisibleCP(false);
                                } else {
                                    const pos = {
                                        x: e.currentTarget.offsetLeft,
                                        y: e.currentTarget.offsetTop + e.currentTarget.offsetHeight
                                    };
                                    setValueCP({
                                        isColorClear: true,
                                        position: pos,
                                        action: 'background'
                                    });
                                    setVisibleCP(true);
                                }}}
                            >Выбрать цвет</span>
                        </div>
                        <div className = 'level'>
                            <span>Изображение</span>
                            <span className = 'chooseeButton' onClick = {() =>
                                loadPicFromComp({
                                    addPictureObj: null,
                                    setSlideBackground: props.setSlideBackground,
                                    isBackground: true
                                })}
                            >Выбрать изображениe</span>
                        </div>
                        <div className = 'level'>
                            <span>URL</span>
                            <input type="text" className="inputUrl" ref={inputRef1} onKeyPress={(e) => {
                                if (e.key === "Enter") {
                                    loadPicFromInet({
                                        addPictureObj: null,
                                        setSlideBackground: props.setSlideBackground,
                                        isBackground: true,
                                        url: e.currentTarget.value
                                    })
                                }}} defaultValue='' />
                        </div>
                    </>
                }
                {type == 1 &&
                    <>
                        <div className = 'level'>
                            <span>Изображение</span>
                            <span className = 'chooseButton' onClick = {() =>
                                loadPicFromComp({
                                    addPictureObj: props.addPictureObj,
                                    setSlideBackground: null,
                                    isBackground: false
                                })
                            }>Выбрать изображениe</span>
                        </div>
                        <div className = 'level'>
                            <span>URL (не фон)</span>
                            <input type="text" className="inputUrl" ref={inputRef2} onKeyPress={
                                (e) => {if (e.key === "Enter") {
                                    loadPicFromInet({
                                        addPictureObj: props.addPictureObj,
                                        setSlideBackground: null,
                                        isBackground: false,
                                        url: e.currentTarget.value
                                    })
                                }}
                            } defaultValue='' />
                        </div>
                    </>
                }
                <span className = 'chooseButton' onClick={() => {setVisibleCP(false); setVisible(false);}}>Готово</span>
            </div>
        </div>
    )
}

const mapDispatchToProps = ({
    addPictureObj,
    setSlideBackground
})

function mapStateToProps(state: Programm) {
    return { slides: state.mainProg.currentPresentation.slides }
};

export default connect(mapStateToProps, mapDispatchToProps)(Modal)
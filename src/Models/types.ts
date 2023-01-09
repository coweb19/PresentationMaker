export type ActionType = any

export enum StateTypes {
    CREATE_DEFAULT_PROGRAMM,
    LOAD_PROJECT,
    GO_FORWARD_ARCHIVE,
    GO_BACK_ARCHIVE,
    SAVE_TO_ARCHIVE,
    CHANGE_PRESENTATION_TITLE,
    ADD_SLIDE,
    MOVE_SLIDE,
    DELETE_SLIDE,
    SET_SLIDE_BACKGROUND,
    ADD_PICTURE_OBJ,
    ADD_TEXT_OBJ,
    SET_SELECTED_SLIDES,
    CHANGE_TEXT_OBJ,
    ADD_SHAPE_OBJ,
    CHANGE_SHAPE_OBJ,
    RESIZE_ELEMENT,
    REMOVE_ONE_ELEM_FROM_SELECTED_ELEMS,
    REMOVE_ONE_ELEM_FROM_SELECTED_SLIDES,
    CHANGE_ELEM_POSITION,
    DELETE_SELECTED_ELEMENTS,
    SET_SELECTED_ELEMENT,
    SET_CAN_DELETE_SLIDE,
    INC_ELEMS_MOVE_COUNT,
    RESET_ELEMS_MOVE_COUNT,
    LIGHT_SLIDE,
    SET_SAVE_TO_ARCH,
    COPY_ELEMS,
    PASTE_ELEMS,
    COPY_SLIDES,
    PASTE_SLIDES,
    OPEN_PLAYER,
    CLOSE_PLAYER,
    SWITCH_SLIDE,
}


export type Programm = {
    mainProg: {
        currentPresentation: Presentation,
        selectedSlides: Array<string>,       
        selectedElements: Array<string>
    },    

    commonDeps: {
        canDeleteSlides: boolean,
        elemsMoveCount: number,
        saveToArch: boolean,
        slideBorderLight: borderLightType,
        copyElemsArr: Array<string>,
        copySlidesArr: Array<string>,
        playerIsOpen: boolean
    }
}
   

export type MainProg = {
    currentPresentation: Presentation,
    selectedSlides: Array<string>,       
    selectedElements: Array<string>
}

export type CommonDeps = {
    canDeleteSlides: boolean,
    elemsMoveCount: number,
    saveToArch: boolean,
    slideBorderLight: {
        borderLightPlace: string,
        slideId: string
    },    
    copyElemsArr: Array<string>,
    copySlidesArr: Array<string>    
}



export type Presentation = {
    title: string,
    slides: Array<Slide>, 
}

export type ArchiveOfState = {  
    past: Array<Programm>,   
    future: Array<Programm>, 
}

export type SlideElements = Array<PictureObj | ShapeObj | TextObj> 

export type Slide = {
    id: string,
    background: Picture | Color,
    elements: SlideElements
}

export type Point = {
    x: number,
    y: number,
}

export type ElementObj = {
    id: string,
    position: Point,
    height: number,
    width: number,
}

export type Picture = {
    imgB64: string,
    type: 'picture',
    fillColor: string,
    borderColor: string,
    borderWidth: number
}

export type PictureObj = ElementObj & Picture;

export type TextObj = ElementObj & {
    text: string,
    fillColor: string,
    borderColor: string,
    borderWidth: number,
    textColor: string,
	fontFamily: string,
	fontSize: string,
	type: 'text',
}

export type Color = {
    hexColor: string, 
    type: 'color',
}

export type ShapeObj = ElementObj & {
    type: 'triangle' | 'rect' | 'circle' | 'outlineRect',
    borderColor: string,
    borderWidth: number,
    fillColor: string,
}

export type ChangedObjPosType = {
    newX: number,
    newY: number,
    saveToArh: boolean
}

export type borderLightType = {
    borderLightPlace: 'top' | 'bottom' | 'unset',
    slideId: string
} 

export type SlideId = string

export type ChangedParams = Programm | ShapeObj | TextObj | PictureObj | SlideId | null
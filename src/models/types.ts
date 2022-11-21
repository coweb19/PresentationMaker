type Point = {
    x: number,
    y: number
}

type CropObj = {
    top_left_point: Point,
    bottom_right_point: Point
}

type Text = {
    id: string,
    type: 'text',
    text_v: string,
    font_size: number,
    font_color: string,
    font_family: string,
    font_weight: number,
    font_style: string,
    top_left_position: Point,
    bottom_right_position: Point,
    layer_index: number,
    rotation: number
}

type Image = {
    id: string,
    type: 'image',
    source: string,
    source_type: string,
    top_left_position: Point,
    bottom_right_position: Point,
    crop: CropObj,
    layer_index: number,
    selected: boolean,
    rotation: number
}

type Circle = {
    gr_obj_type: 'circle',
    center_position: Point,
    radius: number
}

type Rectangle = {
    gr_obj_type: 'rectangle',
    top_left_position: Point,
    bottom_right_position: Point
}

type Triangle = {
    gr_obj_type: 'triangle',
    first_point_position: Point,
    second_point_position: Point,
    third_point_position: Point
}

type GraphObject = {
    id: string,
    type: 'graphic',
    layer_index: number,
    rotation: number,
    border_width: number,
    border_color: string,
    border_radius: number,
    background_color: string,
    data: Circle|Rectangle|Triangle
}

type Slide = {
    id: string,
    background: string,
    transition_style: string,
    scale: number,
    selected_blocks: Array<string>,
    slide_data: Array<Text|Image|GraphObject>
}

type Presentation = {
    common_background: string,
    common_transition_style: string,
    display_mode: string,
    selected_slides: Array<string>,
    data: Array<Slide>
}

type History = Array<Presentation>

export {
    type Point,
    type CropObj,
    type Text,
    type Image,
    type GraphObject,
    type Slide,
    type Presentation,
    type History,
}
import {Presentation} from "../../models/types";
import React from 'react';

type ProgramProps = {
    presentation: Presentation
}

function Program(props: ProgramProps) {
    return <div>
        <h1>Slide #1</h1>
        <br/>
        {props.presentation.data[0].slide_data[0].id}
        <br/>
        {'text_v' in props.presentation.data[0].slide_data[0]
            ? props.presentation.data[0].slide_data[0].text_v
            : 'not text v'
        }
        <br/>
        <br/>
        {props.presentation.data[0].slide_data[1].id}
        <br/>
        <img src={
            'source' in props.presentation.data[0].slide_data[1]
                ? props.presentation.data[0].slide_data[1].source
                : ''
        }
        alt='coweb pic'/>
    </div>
}

export {
    Program
}
import {Presentation} from "../../models/types";
import React from 'react';
import {Slides} from "../slides/Slides";

type ProgramProps = {
    presentation: Presentation
}

function Program(props: ProgramProps) {
    return <div>
        <Slides presentation={props.presentation}/>
    </div>
}

export {
    Program
}
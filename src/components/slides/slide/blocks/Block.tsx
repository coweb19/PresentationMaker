import {GraphObject, Image, Text} from "../../../../models/types";

type BlockProps = {
    elem: Text | Image | GraphObject
}

function TextBlock(props: BlockProps) {
    return <div>
        'type: text'
        <br/>
        {
            'text_v' in props.elem ? props.elem.text_v : ''
        }
    </div>
}

function ImageBlock(props: BlockProps) {
    return <div>
        'type: image'
        <br/>
        <img src={
            'source' in props.elem ? props.elem.source : ''
        }
        alt='alt pic' />
    </div>
}

function Block(props: BlockProps) {
    const blockType = props.elem.type;
    if (blockType === 'text')
    {
        return <TextBlock elem={props.elem}/>
    }
    if (blockType === 'image')
    {
        return <ImageBlock elem={props.elem}/>
    }
    if (blockType === 'graphic')
    {
        return <div>GraphObj</div>
    }
    return null
}

export {Block}
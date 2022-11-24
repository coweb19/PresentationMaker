import {Slide} from "../../../models/types";
import {Block} from "./blocks/Block";

type SlideProps = {
    slides_item: Slide
}

function SlidesItem(props: SlideProps) {
    const isEmptySlide = props.slides_item.slide_data.length === 0;
    if (!isEmptySlide)
    {
        return <div>
            {props.slides_item.slide_data.map(block => {
                return <Block elem={block} key={block.id}/>
            })}
        </div>
    }
    else
    {
        return <div>Empty slide!</div>
    }

}

export {SlidesItem}
import React,{PropTypes, Component} from 'react';
import Silhouettes from './Silhouettes.jsx';

const Chunk = ({scale, sentence, boxes, twoColumns}) =>(
    <div className="row">
        <Silhouettes scale={scale} sentence={sentence}
                     showBoxes={boxes} key="1"/>
        {twoColumns  ?
            <Silhouettes scale={scale} sentence={sentence}
                         showBoxes={boxes} key="2"/>
            : ""

        }

    </div>

    );



Chunk.propTypes = {
    sentence: PropTypes.string.isRequired,
    boxes: PropTypes.bool.isRequired,
    twoColumns: PropTypes.bool.isRequired
};

export default Chunk;

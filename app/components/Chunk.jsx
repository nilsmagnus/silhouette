import React,{PropTypes, Component} from 'react';
import Silhouettes from './Silhouettes.jsx';

const Chunk = ({sentence, boxes, twoColumns}) =>(
    <div className="row">
        <Silhouettes sentence={sentence}
                     showBoxes={boxes} key="1"/>
        {twoColumns  ?
            <Silhouettes sentence={sentence}
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

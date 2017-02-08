import React from 'react';
import Line from './Line.jsx'

export default class Silhouettes extends React.Component {

    render() {

        var lines =this.props.sentence ? this.props.sentence.split(/\r\n|\n|\r/).map(function(line, i){
            return (<Line line={line} key={i} />);
        }): "-";
        return (<div>{lines}</div>);
    }
}


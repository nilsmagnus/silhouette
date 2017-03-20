import React from "react";
import Rune from "./Rune.jsx";

export default class Word extends React.Component {

    render() {
      const boxes = this.props.boxes;
      var scale = this.props.scale;

        const runes = this.props.word?this.props.word.split("").map(function (character, i) {
            return (<Rune letter={character} key={i} box={boxes} scale={scale}/>);
        }): " ";
        return (<div className="word"> {runes} </div> );
    };

}

import React from 'react';
import Word from './Word.jsx'

export default class Line extends React.Component {

    render() {

        var words = this.props.line.split(/\s/).map(function (word, i) {
            const displaySilhouettes = true;
            if (displaySilhouettes) {
                return (<Word word={word} key={i}/>);
            } else {
                return (<div className="plainWord"> {word} </div>)
            }
        });
        return (<div className="line">  {words} </div>  );

    }
}

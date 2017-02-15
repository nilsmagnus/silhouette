import React from 'react';
import Word from './Word.jsx'

export default class Line extends React.Component {

    render() {
        const displaySilhouettes = this.props.showBoxes;

        var words = this.props.line.split(/\s/).map(function (word, i) {
            if (displaySilhouettes) {
                return (
                    <span>
                        <Word word={word} key={i}/>
                        <span className="nonLetter" />
                    </span>
                );
            } else {
                return (<div className="plainWord" key={i}> {word} </div>)
            }
        });
        return (<div className="line">  {words} </div>  );

    }
}

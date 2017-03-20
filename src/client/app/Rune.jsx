import React from 'react';

export default class Rune extends React.Component {


    render() {
        let scale = this.props.scale;
        var height, width;

        const character = this.props.letter;
        //const scale = this.props.scale;

        const scaleStyle = {display: 'inline-block'};
        scaleStyle.bottom = 0;
        scaleStyle.position = 'relative';

        if (this.props.box && !/^[0-9a-zA-Z\u00D8\u00C6\u00C5\u00E5\u00F8\u00E6]+$/.test(character)) {
            return (<span className="symbol" style={scaleStyle}> </span>);
        }
        if (/^[A-Z\u00D8\u00C6\u00C5]+$/.test(character)) {
            height = 42;
            width = 42;
        }
        else if (/^[pgjy]+$/.test(character)) {
            height = 42;
            width = 28;
            scaleStyle.bottom = -14;
        }
        else if (/^[0-9khtlbd]+$/.test(character)) {
            height = 42;
            width = 28;
        }
        else if (/^[f]+$/.test(character)) {
            height = 56;
            width = 28;
            scaleStyle.bottom=-14;
        }
        else if (/^[a-z\u00E5\u00F8\u00E6]+$/.test(character)) {
            height = 28;
            width = 28;
        }
        scaleStyle.minHeight = (height * ( scale / 100))
        scaleStyle.minWidth = (width * ( scale / 100));

        if (scaleStyle.bottom > 0) {
            scaleStyle.bottom = '' + (scaleStyle.bottom * ( scale / 100)) + 'px';
        }

        if(this.props.box){
          return (<span className="letter" style={scaleStyle} />);
        } else {
          scaleStyle.bottom=0;
          scaleStyle["font-size"] = (32 * (scale/100)) ;
          return (<span className="plainLetter" style={scaleStyle}>{character}</span>)
        }
    }


}

import React from 'react';

export default class Rune extends React.Component {


    render() {
        let scale = 1;
        var height, width;

        const character = this.props.letter;

        const scaleStyle = {display: 'inline-block'};
        scaleStyle.bottom = 0;
        scaleStyle.position = 'relative';

        if (!/^[0-9a-zA-Z\u00D8\u00C6\u00C5\u00E5\u00F8\u00E6]+$/.test(character)) {
            scaleStyle.top = 17;
            return (<span className="symbol" style={scaleStyle}> </span>);
        }
        if (/^[A-Z\u00D8\u00C6\u00C5]+$/.test(character)) {
            height = 30;
            width = 30;
        }
        else if (/^[pgjy]+$/.test(character)) {
            height = 30;
            width = 20;
            scaleStyle.bottom = -10;
        }
        else if (/^[0-9khtlbd]+$/.test(character)) {
            height = 30;
            width = 20;
        }
        else if (/^[f]+$/.test(character)) {
            height = 40;
            width = 20;
        }
        else if (/^[a-z\u00E5\u00F8\u00E6]+$/.test(character)) {
            height = 20;
            width = 20;
            scaleStyle.bottom = -10;
        }
        scaleStyle.minHeight = (height * (1 + scale / 100))
        scaleStyle.minWidth = (width * (1 + scale / 100));

        if (scaleStyle.bottom > 0) {
            scaleStyle.bottom = '' + (scaleStyle.bottom * (1 + scale / 100)) + 'px';
        }

        return (<span className="letter" style={scaleStyle}>{character}</span>);
    }


}
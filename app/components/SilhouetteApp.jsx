import React, {PropTypes}from 'react';
import Configurations  from './Configurations.jsx';
import Silhouettes  from './Silhouettes.jsx';

export default class SilhouetteApp extends React.Component {

    defaultProps = {
        sentence : "Default sentence"
    };

    constructor(props) {
        super(props);
        this.state = {
            sentence: "This is a text,\nfor your pleasure,\nfor my fun,\nwin win ",
        };
        this.sentenceChanged= this.sentenceChanged.bind(this);

    };

    sentenceChanged(event) {
        this.setState({sentence: event.target.value});
    };

    render() {
        return (

            <div>
                <section>
                    <Configurations />
                </section>
                <section>
                    <textarea rows="10" cols="25" onChange={this.sentenceChanged}>{this.state.sentence}</textarea>
                    <Silhouettes sentence={this.state.sentence}/>
                </section>
            </div>
        );

    }

}

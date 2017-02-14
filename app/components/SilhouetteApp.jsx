import React, {PropTypes}from 'react';
import Configurations  from './Configurations.jsx';
import Silhouettes  from './Silhouettes.jsx';
import { createStore } from 'redux';



export default class SilhouetteApp extends React.Component {


    defaultProps = {
        sentence : "Default sentence"
    };

    constructor(props) {
        super(props);
        this.state = {
            sentence: "This is a text ,\nfor your pleasure,\nfor my fun,\nwin win ",
            inputHidden: false,
            boxes: true,
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
                    <Configurations
                        inputHidden={this.state.inputHidden}
                        toggleShowInput={() => this.setState({inputHidden:!this.state.inputHidden})}
                        toggleBoxes={() => this.setState({boxes:!this.state.boxes})}
                    />
                </section>
                <section>
                    {this.state.inputHidden ? "" :
                        <textarea rows="10" cols="25" onChange={this.sentenceChanged}>{this.state.sentence}</textarea>
                    }
                    <Silhouettes sentence={this.state.sentence}/>
                </section>
            </div>
        );

    }

}

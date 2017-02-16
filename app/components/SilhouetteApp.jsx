import React, {PropTypes}from 'react';
import Configurations  from './Configurations.jsx';
import Silhouettes  from './Silhouettes.jsx';
import Chunk from './Chunk.jsx';


export default class SilhouetteApp extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            sentence: "This is a text ,\nfor your pleasure,\nfor my fun,\nwin win ",
            chunks:[],
            inputHidden: false,
            twoColumns: false,
            boxes: true,
            help: false,
        };
        this.sentenceChanged = this.sentenceChanged.bind(this);
        this.toggleTwoColumns = this.toggleTwoColumns.bind(this);
        this.toggleHelp = this.toggleHelp.bind(this);
        this.addChunk= this.addChunk.bind(this);

    };

    sentenceChanged(event) {
        this.setState({sentence: event.target.value});
    };

    toggleTwoColumns() {
        this.setState({twoColumns: !this.state.twoColumns});
    }

    toggleHelp() {
        console.log("help");
        this.setState({help: !this.state.help});
    }

    addChunk(){
        const newChunks = [{sentence:this.state.sentence, boxes:this.state.boxes},...this.state.chunks];
        this.setState({chunks:newChunks});

    }

    render() {

        const twoColumns = this.state.twoColumns;

        const chunks =  this.state.chunks.map(function(chunk, i){
            return(<Chunk key={i} sentence={chunk.sentence} boxes={chunk.boxes} twoColumns={twoColumns}/>)
        });

        return (

            <div className="silhouetteAppContainer">
                <section>
                    <Configurations
                        inputHidden={this.state.inputHidden}
                        toggleShowInput={() => this.setState({inputHidden: !this.state.inputHidden})}
                        toggleBoxes={() => this.setState({boxes: !this.state.boxes})}
                        toggleTwoColumns={() => this.toggleTwoColumns()}
                        toggleHelp={() => this.toggleHelp()}
                    />
                </section>

                {this.state.help && !this.state.inputHidden ? <section className="help">
                        Options:
                        <ul>
                            <li>Hide input: check this to hide input before printing</li>
                            <li>Show text: display the text instead of boxes</li>
                            <li>Two columns: show the same text/boxes in two columns.</li>
                        </ul>

                    </section> : ""}

                <section>
                    {this.state.inputHidden ? "" :
                        <div className="inputContainer">
                            <textarea rows="10" cols="25" onChange={this.sentenceChanged}>{this.state.sentence}</textarea>
                            <button onClick={this.addChunk}>Add</button>
                        </div>
                    }
                    <div className="row">
                        <Silhouettes sentence={this.state.sentence}
                                     showBoxes={this.state.boxes} key="1"/>
                        {this.state.twoColumns ?
                            <Silhouettes sentence={this.state.sentence}
                                         showBoxes={this.state.boxes} key="2"/>
                            : ""

                        }
                    </div>
                </section>

                <section>
                    {chunks}
                </section>
            </div>
        );

    }

}

import React, {PropTypes}from 'react';
import Configurations  from './Configurations.jsx';
import Silhouettes  from './Silhouettes.jsx';
import Chunk from './Chunk.jsx';

export default class SilhouetteApp extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            sentence: "Hva skjuler boksen?",
            chunks:[
            //  {sentence:"T testing fun", boxes:false},
            //  {sentence:"T testing fun", boxes:true},
            //  {sentence:"T testing fun", boxes:false},
            ],
            scale:100,
            inputHidden: false,
            twoColumns: false,
            boxes: true,
            help: false,
        };
        this.sentenceChanged = this.sentenceChanged.bind(this);
        this.toggleTwoColumns = this.toggleTwoColumns.bind(this);
        this.toggleHelp = this.toggleHelp.bind(this);
        this.selectScale = this.selectScale.bind(this);
        this.clearText = this.clearText.bind(this);
        this.addChunk= this.addChunk.bind(this);
    };

    selectScale(event) {
        console.log("scale changed");
        console.log(event.target.value);
        this.setState({scale: event.target.value});
    };

    clearText() {
        this.setState({chunks: []});
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
        const scale = this.state.scale;

        const chunks =  this.state.chunks.map(function(chunk, i){
            return(<Chunk scale={scale} key={i} sentence={chunk.sentence} boxes={chunk.boxes} twoColumns={twoColumns}/>)
        });

        return (

            <div className="silhouetteAppContainer">
                <section>
                    <Configurations
                        inputHidden={this.state.inputHidden}
                        toggleShowInput={() => this.setState({inputHidden: !this.state.inputHidden})}
                        toggleBoxes={() => this.setState({boxes: !this.state.boxes})}
                        toggleTwoColumns={() => this.toggleTwoColumns()}
                        selectScale={this.selectScale}
                        clearText={()=> this.clearText()}
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
                            <textarea rows="10" cols="25" onChange={this.sentenceChanged} defaultValue={this.state.sentence} />
                            <button onClick={this.addChunk}>Add</button>
                        </div>
                    }
                    <div className="row">
                        <Silhouettes scale={this.state.scale}
                                     sentence={this.state.sentence}
                                     showBoxes={this.state.boxes} key="1"/>
                        {this.state.twoColumns ?
                            <Silhouettes sentence={this.state.sentence}
                                         scale={this.state.scale}
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

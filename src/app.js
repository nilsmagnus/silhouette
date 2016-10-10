var React = require('react');
var ReactDOM = require('react-dom');

var Letter = React.createClass({
        render: function () {
          let scale = this.props.scale;
          var height, width;

            var character = this.props.letter;

            var scaleStyle = {display:'inline-block'};
            scaleStyle.bottom = 10;
            scaleStyle.position= 'relative';

            if (!/^[a-zA-Z\u00D8\u00C6\u00C5\u00E5\u00F8\u00E6]+$/.test(character)) {
                return (<span className="nonLetter"> {character}</span>);
            }
            if (/^[A-Z\u00D8\u00C6\u00C5]+$/.test(character)) {
                height  = 30;
                width  = 30;
            }
            else if (/^[pgjy]+$/.test(character)) {
                height  = 30;
                width  = 20;
                scaleStyle.bottom = 0;
            }
            else if (/^[khtlbd]+$/.test(character)) {
                height  = 30;
                width  = 20;
            }
            else if (/^[f]+$/.test(character)) {
                height  = 40;
                width  = 20;
                scaleStyle.bottom = 0;
            }
            else if (/^[a-z\u00E5\u00F8\u00E6]+$/.test(character)) {
                height  = 20;
                width  = 20;
            }
            scaleStyle.minHeight= (height * (1+scale/100))
            scaleStyle.minWidth= (width * (1+scale/100));

            if(scaleStyle.bottom >0){
              scaleStyle.bottom = '' +(scaleStyle.bottom * (1+scale/100)) +'px';
            }

            return (<span className="letter" style={scaleStyle} />);



        }
    });

var Word = React.createClass({
    render: function () {
      let scale = this.props.scale;
        var letters = this.props.data.split("").map(function (character, i) {
            return (<Letter letter={character} key={i} scale={scale}/>);
        });
        return (<div className="word" > {letters} </div> );
    }
});

var Line = React.createClass({
    render: function () {
        var scale = this.props.scale ;
        var displaySilhouettes = this.props.displaySilhouettes ;
        var words = this.props.data.split(/\s/).map(function (word, i) {
            if(displaySilhouettes){
              return (<Word data={word} key={i} scale={scale} />);
            } else {
              return (<div className="plainWord"> {word} </div>)
            }
        });
        return (<div className="line">  {words} </div>  );
    }
});

var Silhouettes = React.createClass({
    render: function(){
      var scale = this.props.scale ;
      var displaySilhouettes = this.props.displaySilhouettes ;
      var lines = this.props.data.split(/\r\n|\n|\r/).map(function(line, i){
        return (<Line data={line} key={i} scale={scale} displaySilhouettes={displaySilhouettes}/>);
      });
      return (<div>{lines}</div>);
    }
});

var RevealedWords = React.createClass({
  render: function(){
    var scale = this.props.scale;
    var scaleStyle ={fontSize: (40 * (1+scale/100))};
    var displaySilhouettes = this.props.displaySilhouettes ;

    return (<div className="revealedText" style={scaleStyle}>{this.props.data}</div>);
  }
});


var Sentence = React.createClass({
    getInitialState: function () {
        return {
          data: "Eeny, meeny, miny, moe,\nCatch a tiger by the toe!?",
          hideTextArea:false,
          revealText:false,
          scale:140,
          columns:1,
          hideInput : false,
          displaySilhouettes:true,
        };
    },
    toggleTextArea: function(){
        this.setState({hideTextArea : !this.state.hideTextArea});
    },
    handleSizeChange: function (event) {
        this.setState({scale: event.target.value});
    },
    handleColumnsChange: function (event) {
        this.setState({columns: event.target.value});
    },
    handleChange: function (event) {
        this.setState({data: event.target.value});
    },
    handleToggleSilhouettes: function (event) {
        this.setState({displaySilhouettes: event.target.value=="silhouettes"});
    },
    toggleInpuAreas: function (event) {
        this.setState({hideInput: !this.state.hideInput});
    },
    toggleRevealText: function (event) {
        this.setState({revealText: !this.state.revealText});
    },
    render: function () {
        var i = 0;
        var data = this.state.data;
        var scale = this.state.scale;
        var columns = this.state.columns;
        var displaySilhouettes = this.state.displaySilhouettes;

        var colArray  = new Array(columns);
        for(i=0; i<columns; i++){
          colArray[i] =0;
        }

        var clazzName = columns ==1? "col-md-10":"col-md-5";

        var silhouetteColumns   = colArray.map(function(v,i){
              return (<div key={i} className={clazzName}><Silhouettes
                          displaySilhouettes={displaySilhouettes}
                          data={data}
                          scale={scale} />
                        </div>);
          });


        return (
                    <div >
                    <span style={this.state.hideInput? {display:'none'} : {}}>
                      Hide input?
                    </span>
                    <input type="checkbox" onChange={this.toggleInpuAreas}/>
                    <span style={this.state.hideInput? {display:'none'} : {}}>
                       Show Text?
                      <input type="checkbox" onChange={this.toggleRevealText}/>
                    </span>

                      <div className="inputArea" style={this.state.hideInput? {display:'none'} : {}}>
                        <div>
                          Scale:
                          <input
                            style={{width:100}}
                            type="number"
                            value={this.state.scale}
                            onChange={this.handleSizeChange} />

                          Columns:
                          <input
                            style={{width:100}}
                            type="number"
                            min="1"
                            max="2"
                            value={this.state.columns}
                            onChange={this.handleColumnsChange} />


                        </div>
                        <br/>

                        <textarea
                          style={{width:400, height:100}}
                          type="text"
                          value={this.state.data}
                          onChange={this.handleChange} />
                      </div>
                      {this.state.revealText?
                        <RevealedWords data={this.state.data} scale={this.state.scale} />
                        :
                        <div className='row'>
                            {silhouetteColumns}
                        </div>
                    }
                    </div>
                );
    }
});

ReactDOM.render(
        <Sentence />,
        document.getElementById('silhouette-app')
);

console.log("Silhouettes");

var React = require('react');
var ReactDOM = require('react-dom');

var Letter = React.createClass({
        render: function () {
          let scale = this.props.scale;
          var height, width;

            var character = this.props.letter;
            var scaleStyle = {display:'inline-block'};
            if (!/^[a-zA-Z\u00D8\u00C6\u00C5\u00E5\u00F8\u00E6]+$/.test(character)) {
                return (<span className="nonLetter"> {character}</span>);
            }
            if (/^[A-Z\u00D8\u00C6\u00C5]+$/.test(character)) {
                height  = 40;
                width  = 40;
            }
            else if (/^[pgjy]+$/.test(character)) {
                height  = 40;
                width  = 20;
                scaleStyle.bottom = -20;
                scaleStyle.position= 'relative';
            }
            else if (/^[khtlbd]+$/.test(character)) {
                height  = 40;
                width  = 20;
            }
            else if (/^[f]+$/.test(character)) {
                height  = 60;
                width  = 20;
                scaleStyle.bottom = -20;
                scaleStyle.position= 'relative';
            }
            else if (/^[a-z\u00E5\u00F8\u00E6]+$/.test(character)) {
                height  = 20;
                width  = 20;
            }
            scaleStyle.minHeight= (height * (1+scale/100))
            scaleStyle.minWidth= (width * (1+scale/100));

            if(scaleStyle.bottom <0){
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

var Silhouettes = React.createClass({
    render: function () {
        var scale = this.props.scale
        var words = this.props.data.split(" ").map(function (word, i) {
            return (<Word data={word} key={i} scale={scale} />);
        });
        return (<div className="silhouettes">  {words} </div>  );
    }
});


var Sentence = React.createClass({
    getInitialState: function () {
        return {
          data: "Ja. hei din ost. Kygo fop. t",
          hideTextArea:false,
          scale:140,
          columns:1,
          hideInput : false,
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
    toggleInpuAreas: function (event) {
        this.setState({hideInput: !this.state.hideInput});
    },
    render: function () {
        var i = 0;
        var data = this.state.data;
        var scale = this.state.scale;
        var columns = this.state.columns;

        var colArray  = new Array(columns);
        for(i=0; i<columns; i++){
          colArray[i] =0;
        }
        var clazzName = columns ==1? "col-md-10":"col-md-5";

        var silhouetteColumns = colArray.map(function(v,i){
            return (<div key={i} className={clazzName}><Silhouettes
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

                      <div style={this.state.hideInput? {display:'none'} : {}}>
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


                        <textarea
                          style={{width:400, height:100}}
                          type="text"
                          value={this.state.data}
                          onChange={this.handleChange} />
                      </div>
                      <div className="row">
                      {silhouetteColumns}
                      </div>
                    </div>
                );
    }
});

ReactDOM.render(
        <Sentence />,
        document.getElementById('input')
);

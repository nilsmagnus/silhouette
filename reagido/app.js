var Letter = React.createClass({displayName: 'Letter',
        render: function () {
            var character = this.props.letter;
            if (!/^[a-zA-Z\u00D8\u00C6\u00C5\u00E5\u00F8\u00E6]+$/.test(character)) {
                return (React.DOM.span({className: "nonLetter"}, character));
            }
            if (/^[A-Z\u00D8\u00C6\u00C5]+$/.test(character)) {
                return (React.DOM.span({className: "letter upperCase"}));
            }
            if (/^[pgjy]+$/.test(character)) {
                return (React.DOM.span({className: "letter lowLetter"}));
            }
            if (/^[khtlbd]+$/.test(character)) {
                return (React.DOM.span({className: "letter highLetter"}));
            }
            if (/^[f]+$/.test(character)) {
                return (React.DOM.span({className: "letter highLowLetter"}));
            }
            if (/^[a-z\u00E5\u00F8\u00E6]+$/.test(character)) {
                return (React.DOM.span({className: "letter lowerCase"}));
            }
            return (React.DOM.span({className: "nonLetter"}));
        }
    });
    var Word = React.createClass({displayName: 'Word',
        render: function () {
            var letters = this.props.data.split("").map(function (character) {
                return (Letter({letter: character}, character));
            });
            return (React.DOM.div({className: "word"}, letters) );
        }
    });
    var Silhouettes = React.createClass({displayName: 'Silhouettes',
        render: function () {
            var words = this.props.data.split(" ").map(function (word) {
                return (Word({data: word}, word));
            });
            return ( React.DOM.div({className: "silhouettes"},  words)  );
        }
    });
    var Sentence = React.createClass({displayName: 'Sentence',
        getInitialState: function () {
            return {data: "", hideTextArea:false};
        },
        toggleTextArea: function(){
            this.setState({hideTextArea : !this.state.hideTextArea});
        },
        handleChange: function (event) {
            this.setState({data: event.target.value});
        },
        render: function () {
            return (
                    React.DOM.div({className: "sentence"},
                            React.DOM.button({onClick: this.toggleTextArea, value:"Hide text"}, "Hide/show input"),
                            this.state.hideTextArea ?
                                    "":
                                    React.DOM.textarea({className: "form-control", placeholder: "Type here", onChange: this.handleChange, value:this.state.data}),
                            Silhouettes({data: this.state.data})
                    )
                    );
        }
    });
    React.renderComponent(
            Sentence(null),
            document.getElementById('input')
    );

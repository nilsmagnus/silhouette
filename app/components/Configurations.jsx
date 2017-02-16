import React, {PropTypes, Component} from 'react';


const Configurations = ({inputHidden, toggleShowInput, toggleBoxes, toggleTwoColumns, toggleHelp}) =>
    (
        <p>
            <span >{inputHidden ? "" : "Hide input"}</span>
            <input type="checkbox" onClick={() => toggleShowInput()} value={inputHidden}/>
            {inputHidden ? "" : <span >
                Show text
                <input type="checkbox" onClick={() => toggleBoxes()}/>
                Two Columns
                <input type="checkbox" onClick={() => toggleTwoColumns()}/>
                    <a onClick={() => toggleHelp() }>Help</a>

                </span>

            }
        </p>
    );


Configurations.propTypes = {
    inputHidden: PropTypes.bool.isRequired,
    toggleShowInput: PropTypes.func.isRequired,
    toggleBoxes: PropTypes.func.isRequired,
    toggleTwoColumns: PropTypes.func.isRequired,
    toggleHelp: PropTypes.func.isRequired
};

export default Configurations;




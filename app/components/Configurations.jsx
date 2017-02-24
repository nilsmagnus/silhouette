import React, {PropTypes, Component} from 'react';


const Configurations = ({inputHidden, toggleShowInput, toggleBoxes, toggleTwoColumns, selectScale, clearText, toggleHelp}) =>
    (
        <p>
            <span className="inputGroup">

                <span >{inputHidden ? "" : "Hide input"}</span>
                <input type="checkbox" onClick={() => toggleShowInput()} value={inputHidden}/>
            </span>
            {inputHidden ? "" :
                <span >
                    <span className="inputGroup">
                        Show text
                        <input type="checkbox" onClick={() => toggleBoxes()}/>
                    </span>
                    <span className="inputGroup">
                        Two Columns
                        <input type="checkbox" onClick={() => toggleTwoColumns()}/>
                    </span>
                    <span className="inputGroup">
                        Scale
                        <select defaultValue="100" onChange={() => selectScale(this)}>
                            <option value="70">70 %</option>
                            <option value="100">100 %</option>
                            <option value="140">140 %</option>
                        </select>
                    </span>
                    <button className="inputGroup" onClick={() => clearText()}>Clear text</button>
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
    selectScale: PropTypes.func.isRequired,
    clearText: PropTypes.func.isRequired,
    toggleHelp: PropTypes.func.isRequired
};

export default Configurations;




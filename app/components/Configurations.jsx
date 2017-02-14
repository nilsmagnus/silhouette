import React, {PropTypes, Component} from 'react';


const Configurations = ({inputHidden, toggleShowInput, toggleBoxes}) =>
    (
        <p>
            <span >{inputHidden ? "" : "Hide input"}</span>
            <input type="checkbox" onClick={() => toggleShowInput()} value={inputHidden}/>
            {inputHidden ? "" : <span >
                Show text
                <input type="checkbox" onClick={() => toggleBoxes()}/>
                Text size
                <input type="number" maxLength="3" defaultValue="100"/>
                Columns
                <select>
                    <option value="1">1</option>
                    <option value="2">2</option>
                </select>
                </span>
            }
        </p>
    );


Configurations.propTypes = {
    inputHidden: PropTypes.bool.isRequired,
    toggleShowInput: PropTypes.func.isRequired,
    toggleBoxes: PropTypes.func.isRequired
};

export default Configurations;




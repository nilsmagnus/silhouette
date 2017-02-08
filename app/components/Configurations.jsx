import React from 'react';

const Configurations = ({ greet, message }) => (
    <p>
        Hide input
        <input type="checkbox"/>
        Text size
        <input type="number" maxLength="3" defaultValue="100"/>
        Columns
        <select>
            <option value="1">1</option>
            <option value="2">2</option>
        </select>

    </p>
);

Configurations.propTypes = {
    greet: React.PropTypes.string,
    message: React.PropTypes.string
};

export default Configurations;
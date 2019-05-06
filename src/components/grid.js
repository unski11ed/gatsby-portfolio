import React from 'react';
import PropTypes from 'prop-types';

import classes from './grid.module.scss';

const Grid = ({ children }) => (
    <div className={ classes['grid'] }>
        { children }
    </div>
);
Grid.propTypes = {
    children: PropTypes.node,
};

export default Grid;

import React from 'react';
import PropTypes from 'prop-types';

import classes from './grid.module.scss';

const GridItem = ({ children }) => (
    <div className={ classes['grid__item'] }>
        { children }
    </div>
);
GridItem.propTypes = {
    children: PropTypes.node,
};

export default GridItem;

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import classes from './grid.module.scss';

const GridItem = ({ children, className, ...otherProps }) => (
    <div className={ classNames(classes['grid__item'], className) } { ...otherProps }>
        { children }
    </div>
);
GridItem.propTypes = {
    children: PropTypes.node,
};

export default GridItem;

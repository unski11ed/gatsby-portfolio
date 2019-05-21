import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import classes from './grid.module.scss';

const GridItem = ({ children, className }) => (
    <div className={ classNames(classes['grid__item'], className) }>
        { children }
    </div>
);
GridItem.propTypes = {
    children: PropTypes.node,
};

export default GridItem;

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import classes from './grid.module.scss';

const Grid = ({ children, className }) => (
    <div className={ classNames(classes['grid'], className) }>
        { children }
    </div>
);
Grid.propTypes = {
    children: PropTypes.node,
};

export default Grid;

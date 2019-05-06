import React from 'react';
import PropTypes from 'prop-types';

import classes from './container.module.scss';

const Container = ({ children }) => (
    <div className={ classes['container'] }>
        { children }
    </div>
);
Container.propTypes = {
    children: PropTypes.node,
};

export default Container;

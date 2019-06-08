import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import classes from './container.module.scss';

const Container = ({ children, className }) => (
    <div className={ classNames(classes['container'], className) }>
        { children }
    </div>
);
Container.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
};

export default Container;

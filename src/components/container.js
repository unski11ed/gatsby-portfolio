import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import classes from './container.module.scss';

const Container = ({ children, className, innerRef }) => (
    <div
        className={ classNames(classes['container'], className) }
        ref={ innerRef }
    >
        { children }
    </div>
);
Container.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    innerRef: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.object
    ])
};

export default Container;

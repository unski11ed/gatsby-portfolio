import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import classes from './navbar.module.scss';

const Navbar = ({ children, className, isTransparent }) => (
    <header
        className={ classNames(className, classes['navbar'], {
            [classes['navbar--transparent']]: isTransparent
        }) }
    >
        { children }
    </header>
);

Navbar.propTypes = {
    children: PropTypes.node,
    className: PropTypes.className,
    isTransparent: PropTypes.bool,
}

Navbar.defaultProps = {
    isTransparent: false,
}

export default Navbar;

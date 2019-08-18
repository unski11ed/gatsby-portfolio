import React from 'react';
import PropTypes from 'prop-types';

import classes from './navbar.module.scss';

const NavbarNavigation = ({ children }) => (
    <nav className={ classes['navbar__navigation'] }>
        { children }
    </nav>
);
NavbarNavigation.propTypes = {
    children: PropTypes.node,
};

export default NavbarNavigation;
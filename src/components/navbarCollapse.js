import React from 'react';
import PropTypes from 'prop-types';

import classes from './navbar.module.scss';

const NavbarCollapse = ({ children }) => (
    <div className={ classes['navbar__collapse'] }>
        { children }
    </div>
);

NavbarCollapse.propTypes = {
    children: PropTypes.node,
}

export default NavbarCollapse;

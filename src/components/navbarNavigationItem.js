import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';

import classes from './navbar.module.scss';

const NavbarNavigationItem = ({ to, children }) => (
    <Link
        to={ to }
        className={ classes['navbar__navigation-item'] }
        activeClassName={ classes['navbar__navigation-item--active'] }
    >
        { children }
    </Link>
);
NavbarNavigationItem.propTypes = {
    to: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired
};

export default NavbarNavigationItem;
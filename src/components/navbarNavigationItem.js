import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';

import classes from './navbar.module.scss';

const NavbarNavigationItem = ({ to, children, index }) => (
    <Link
        to={ to }
        className={ classes['navbar__navigation-item'] }
        activeClassName={ classes['navbar__navigation-item--active'] }
        data-fade-order={ index }
    >
        { children }
    </Link>
);
NavbarNavigationItem.propTypes = {
    to: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    index: PropTypes.number,
};

export default NavbarNavigationItem;
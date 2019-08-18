import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';

import classes from './navbar.module.scss';

const NavbarBrand = ({ src, to }) =>
    to ? (
        <Link to={ to } className={ classes['navbar__brand'] }>
            <img src={ src } alt="Logo image" />
        </Link>
    ) : (
        <img src={ src } alt="Logo image" className={ classes['navbar__brand'] } />
    );

NavbarBrand.propTypes = {
    src: PropTypes.string,
    to: PropTypes.string
}

export default NavbarBrand;

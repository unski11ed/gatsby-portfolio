import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import { map, keys } from 'lodash';

import classes from './navbar.module.scss';

const logos = {
    primary: require('./../images/logo-blue.svg'),
    success: require('./../images/logo-green.svg'),
    danger: require('./../images/logo-red.svg'),
};

const NavbarLogos = ({ alt, themeColor }) => (
    <div className={ classes['navbar__brand__logos'] }>
    {
        map(keys(logos), logoTheme => (
            <img
                src={ logos[logoTheme] }
                alt={ alt }
                style={{ opacity: themeColor === logoTheme ? '1' : '0' }}
                key={ logoTheme }
            />
        ))
    }
    </div>
);

const NavbarBrand = ({ to, themeColor }) => (
        <Link to={ to } className={ classes['navbar__brand'] }>
            <NavbarLogos alt="Logo image" themeColor={ themeColor } />
        </Link>
    );

NavbarBrand.propTypes = {
    themeColor: PropTypes.string,
    to: PropTypes.string
}

NavbarBrand.defaultProps = {
    themeColor: 'primary'
}

export default NavbarBrand;

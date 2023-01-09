import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import { map, keys } from 'lodash';

import classes from './navbar.module.scss';

import logoPrimary from './../images/logo-blue.svg';
import logoSuccess from './../images/logo-green.svg';
import logoDanger from './../images/logo-red.svg';

const logos = {
    primary: logoPrimary,
    success: logoSuccess,
    danger: logoDanger,
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

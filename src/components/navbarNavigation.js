import React from 'react';
import PropTypes from 'prop-types';
import { map } from 'lodash';

import classes from './navbar.module.scss';

const NavbarNavigation = ({ children }) => (
    <nav className={ classes['navbar__navigation'] }>
        {
            map(children, (child, index) => {
                return React.cloneElement(child, {
                    index,
                    key: index
                })
            })
        }
    </nav>
);
NavbarNavigation.propTypes = {
    children: PropTypes.node,
};

export default NavbarNavigation;
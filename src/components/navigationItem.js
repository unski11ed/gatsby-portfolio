import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';

import classes from './navigation.module.scss';

const NavigationItem = ({ to, children }) => (
    <li className={ classes['navigation__item'] }>
        <Link to={ to }>
            { children }
        </Link>
    </li>
);
NavigationItem.propTypes = {
    to: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired
};

export default NavigationItem;
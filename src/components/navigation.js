import React from 'react';
import PropTypes from 'prop-types';

import classes from './navigation.module.scss';

const Navigation = ({ children }) => (
    <nav>
        <ul className={ classes['navigation'] }>
            { children }
        </ul>
    </nav>
);
Navigation.propTypes = {
    children: PropTypes.node,
};

export default Navigation;
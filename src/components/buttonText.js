import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import classes from './buttonText.module.scss';

const ButtonText = ({ children, className, onClick, style }) => (
    <button
        type="button"
        onClick={onClick}
        style={style}
        className={classNames(className, classes['button-text'])}
    >
        { children }
    </button>
);
ButtonText.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    onClick: PropTypes.func,
    style: PropTypes.object,
};

export default ButtonText;

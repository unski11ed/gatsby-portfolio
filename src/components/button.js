import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import classes from './button.module.scss';

const Button = ({
    className,
    size,
    children,
    color,
    outline,
    tag: Tag,
    ...otherProps
}) => {
    console.log(size.toUpperCase());

    const buttonClasses = classNames(
        {
            [classes.buttonOutline]: outline,
        },
        classes.button,
        classes[`buttonColor${color.toUpperCase()}`],
        classes[`buttonSize${size.toUpperCase()}`],
        className
    );

    return (
        <Tag className={ buttonClasses }>
            { children }
        </Tag>
    );
};
Button.propTypes = {
    className: PropTypes.string,
    size: PropTypes.oneOf(['sm', 'md', 'lg']),
    color: PropTypes.oneOf([
        'white',
        'primary',
        'success',
        'warning',
        'danger',
        'link'
    ]),
    outline: PropTypes.bool,
    tag: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.elementType
    ]),
    children: PropTypes.node,
};
Button.defaultProps = {
    size: 'md',
    color: 'primary',
    outline: false,
    tag: 'button'
}

export default Button;

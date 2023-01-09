import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import classes from './tooltip.module.scss';

const Tooltip = ({ children, placement, text }) => {
    const child = React.Children.only(children);

    return React.cloneElement(child, {
        className: classNames(
            child.props.className, 
            classes.tooltip,
            `toooltip--${placement}`
        ),
        'data-tooltip': text,
    });
};
Tooltip.propTypes = {
    children: PropTypes.node,
    placement: PropTypes.oneOf([
        'left', 'top', 'right', 'bottom'
    ]),
    text: PropTypes.string
};
Tooltip.defaultProps = {
    placement: 'left'
};

export default Tooltip;

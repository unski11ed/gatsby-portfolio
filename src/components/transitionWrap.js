import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

const TransitionWrap = ({ children }) => {
    const child = React.Children.only(children);

    return React.cloneElement(child, {
        className: classNames(child.props.className, 'transition-element'),
    })
};

TransitionWrap.propTypes = {
    children: PropTypes.node,
}

export default TransitionWrap;

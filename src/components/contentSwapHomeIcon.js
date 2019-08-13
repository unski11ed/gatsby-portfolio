import React from 'react';
import PropTypes from 'prop-types';
import anime from 'animejs';

import ContentSwap from './contentSwap';

const ContentSwapHomeIcon = ({
    children,
    duration,
    transitionKey,
    ...otherProps
}) => {
    const enterFunc = (target) => {
        anime({
            targets: target,
            duration: duration / 2,
            opacity: [0, 1],
            easing: 'easeOutSine',
        });
    }
    const leaveFunc = (target, index, removeElement) => {
        anime({
            targets: target,
            duration: duration / 2,
            opacity: [1, 0],
            easing: 'easeInSine',
            complete: () => {
                removeElement();
            }
        })
    }

    return (
        <ContentSwap
            {...{
                children,
                duration,
                enterFunc,
                leaveFunc,
                transitionKey,
                ...otherProps,
            }}
        />
    );
};

ContentSwapHomeIcon.propTypes = {
    duration: PropTypes.number,
    children: PropTypes.node.isRequired,
    innerRef: PropTypes.oneOfType([
        PropTypes.func, 
        PropTypes.shape({ current: PropTypes.instanceOf(Element) })
    ])
      
};
ContentSwapHomeIcon.defaultProps = {
    duration: 500,
};

export default ContentSwapHomeIcon;
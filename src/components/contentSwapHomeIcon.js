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
            scale: [1.1, 1],
            easing: 'easeOutElastic(1.3, .4)',
            complete: () => {
                target.style.transform = '';
                target.style.opacity = '';
            }
        });
    }
    const leaveFunc = (target, index, removeElement) => {
        anime({
            targets: target,
            duration: duration / 2,
            opacity: [1, 0],
            scale: [1, 1.1],
            easing: 'linear',
            complete: () => {
                target.style.transform = '';
                target.style.opacity = '';

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
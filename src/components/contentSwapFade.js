import React, { memo } from 'react';
import anime from 'animejs';
import PropTypes from 'prop-types';

import ContentSwap from './contentSwap';

const ContentSwapFade = ({
    children,
    duration,
    entryEasing,
    exitEasing,
    transitionKey,
    ...otherProps
}) => {
    const enterFunc = (target) => {
        anime({
            targets: target,
            duration: duration / 2,
            opacity: [0, 1],
            easing: entryEasing,
        });
    }
    const leaveFunc = (target, index, removeElement) => {
        anime({
            targets: target,
            duration: duration / 2,
            opacity: [1, 0],
            easing: exitEasing,
            complete: () => {
                removeElement();
            }
        })
    }

    return (
        <ContentSwap {...{
            children,
            duration,
            enterFunc,
            leaveFunc,
            transitionKey,
            ...otherProps
        }} />
    );
}

ContentSwapFade.propTypes = {
    entryEasing: PropTypes.string,
    exitEasing: PropTypes.string,
    duration: PropTypes.number,
    children: PropTypes.node.isRequired,
    transitionKey: PropTypes.string.isRequired,
};
ContentSwapFade.defaultProps = {
    entryEasing: 'easeOutSine',
    exitEasing: 'easeInSine'
};

export default memo(ContentSwapFade);

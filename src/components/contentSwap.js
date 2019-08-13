import React from 'react';
import { Flipper, Flipped } from 'react-flip-toolkit';
import PropTypes from 'prop-types';

const ContentSwap = ({
    children,
    enterFunc,
    leaveFunc,
    transitionKey,
    ...otherProps,
}) => {
    return (
        <Flipper flipKey={ transitionKey } { ...otherProps }>
            <Flipped
                flipId={ `content-swap-${transitionKey}` }
                onAppear={ enterFunc }
                onExit={ leaveFunc }
            >
                { React.Children.only(children) }
            </Flipped>
        </Flipper>
    );
}

ContentSwap.propTypes = {
    children: PropTypes.node.isRequired,
    duration: PropTypes.number,
    enterFunc: PropTypes.func.isRequired,
    leaveFunc: PropTypes.func.isRequired,
    transitionKey: PropTypes.string.isRequired,
};

ContentSwap.defaultProps = {
    duration: 500,
};

export default ContentSwap;

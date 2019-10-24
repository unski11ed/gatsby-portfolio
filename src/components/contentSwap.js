import React from 'react';
import { Flipper, Flipped } from 'react-flip-toolkit';
import PropTypes from 'prop-types';

const ContentSwap = ({
    children,
    enterFunc,
    leaveFunc,
    transitionKey,
    innerRef,
    ...otherProps
}) => {
    const onlyChild = React.Children.only(children);

    return (
        <Flipper flipKey={ transitionKey } { ...otherProps }>
            <Flipped
                flipId={ `content-swap-${transitionKey}` }
                onAppear={ enterFunc }
                onExit={ leaveFunc }
            >
                {
                    React.cloneElement(onlyChild, {
                        ref: innerRef,
                    })
                }
            </Flipped>
        </Flipper>
    );
}

ContentSwap.propTypes = {
    children: PropTypes.node.isRequired,
    duration: PropTypes.number,
    innerRef: PropTypes.oneOfType([
        PropTypes.func, 
        PropTypes.shape({ current: PropTypes.object })
    ]),
    enterFunc: PropTypes.func.isRequired,
    leaveFunc: PropTypes.func.isRequired,
    transitionKey: PropTypes.string.isRequired,
};

ContentSwap.defaultProps = {
    duration: 500,
};

export default ContentSwap;

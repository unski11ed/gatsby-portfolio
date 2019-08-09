import React from 'react';
import PropTypes from 'prop-types';
import { Flipper, Flipped } from 'react-flip-toolkit';
import anime from 'animejs';

import LayoutContext from './../layouts/layoutContext';
import {
    entryAnimationConfig,
    leaveAnimationConfig
} from './../common/transitionAnimations';

class PageTransition extends React.Component {
    static contextType = LayoutContext;

    appearAnimation(containerElement) {
        containerElement.style.opacity = 1;

        if (this.context.transitionAnimationEnabled) {
            const transitionElements = 
                containerElement.querySelectorAll('.transition-element');
            
            anime({
                ...entryAnimationConfig,
                targets: transitionElements,
                complete: () => {
                    // Reset element styles
                    for (const transitionElement of transitionElements) {
                        transitionElement.style.opacity = '';
                    }
                },
            });
        }
    }

    exitAnimation(containerElement, index, removeElement) {
        if (this.context.transitionAnimationEnabled) {
            anime({
                ...leaveAnimationConfig,
                targets: containerElement,
                complete: removeElement,
            });
        } else {
            removeElement();
        }
    }

    render() {
        const { children: page, transitionKey, ...otherProps } = this.props;

        return (
            <Flipper flipKey={ transitionKey } { ...otherProps }>
                <Flipped
                    key={ `page-${transitionKey}` }
                    flipId={ `page-${transitionKey}` }
                    onAppear={ this.appearAnimation.bind(this) }
                    onExit={ this.exitAnimation.bind(this) }
                >
                    <div>
                        { page }
                    </div>
                </Flipped>
            </Flipper>
        )
    }
}
PageTransition.propTypes = {
    children: PropTypes.node,
    transitionKey: PropTypes.string,
}

export default PageTransition;
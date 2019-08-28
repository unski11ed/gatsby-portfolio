import React from 'react';
import PropTypes from 'prop-types';
import { orderBy } from 'lodash';
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
            
            // Ensure the staggered animations start from top-left
            const orderedElements = orderBy(transitionElements, (element) => {
                const elementRect = element.getBoundingClientRect();

                return elementRect.top + elementRect.left;
            });

            anime({
                ...(entryAnimationConfig()),
                targets: orderedElements,
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
                ...(leaveAnimationConfig()),
                targets: containerElement,
                complete: removeElement,
            });
        } else {
            removeElement();
        }
    }

    render() {
        const { children: page, transitionKey, innerRef, className, ...otherProps } = this.props;

        return (
            <div className={ className } ref={ innerRef }>
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
            </div>
        )
    }
}
PageTransition.propTypes = {
    children: PropTypes.node,
    transitionKey: PropTypes.string,
    className: PropTypes.string,
    innerRef: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.object
    ])
}

export default PageTransition;
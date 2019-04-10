import React from 'react';
import PropTypes from 'prop-types';
import { Flipper, Flipped } from 'react-flip-toolkit';
import anime from 'animejs';

const appearAnimation = (containerElement) => {
    anime({
        targets: containerElement,
        opacity: 1,
        translateY: [-100, 0],
        easing: 'easeOutElastic'
    });
}
const exitAnimation = (containerElement, index, removeElement) => {
    anime({
        targets: containerElement,
        opacity: 0,
        translateY: 100,
        complete: removeElement,
        easing: 'easeInElastic'
    });
}

class PageTransition extends React.Component {
    render() {
        const { children: page, transitionKey } = this.props;

        return (
            <div style={{ flex: '1 1 auto' }}>
                <Flipper flipKey={ transitionKey }>
                    <Flipped
                        key={ `page-${transitionKey}` }
                        flipId={ `page-${transitionKey}` }
                        onAppear={ appearAnimation }
                        onExit={ exitAnimation }
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
}

export default PageTransition;
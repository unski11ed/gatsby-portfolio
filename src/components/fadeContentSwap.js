import React from 'react';
import anime from 'animejs';
import { Flipper, Flipped } from 'react-flip-toolkit';
import PropTypes from 'prop-types';

class FadeContentSwap extends React.Component {
    static propTypes = {
        children: PropTypes.node.isRequired,
        duration: PropTypes.number,
        easing: PropTypes.string,
        transitionKey: PropTypes.string.isRequired,
    }
    static defaultProps = {
        duration: 500,
        easing: 'easeInOutSine'
    }

    constructor(props) {
        super(props);

        this.elementFadeIn = this.elementFadeIn.bind(this);
        this.elementFadeOut = this.elementFadeOut.bind(this);
    }

    elementFadeIn(target) {
        anime({
            targets: target,
            duration: this.props.duration / 2,
            opacity: [0, 1],
            easing: 'easeOutSine',
        })
    }

    elementFadeOut(target, index, removeElement) {
        anime({
            targets: target,
            duration: this.props.duration / 2,
            opacity: [1, 0],
            easing: 'easeInSine',
            complete: () => {
                removeElement();
            }
        })
    }

    render() {
        const {
            transitionKey,
            children,
            duration,
            easing,
            ...otherProps
        } = this.props;

        return (
            <Flipper flipKey={ transitionKey } { ...otherProps }>
                <Flipped
                    flipId={ `fade-swap-${transitionKey}` }
                    onAppear={ this.elementFadeIn }
                    onExit={ this.elementFadeOut }
                >
                    { React.Children.only(children) }
                </Flipped>
            </Flipper>
        );
    }
}

export default FadeContentSwap;

import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Color from 'color';

import RippledParticles from './rippledParticles';

import classes from './homeBackground.module.scss';

// TODO: Later adjust it based on screen width
const PARTICLES_COUNT = 400;

class HomeBackground extends React.Component {
    static propTypes = {
        className: PropTypes.string,
        origin: PropTypes.object,
        color: PropTypes.string,
        rippleAnimationDuration: PropTypes.number,
        spotLightAlpha: PropTypes.number,
    };
    static defaultProps = {
        origin: {
            x: 0.5,
            y: 0.5,
            widthPx: 100,
            heightPx: 100,
        },
        rippleAnimationDuration: 1000,
        spotLightAlpha: 0.3,
        ambientLightAlpha: 0.05,
    };

    parentElement = null;
    particlesApi = null;
    initialColor = '#fff';
    state = {
        parentSize: { width: 0, height: 0 }
    };

    constructor() {
        super();

        this.recalculateParentSize = this.recalculateParentSize.bind(this);
        this.initialize = this.initialize.bind(this);
    }

    recalculateParentSize() {
        if (this.parentElement) {
            const parentRect = this.parentElement.getBoundingClientRect();

            this.setState({
                parentSize: {
                    width: parentRect.width,
                    height: parentRect.height
                }
            });
        }
    }

    initialize(element) {
        this.parentElement = element;
        
        this.recalculateParentSize();

        if (typeof window !== 'undefined') {
            window.addEventListener('resize', this.recalculateParentSize);
        }
    }

    componentDidMount() {
        this.initialColor = this.props.color;
        
        this.forceUpdate();
    }

    componentDidUpdate({ color: prevColor }) {
        if (
            prevColor !== this.props.color &&
            !!this.particlesApi
        ) {
            const { color, origin } = this.props;
            const { parentSize } = this.state;

            // Trigger Particle Ripple from the center of the origin
            this.particlesApi.trigger(
                {
                    x: origin.x * parentSize.width + origin.widthPx / 2,
                    y: origin.y * parentSize.height + origin.heightPx / 2
                },
                color,
            )
        }
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.recalculateParentSize);
    }

    render() {
        const {
            className,
            origin,
            color,
            spotLightAlpha,
            ambientLightAlpha,
            rippleAnimationDuration,
        } = this.props;
        const {
            parentSize
        } = this.state;

        const backgroundTransition = `background ${rippleAnimationDuration}ms cubic-bezier(0.215, 0.610, 0.355, 1.000)`;
        const shadowTransition = `box-shadow ${rippleAnimationDuration}ms cubic-bezier(0.215, 0.610, 0.355, 1.000)`;

        if (typeof document !== 'undefined') {
            const targetPortalElement = document.querySelector('#layout-background-portal');
            console.log(targetPortalElement);
            return targetPortalElement ? ReactDOM.createPortal((
                <div
                    className={ classNames(className, classes.wrap) }
                    ref={ this.initialize }
                    style={{
                        '--light-color': Color(color).alpha(spotLightAlpha).toString(),
                        '--ambient-color': Color(color).alpha(ambientLightAlpha).toString(),
                    }}
                >
                    <RippledParticles
                        onReady={ (api) => { this.particlesApi = api; } }
                        config={{
                            initialColor: this.initialColor,
                            gravitySourceRect: {
                                x: origin.x,
                                y: origin.y,
                                width: origin.widthPx,
                                height: origin.heightPx,
                            },
                            rippleConfig: {
                                rippleAnimationDuration,
                            }
                        }}
                        particlesCount={ PARTICLES_COUNT }
                        className={ classes.particles }
                    />

                    { /* Ambient Light */ }
                    <div
                        className={ classes.colorOverlay }
                        style={{
                            transition: backgroundTransition,
                        }}
                    />

                    { /* Spot Light */ }
                    <div
                        className={ classes.spotlight }
                        style={{
                            transition: `${backgroundTransition},${shadowTransition}`,
                            left: origin.x * parentSize.width,
                            top: origin.y * parentSize.height,
                            width: `${origin.widthPx}px`,
                            height: `${origin.heightPx}px`,
                        }}
                    />
                </div>
            ), targetPortalElement): null;
        }

        return null;
    }
}

export default HomeBackground;

import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { isEqual } from 'lodash/fp';
import Color from 'color';

import RippledParticles from './rippledParticles';

import classes from './homeBackground.module.scss';

// Particles Count for a 1920px Width
const PARTICLES_COUNT = 700;

class HomeBackground extends React.PureComponent {
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
        this.update = this.update.bind(this);
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
        if (element && !this.parentElement) {
            this.parentElement = element;
        
            this.recalculateParentSize();

            if (typeof window !== 'undefined') {
                window.addEventListener('resize', this.update);
            }
        }
    }

    update() {
        this.recalculateParentSize();

        this.forceUpdate();
    }

    componentDidMount() {
        this.initialColor = this.props.color;
        
        if (typeof document !== 'undefined') {
            document.addEventListener('readystatechange', this.update);
        }
    }

    componentDidUpdate(
        { color: prevColor, origin: prevOrigin },
        { parentSize: prevParentSize }
    ) {
        if (!!this.particlesApi) {
            if (prevColor !== this.props.color) {
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
    
            // If Document Size or Origin has changed - update
            // the Gravity Source
            if (
                !isEqual(prevOrigin, this.props.origin) ||
                !isEqual(prevParentSize, this.state.parentSize)
            ) {
                const { origin } = this.props;
                const { parentSize } = this.state;

                this.particlesApi.setGravitySource({
                    x: origin.x * parentSize.width,
                    y: origin.y * parentSize.height,
                    width: origin.widthPx,
                    height: origin.heightPx
                });
            }
        }
    }

    componentWillUnmount() {
        if (
            typeof window !== 'undefined' &&
            typeof document !== 'undefined'
        ) {
            window.removeEventListener('resize', this.update);
            document.removeEventListener('readystatechange', this.update);
        }
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

        if (typeof document !== 'undefined') {
            const targetPortalElement = document.querySelector('#layout-background-portal');

            return targetPortalElement ? ReactDOM.createPortal((
                <div
                    className={ className }
                    ref={ this.initialize }
                    style={{
                        '--light-color': Color(color).alpha(spotLightAlpha).toString(),
                        '--ambient-color': Color(color).alpha(ambientLightAlpha).toString(),
                        '--transition-duration': `${rippleAnimationDuration}ms`,
                        width: '100%',
                        height: '100%',
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
                        particlesCount={ Math.round(PARTICLES_COUNT * parentSize.width / 1920) }
                        className={ classes['particles'] }
                    />

                    { /* Ambient Light */ }
                    <div
                        className={ classes['color-overlay'] }
                    />

                    { /* Spot Light */ }
                    <div
                        className={ classes['spotlight'] }
                        style={{
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

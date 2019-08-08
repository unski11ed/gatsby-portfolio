import React from 'react';
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

    parentRef = React.createRef();
    particlesApi = null;
    initialColor = '#fff';
    state = {
        parentSize: { widt: 0, height: 0 }
    };

    constructor() {
        super();

        this.recalculateParentSize = this.recalculateParentSize.bind(this);
    }

    recalculateParentSize() {
        const parentRect = this.parentRef.current.getBoundingClientRect();

        this.setState({
            parentSize: {
                width: parentRect.width,
                height: parentRect.height
            }
        });
    }

    componentDidMount() {
        this.initialColor = this.props.color;

        this.recalculateParentSize();

        if (typeof window !== 'undefined') {
            window.addEventListener('resize', this.recalculateParentSize);
        }
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

        return (
            <div
                className={ classNames(className, classes.wrap) }
                ref={ this.parentRef }
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
        );
    }
}

export default HomeBackground;

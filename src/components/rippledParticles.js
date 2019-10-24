import React from 'react';
import PropTypes from 'prop-types';
import RP from 'rippled-particles';
import { isEqual, omit } from 'lodash';

class RippledParticles extends React.Component {
    static propTypes = {
        particlesCount: PropTypes.number,
        config: PropTypes.object,
        onReady: PropTypes.func,
    }

    static defaultProps = {
        particlesCount: 200,
        config: { },
        onReady: () => { }
    }

    canvasRef = React.createRef();

    constructor() {
        super();

        this.onResetParticles = this.onResetParticles.bind(this);
    }

    componentDidMount() {
        // Initialize the API, create particles and call the onReadyCallback
        if (typeof window !== undefined && this.canvasRef.current) {
            this.rippledParticles = this.createParticles();
        }
    }

    componentDidUpdate({ config: prevConfig, particlesCount: prevParticlesCount }) {
        // Recreate the whole instance if the config has been changed
        if (!isEqual(prevConfig, this.props.config)) {
            // Cleanup the current instance
            this.rippledParticles.events.removeListener(this.onResetParticles);
            this.rippledParticles.destroy();
            
            // Recreate a new one
            this.rippledParticles = this.createParticles();
        }

        // Recreate Particles if count is changed
        if (
            prevParticlesCount !== this.props.particlesCount &&
            this.rippledParticles
        ) {
            this.rippledParticles.reset();
        }
    }

    componentWillUnmount() {
        if (this.rippledParticles) {
            this.rippledParticles.destroy();
        }
    }

    createParticles() {
        const apiInstance = new RP(this.canvasRef.current, this.props.config);

        apiInstance.createParticles(this.props.particlesCount);
        apiInstance.events.on('reset', this.onResetParticles);

        this.props.onReady(apiInstance);

        return apiInstance;
    }

    onResetParticles() {
        this.rippledParticles.createParticles(this.props.particlesCount);
    }

    render() {
        const otherProps = omit(this.props, ['config', 'onReady', 'particlesCount']);
        
        return (
            <canvas { ...otherProps } ref={ this.canvasRef } />
        );
    }
}

export default RippledParticles;

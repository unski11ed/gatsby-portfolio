import React from 'react';
import PropTypes from 'prop-types';
import RP from 'rippled-particles';
import { isEqual, omit } from 'lodash';

class RippledParticles extends React.Component {
    static propTypes = {
        config: PropTypes.object,
        onReady: PropTypes.func,
    }

    canvasRef = React.createRef();

    componentDidMount() {
        if (typeof window !== undefined && this.canvasRef.current) {
            this.rippledParticles = new RP(this.canvasRef.current, this.props.config);

            this.props.onReady(this.rippledParticles);
        }
    }

    componentDidUpdate({ config: prevConfig }) {
        if (!isEqual(prevConfig, this.props.config)) {
            this.rippledParticles.destroy();

            this.rippledParticles = new RP(this.canvasRef.current, this.props.config);

            this.props.onReady(this.rippledParticles);
        }
    }

    render() {
        const otherProps = omit(this.props, ['config', 'onReady']);
        
        return (
            <canvas { ...otherProps } />
        );
    }
}

export default RippledParticles;

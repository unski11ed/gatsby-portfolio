import React from 'react';

import RippledParticles from '../components/rippledParticles';

class RootIndex extends React.Component {
    rippledParticlesApi = null;

    render() {
        return (
            <div>
                <RippledParticles
                    onReady={ (api) => { this.rippledParticlesApi = api; } }
                    config={{  }}
                />
            </div>
        );
    }
}

export default RootIndex;
import React from 'react';
import PropTypes from 'prop-types';

class Delayed extends React.Component {
    static propTypes = {
        delay: PropTypes.number,
        children: PropTypes.node,
    }
    static defaultProps = {
        delay: 100,
    }

    constructor(props) {
        super(props);

        this.state = {
            visible: false,
        }
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({ visible: true })
        }, this.props.delay);
    }

    render() {
        return this.state.visible ? this.props.children : null;
    }
}

export default Delayed;

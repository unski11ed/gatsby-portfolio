import React from 'react';
import PropTypes from 'prop-types';

class BodyPositionObserver extends React.Component {
    static propTypes = {
        children: PropTypes.func,
        onPositionChanged: PropTypes.func
    }
    domElementRef = React.createRef();

    constructor() {
        super();

        this.onWindowSizeChanged = this.onWindowSizeChanged.bind(this);
    }

    onWindowSizeChanged() {
        const elementRect = this.domElementRef.current.getBoundingClientRect();
        
        const docX = elementRect.x + window.scrollX;
        const docY = elementRect.y + window.scrollY;

        this.props.onPositionChanged({
            x: docX,
            y: docY,
            width: elementRect.width,
            height: elementRect.height,
        });
    }

    componentDidMount() {
        if (typeof window !== 'undefined') {
            window.addEventListener('resize', this.onWindowSizeChanged);

            this.onWindowSizeChanged();
        }
    }

    componentWillUnmount() {
        if (typeof window !== 'undefined') {
            window.removeEventListener('resize', this.onWindowSizeChanged);
        }
    }

    render() {
        return this.props.children({ domRef: this.domElementRef });
    }
}

export default BodyPositionObserver;

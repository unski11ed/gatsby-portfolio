import React from 'react';
import PropTypes from 'prop-types';

class BodyPositionObserver extends React.Component {
    static propTypes = {
        children: PropTypes.func,
        onPositionChanged: PropTypes.func
    }

    element = null;

    constructor() {
        super();

        this.onWindowSizeChanged = this.onWindowSizeChanged.bind(this);
        this.domRefCallback = this.domRefCallback.bind(this);
    }

    onWindowSizeChanged() {
        const elementRect = this.element.getBoundingClientRect();
        
        const docX = elementRect.left + window.scrollX;
        const docY = elementRect.top + window.scrollY;

        this.props.onPositionChanged({
            x: docX,
            y: docY,
            width: elementRect.width,
            height: elementRect.height,
        });
    }

    domRefCallback(element) {
        if (typeof window !== 'undefined' && element) {
            this.element = element;
        }
    }

    componentDidMount() {
        if (typeof window !== 'undefined' && this.element) {
            window.addEventListener('resize', this.onWindowSizeChanged);

            // Double RAF for safe recalc
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    this.onWindowSizeChanged();
                });
            });
        }
    }

    componentWillUnmount() {
        if (typeof window !== 'undefined') {
            window.removeEventListener('resize', this.onWindowSizeChanged);
        }
    }

    render() {
        return this.props.children({ domRef: this.domRefCallback });
    }
}

export default BodyPositionObserver;

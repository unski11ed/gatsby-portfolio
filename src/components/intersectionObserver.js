import React from 'react';
import PropTypes from 'prop-types';

class IntersectionObserverComponent extends React.Component {
    static propTypes = {
        children: PropTypes.node,
        options: PropTypes.object,
        enabled: PropTypes.bool,
        onIntersectionEnter: PropTypes.func,
        onIntersectionLeave: PropTypes.func,
    }
    static defaultProps = {
        enabled: true,
        onIntersectionEnter: () => { },
        onIntersectionLeave: () => { }
    }

    constructor(props) {
        super(props);

        this.childRef = React.createRef();
    }

    registerObserver(element) {
        if (element && element !== this.childRef.current) {
            if (this.childRef.current) {
                this.observer.unobserve(this.childRef.current);
            }

            const { onIntersectionEnter, onIntersectionLeave } = this.props;

            this.childRef.current = element;

            this.observer = new IntersectionObserver((entries) => {
                for (const entry of entries) {
                    if (entry.isIntersecting && onIntersectionEnter) {
                        onIntersectionEnter();
                    }
                    if (!entry.isIntersecting && onIntersectionLeave) {
                        onIntersectionLeave();
                    }
                }
            }, this.props.options);

            this.observer.observe(this.childRef.current);
        }
    }

    render() {
        const { children } = this.props;
        const child = React.Children.only(children);
        const refedChild = React.cloneElement(child, {
            ref: ref => this.registerObserver(ref),
        });

        return refedChild;
    }
}

export default IntersectionObserverComponent;
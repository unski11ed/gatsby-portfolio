import React from 'react';
import PropTypes from 'prop-types';

class IntersectionObserverComponent extends React.Component {
    static propTypes = {
        children: PropTypes.node,
        options: PropTypes.object,
        onIntersectionEnter: PropTypes.func,
        onIntersectionLeave: PropTypes.func,
    }

    constructor(props) {
        super(props);

        this.childRef = React.createRef();
    }

    componentDidMount() {
        const { onIntersectionEnter, onIntersectionLeave } = this.props;

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

    render() {
        const { children } = this.props;
        const child = React.Children.only(children);
        const refedChild = React.cloneElement(child, {
            ref: this.childRef,
        });

        return refedChild;
    }
}

export default IntersectionObserverComponent;
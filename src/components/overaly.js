import { useRef, useLayoutEffect } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

const Overlay = ({ children, overlayRef }) => {
    const portalRef = useRef();

    useLayoutEffect(() => {
        if (typeof document !== 'undefined') {
            const targetPortalElement = document.querySelector('#layout-overlay-portal');

            portalRef.current = targetPortalElement;
        }
    });

    // If headless - return children as they are, otherwise wait for portal element
    // and render the children there
    return typeof document !== undefined ?
        (portalRef.current ? ReactDOM.createPortal(children, portalRef.current) : null) :
        children;
};
Overlay.propTypes = {
    overlayRef: PropTypes.func,
    children: PropTypes.node,
}

export default Overlay;

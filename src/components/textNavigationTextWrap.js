import React, { useRef, useContext, useEffect } from 'react';
import { first } from 'lodash';
import PropTypes from 'prop-types';

import TextNavigationContext from './textNavigationContext';

const getWindowScrollPos = () => ({
    x: window !== undefined ? window.scrollX : 0,
    y: window !== undefined ? window.scrollY : 0
});

const getHeaderDefinitions = (parentElement, headersToFind) => {
    const headerElements = parentElement.querySelectorAll(headersToFind.join(','));

    return Array.from(headerElements).map((element, index) => {
        const windowPos = getWindowScrollPos();
        const elementRect = element.getBoundingClientRect();

        return {
            id: index,
            content: element.innerText,
            level: parseInt(element.tagName.replace('H', '')),
            position: {
                x: elementRect.x - windowPos.x,
                y: elementRect.y - windowPos.y
            },
            element
        };
    });
};

const TextNavigationWrap = ({ children, tag: Tag, ...otherProps }) => {
    const contentElementRef = useRef();
    const textNavContext = useContext(TextNavigationContext);

    useEffect(() => {
        // Register all headers to the context state
        const headerDefinitions = getHeaderDefinitions(
            contentElementRef.current,
            textNavContext.headersToFind
        );
        textNavContext.registerHeaders(headerDefinitions);

        // Set the first header active on startup
        textNavContext.setActiveHeader(first(headerDefinitions));

        // Register Scroll Event if window is available
        if (window !== undefined) {
            // Scroll event handler
            const scrollHandler = (e) => {
                const windowY = e.currentTarget.scrollY;
                let headerToActivate = first(headerDefinitions);

                for (const headerDefinition of headerDefinitions) {
                    if (headerDefinition.position.y <= windowY) {
                        headerToActivate = headerDefinition;
                    }
                }

                textNavContext.setActiveHeader(headerToActivate);
            };

            // Register the Handler
            window.addEventListener('scroll', scrollHandler);

            // Unregister on effect cleanup
            return () => {
                window.removeEventListener('scroll', scrollHandler);
            }
        }
    }, [children]);

    return (
        <Tag
            onScroll={(e) => { console.log(e) }}
            ref={ contentElementRef }
            { ...otherProps }
        >
            { children }
        </Tag>
    );
};
TextNavigationWrap.propTypes = {
    children: PropTypes.node.isRequired,
    tag: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.elementType
    ])
};
TextNavigationWrap.defaultProps = {
    tag: 'div'
};

export default TextNavigationWrap;

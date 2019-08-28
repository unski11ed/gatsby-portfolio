import React, { useRef, useContext, useEffect, useState } from 'react';
import { first } from 'lodash';
import PropTypes from 'prop-types';

import TextNavigationContext from './textNavigationContext';
import LayoutContext from './../layouts/layoutContext';

const getHeaderDefinitions = (parentElement, layoutContentElement, headersToFind) => {
    const headerElements = parentElement.querySelectorAll(headersToFind.join(','));

    return Array.from(headerElements).map((element, index) => {
        const layoutContentRect = layoutContentElement ? 
            layoutContentElement.getBoundingClientRect() :
            { x: 0, y: 0 };
        const elementRect = element.getBoundingClientRect();

        return {
            id: index,
            content: element.innerText,
            level: parseInt(element.tagName.replace('H', '')),
            position: {
                x: elementRect.x - layoutContentRect.x,
                y: elementRect.y - layoutContentRect.y
            },
            element
        };
    });
};

const TextNavigationWrap = ({ children, tag: Tag, ...otherProps }) => {
    const contentElementRef = useRef();
    const textNavContext = useContext(TextNavigationContext);
    const layoutContext = useContext(LayoutContext);
    const [areFontsLoaded, setAreFontsLoaded] = useState(false);
    const { contentElement: layoutContentElement } = layoutContext;

    useEffect(() => {
        // When fonts are loaded within a document - recalculate
        // by restarting the effect (listens for state change)
        if (
            !areFontsLoaded &&
            typeof document !== 'undefined' &&
            typeof document.fonts !== 'undefined'
        ) {
            document.fonts.ready.then(() => {
                setAreFontsLoaded(true);
            });
        }

        // Register all headers to the context state
        const headerDefinitions = getHeaderDefinitions(
            contentElementRef.current,
            layoutContentElement,
            textNavContext.headersToFind
        );
        textNavContext.registerHeaders(headerDefinitions);

        // Set the first header active on startup
        textNavContext.setActiveHeader(first(headerDefinitions));
        
        // Register Scroll Event if window is available
        if (window !== undefined && layoutContentElement) {
            // Scroll event handler
            const scrollHandler = (e) => {
                const windowY = Math.round(layoutContentElement.scrollTop);
                let headerToActivate = first(headerDefinitions);

                for (const headerDefinition of headerDefinitions) {
                    const headerPositionY = Math.floor(
                        headerDefinition.position.y - textNavContext.offsetTop
                    );

                    if (headerPositionY <= windowY) {
                        headerToActivate = headerDefinition;
                    }
                }
                
                textNavContext.setActiveHeader(headerToActivate);
            };
            // Register the Handler
            layoutContentElement.addEventListener('scroll', scrollHandler);

            // Unregister on effect cleanup
            return () => {
                layoutContentElement.removeEventListener('scroll', scrollHandler);
            }
        }
    }, [children, layoutContentElement, areFontsLoaded]);

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
    ]),
    contentElement: PropTypes.object,
};
TextNavigationWrap.defaultProps = {
    tag: 'div'
};

export default TextNavigationWrap;

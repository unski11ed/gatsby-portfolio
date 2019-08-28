import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';

import { scrollToPosition } from './../common/scrollTo';
import TextNavigationContext from './textNavigationContext';
import LayoutContext from './../layouts/layoutContext';

const TextNavigation = ({ children, headersToFind, offsetTop }) => {
    const [headerDefinitions, setHeaderDefinitions] = useState([]);
    const [activeHeader, setActiveHeader] = useState(null);
    const layoutContext = useContext(LayoutContext);

    return (
        <TextNavigationContext.Provider
            value={{
                headersToFind,
                setActiveHeader: (headerDef) => { setActiveHeader(headerDef) },
                activeHeader: activeHeader,
                registerHeaders: (headers) => { setHeaderDefinitions(headers) },
                headers: headerDefinitions,
                onHeaderClicked: (clickedHeader) => {
                    scrollToPosition(
                        { y: clickedHeader.position.y - offsetTop },
                        { },
                        layoutContext.contentElement,
                    )
                },
                offsetTop,
            }}
        >
            { children }
        </TextNavigationContext.Provider>
    );
};
TextNavigation.propTypes = {
    children: PropTypes.node,
    headersToFind: PropTypes.array,
    offsetTop: PropTypes.number,
};
TextNavigation.defaultProps = {
    headersToFind: ['h1', 'h2'],
    offsetTop: 15,
}

export default TextNavigation;

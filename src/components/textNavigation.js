import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { scrollToPosition } from './../common/scrollTo';
import TextNavigationContext from './textNavigationContext';

const TextNavigation = ({ children, headersToFind }) => {
    const [headerDefinitions, setHeaderDefinitions] = useState([]);
    const [activeHeader, setActiveHeader] = useState(null);

    return (
        <TextNavigationContext.Provider
            value={{
                headersToFind,
                setActiveHeader: (headerDef) => { setActiveHeader(headerDef) },
                activeHeader: activeHeader,
                registerHeaders: (headers) => { setHeaderDefinitions(headers) },
                headers: headerDefinitions,
                onHeaderClicked: (clickedHeader) => { scrollToPosition({ y: clickedHeader.position.y }) },
            }}
        >
            { children }
        </TextNavigationContext.Provider>
    );
};
TextNavigation.propTypes = {
    children: PropTypes.node,
    headersToFind: PropTypes.array
};
TextNavigation.defaultProps = {
    headersToFind: ['h1', 'h2']
}

export default TextNavigation;

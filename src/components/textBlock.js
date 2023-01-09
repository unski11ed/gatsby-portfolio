import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { navigate } from 'gatsby';
import classNames from 'classnames';

const linkClickHandler = function(e) {
    e.preventDefault();

    navigate(this.pathname);
};

const TextBlock = ({ children, className, tag: Tag }) => {
    const containerRef = useRef();

    useEffect(() => {
        const currentHost = typeof window !== 'undefined' ? window.location.host : '';
        const containerElement = containerRef.current;
        
        const linkElements = containerElement.querySelectorAll('a');

        for (const linkElement of linkElements) {
            if (linkElement.host !== currentHost) {
                // External Links
                linkElement.target = '_blank';
                linkElement.rel = 'noopener norefferer nofollow'
            } else {
                // Internal links
                linkElement.addEventListener('click', linkClickHandler);
            }
        }

        // Cleanup
        return () => {
            for (const linkElement of linkElements) {
                linkElement.removeEventListener('click', linkClickHandler);
            }
        };
    }, [children]);

    return (
        <Tag
            className={ classNames(className, 'text-styling') }
            ref={ containerRef }
        >
            { children }
        </Tag>
    );
}
TextBlock.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    tag: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.elementType
    ])
};
TextBlock.defaultProps = {
    tag: 'div'
};

export default TextBlock;

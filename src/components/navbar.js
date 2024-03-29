import React, { useState, useRef, useEffect } from 'react';
import MediaQuery from 'react-responsive';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { orderBy } from 'lodash';
import anime from 'animejs';
import { Location } from '@reach/router';

import Icon from './icon';

import classes from './navbar.module.scss';

const Navbar = ({ children, className, isTransparent, currentPath }) => {
    const navbarRef = useRef();
    const [collapseVisible, setCollapseVisible] = useState(false);

    // Elements Entry / Leave Animations ==================
    const entriesFadeIn = () => {
        const parent = navbarRef.current;

        if (parent) {
            const fadeElements = Array.from(
                parent.querySelectorAll('[data-fade-order]')
            );
            const orderedFadeElements = orderBy(
                fadeElements,
                [e => parseInt(e.dataset.fadeOrder || 0)],
                ['asc']
            );

            anime.remove(orderedFadeElements);

            anime({
                targets: orderedFadeElements,
                opacity: [0, 1],
                delay: anime.stagger(50),
                easing: 'easeOutCubic',
            });
        }
    }
    const entriesFadeOut = () => {
        const parent = navbarRef.current;

        if (parent) {
            const fadeElements = Array.from(
                parent.querySelectorAll('[data-fade-order]')
            );
            const orderedFadeElements = orderBy(
                fadeElements,
                [e => parseInt(e.dataset.fadeOrder || 0)],
                ['desc']
            );

            anime.remove(orderedFadeElements);

            anime({
                targets: orderedFadeElements,
                opacity: [1, 0],
                delay: anime.stagger(50),
                easing: 'easeInCubic',
            });
        }
    }

    // Animations Startups Effect =========================
    useEffect(() => {
        if (collapseVisible) {
            entriesFadeIn();
        } else {
            entriesFadeOut();
        }
    }, [collapseVisible]);

    // Route Transition Effect ============================
    useEffect(() => {
        setCollapseVisible(false);
    }, [currentPath]);

    // Render =============================================
    return (
        <MediaQuery maxWidth="659px">
        {
            (phoneMatches) => (
                <header
                    className={ classNames(className, classes['navbar'], {
                        [classes['navbar--transparent']]: isTransparent && !collapseVisible,
                        [classes['navbar--collapse-hide']]: !collapseVisible,
                    }) }
                    style={{
                        /* For height animation with CSS transitions on mobile only */
                        height: navbarRef.current && phoneMatches ?
                            `${navbarRef.current.scrollHeight}px` : 'inherit',
                    }}
                    ref={ navbarRef }
                >
                    { children }

                    <div className={ classes['navbar__toggle-collapse-wrap'] }>
                        <button 
                            type="button"
                            className={ classNames(classes['navbar__toggle-collapse'], {
                                [classes['navbar__toggle-collapse--active']]: collapseVisible
                            }) }
                            onClick={ () => setCollapseVisible(!collapseVisible) }
                        >
                            <Icon glyph="bars" />
                        </button>
                    </div>
                </header>
            )
        }
        </MediaQuery>
    );
};

Navbar.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    isTransparent: PropTypes.bool,
    currentPath: PropTypes.string,
}

Navbar.defaultProps = {
    isTransparent: false,
}

const LocationNavbar = (props) => (
    <Location>
    {
        ({ location }) => (
            <Navbar currentPath={ location.pathname } { ...props } />
        )
    }
    </Location>
);

export default LocationNavbar;

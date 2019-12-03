import React from 'react';
import PropTypes, { element } from 'prop-types';
import Helmet from 'react-helmet';
import classNames from 'classnames';
import { Link } from 'gatsby';
import { Location } from '@reach/router';

import 'water.css/dist/dark.css';
import './base.scss';
import './../styles/styles.scss';

import sourceSansPro300 from './../fonts/source-sans-pro-300-latin-ext.woff2';
import sourceSansPro400 from './../fonts/source-sans-pro-400-latin-ext.woff2';
import sourceSansPro400Italic from './../fonts/source-sans-pro-400-italic-latin-ext.woff2';
import sourceSansPro600 from './../fonts/source-sans-pro-600-latin-ext.woff2';
import sourceSansPro700 from './../fonts/source-sans-pro-700-latin-ext.woff2';

import classes from './layout.module.scss';

import Navbar from './../components/navbar';
import NavbarBrand from './../components/navbarBrand';
import NavbarNavigation from '../components/navbarNavigation';
import NavbarNavigationItem from '../components/navbarNavigationItem';
import NavbarSocial from '../components/navbarSocial';
import PageTransition from './../components/pageTransition';

import LayoutContext from './layoutContext';

const DEFAULT_THEME_COLOR = 'primary';

class Layout extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            transitionAnimationEnabled: true,
            navbarTransparent: false,
            themeColor: DEFAULT_THEME_COLOR,
            prevPathName: null,
        }

        this.contentElement = null;
        this.contentElementRef = this.contentElementRef.bind(this);
        this.toggleTransitionAnimations = this.toggleTransitionAnimations.bind(this);
        this.toggleNavbarTransparent = this.toggleNavbarTransparent.bind(this);
        this.setThemeColor = this.setThemeColor.bind(this);
        this.resetThemeColor = this.resetThemeColor.bind(this);
        this.currentPathName = null;
    }

    contentElementRef(element) {
        if (element && element !== this.contentElement) {
            this.contentElement = element;

            this.forceUpdate();
        }
    }

    // Context Actions===========================
    toggleTransitionAnimations(enabled) {
        this.setState({
            transitionAnimationEnabled: typeof enabled === 'undefined' ?
                !this.state.transitionAnimationEnabled :
                enabled
        });
    }

    toggleNavbarTransparent(isTransparent) {
        this.setState({
            navbarTransparent: isTransparent
        });
    }

    setThemeColor(color) {
        this.setState({
            themeColor: color,
        })
    }

    resetThemeColor() {
        this.setState({
            themeColor: DEFAULT_THEME_COLOR,
        })
    }
    
    // Lifecycle Methods ========================
    componentDidMount() {
        this.currentPathName = this.props.location.pathname;
    }

    componentDidUpdate({ location: prevLocation }) {
        const { location: currentLocation } = this.props;

        if (prevLocation.pathname !== currentLocation.pathname) {
            if (this.currentPathName !== currentLocation.pathname) {
                this.setState({
                    prevPathName: this.currentPathName
                });
                this.currentPathName = currentLocation.pathname;
            }

            this.contentElement.scrollTop = 0;
        }
    }

    // Render ===================================
    render() {
        const { children, location } = this.props;
        const { pathname } = location;
        const pageSlug = pathname.replace(/\//g, '')  || 'home';

        return (
            <React.Fragment>
                <Helmet>
                    <link rel="preload" as="font" href={sourceSansPro300} type="font/woff2" crossOrigin="anonymous"/>
                    <link rel="preload" as="font" href={sourceSansPro400} type="font/woff2" crossOrigin="anonymous"/>
                    <link rel="preload" as="font" href={sourceSansPro400Italic} type="font/woff2" crossOrigin="anonymous"/>
                    <link rel="preload" as="font" href={sourceSansPro600} type="font/woff2" crossOrigin="anonymous"/>
                    <link rel="preload" as="font" href={sourceSansPro700} type="font/woff2" crossOrigin="anonymous"/>
                    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
                    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
                    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
                    <meta name="theme-color" content="#000000" />
                </Helmet>

                <LayoutContext.Provider
                    value={{
                        ...this.state,
                        toggleTransitionAnimations: this.toggleTransitionAnimations,
                        toggleNavbarTransparent: this.toggleNavbarTransparent,
                        setThemeColor: this.setThemeColor,
                        resetThemeColor: this.resetThemeColor,
                        contentElement: this.contentElement,
                    }}
                >
                    <main className={ classes['layout'] }>
                        { /* Portal Backgrounds will spawn here: */ }
                        <div className={ classes['layout__background'] } id="layout-background-portal" />

                        { /* Navbar */ }
                        <div className={ classes['layout__navbar'] }>
                            <Navbar isTransparent={ this.state.navbarTransparent }>
                                <NavbarBrand
                                    themeColor={ this.state.themeColor }
                                    to="/"
                                />

                                <NavbarNavigation>
                                    <NavbarNavigationItem to="/portfolio">
                                        Portfolio
                                    </NavbarNavigationItem>

                                    <NavbarNavigationItem to="/skills-and-experiences">
                                        Skills &amp; Exeriences
                                    </NavbarNavigationItem>

                                    <NavbarNavigationItem to="/about-me">
                                        About Me
                                    </NavbarNavigationItem>
                                </NavbarNavigation>

                                <NavbarSocial
                                    addresses={{
                                        email: 'maciej.kurbanski@outlook.com',
                                        gitHub: 'https://github.com/unski11ed',
                                        messenger: 'http://m.me/mkurban.dev'
                                    }}
                                />
                            </Navbar>
                        </div>

                        { /* Content */ }
                        <PageTransition
                            className={ classes['layout__content'] }
                            transitionKey={ pageSlug }
                            innerRef={ this.contentElementRef }
                        >
                            { children }
                        </PageTransition>

                        { /* Portal Overlay will spawn here: */ }
                        <div className={ classes['layout__overlay'] } id="layout-overlay-portal" />
                    </main>
                </LayoutContext.Provider>
            </React.Fragment>
        );
    }
}
Layout.propTypes = {
    children: PropTypes.node,
    location: PropTypes.object,
}

const LocationLayout = (props) => (
    <Location>
    {
        (location) => (
            <Layout location={ location } { ...props } />
        )
    }
    </Location>
);

export default LocationLayout;
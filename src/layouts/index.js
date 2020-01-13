import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { Location } from '@reach/router';
import Div100vh from 'react-div-100vh';

import 'water.css/dist/dark.css';
import './base.scss';
import './../styles/styles.scss';

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
                    <title>Maciej Kurbański | mkurban.dev</title>
                    <meta name="description" content="Profile of Maciej Kurbański - experienced WebDeveloper focused on the future of Frontend. Check out my Portfolio nad Contact me if needed!" />
                    
                    <meta property="og:type" content="profile" />
                    <meta property="og:title" content="Maciej Kurbański - WebDeveloper" />
                    <meta property="og:url" content="https://mkurban.dev" />
                    <meta property="og:image" content="https://mkurban.dev/og-icon.png" />
                    <meta property="profile:first_name" content="Maciej" />
                    <meta property="profile:last_name" content="Kurbański" />
                    <meta property="og:description" content="Profile of Maciej Kurbański - experienced WebDeveloper focused on the future of Frontend. Check out my Portfolio nad Contact me if needed!" />

                    <link rel="preload" as="font" href="/fonts/source-sans-pro-300-latin-ext.woff2" type="font/woff2" crossOrigin="anonymous"/>
                    <link rel="preload" as="font" href="/fonts/source-sans-pro-400-latin-ext.woff2" type="font/woff2" crossOrigin="anonymous"/>
                    <link rel="preload" as="font" href="/fonts/source-sans-pro-400-italic-latin-ext.woff2" type="font/woff2" crossOrigin="anonymous"/>
                    <link rel="preload" as="font" href="/fonts/source-sans-pro-600-latin-ext.woff2" type="font/woff2" crossOrigin="anonymous"/>
                    <link rel="preload" as="font" href="/fonts/source-sans-pro-700-latin-ext.woff2" type="font/woff2" crossOrigin="anonymous"/>
                    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
                    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
                    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
                    <meta name="theme-color" content="#000000" />

                    <html lang="en" />
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
                    <Div100vh className={ classes['layout'] }>
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
                                    <NavbarNavigationItem to="/portfolio/">
                                        Portfolio
                                    </NavbarNavigationItem>

                                    <NavbarNavigationItem to="/skills-and-experiences/">
                                        Skills &amp; Exeriences
                                    </NavbarNavigationItem>

                                    <NavbarNavigationItem to="/about-me/">
                                        About Me
                                    </NavbarNavigationItem>
                                </NavbarNavigation>

                                <NavbarSocial
                                    addresses={{
                                        email: 'maciej.kurbanski@outlook.com',
                                        gitHub: 'https://github.com/unski11ed',
                                        messenger: 'http://m.me/mkurban.dev',
                                        skype: 'xtc888',
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
                    </Div100vh>
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
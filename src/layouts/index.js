import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import classNames from 'classnames';
import { Link } from 'gatsby';

import 'water.css/src/parts/_core.css';
import './base.scss';
import './../styles/styles.scss';

import sourceSansPro300 from './../fonts/source-sans-pro-300-latin-ext.woff2';
import sourceSansPro400 from './../fonts/source-sans-pro-400-latin-ext.woff2';
import sourceSansPro400Italic from './../fonts/source-sans-pro-400-italic-latin-ext.woff2';
import sourceSansPro600 from './../fonts/source-sans-pro-600-latin-ext.woff2';
import sourceSansPro700 from './../fonts/source-sans-pro-700-latin-ext.woff2';

import logoBlue from './../images/logo-blue.svg';

import classes from './layout.module.scss';

import Navbar from './../components/navbar';
import NavbarCollapse from './../components/navbarCollapse';
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
        }
    }
    
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
                </Helmet>

                <LayoutContext.Provider
                    value={{
                        ...this.state,
                        toggleTransitionAnimations: (enabled) => {
                            this.setState({
                                transitionAnimationEnabled: typeof enabled === 'undefined' ?
                                    !this.state.transitionAnimationEnabled :
                                    enabled
                            });
                        },
                        toggleNavbarTransparent: (isTransparent) => {
                            this.setState({
                                navbarTransparent: isTransparent
                            });
                        },
                        setThemeColor: (color) => {
                            this.setState({
                                themeColor: color,
                            })
                        },
                        resetThemeColor: () => {
                            this.setState({
                                themeColor: DEFAULT_THEME_COLOR,
                            })
                        }
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
                                        email: 'mkurbanski@outlook.com',
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
                        >
                            { children }
                        </PageTransition>
                    </main>
                </LayoutContext.Provider>
            </React.Fragment>
        );
    }
}
Layout.propTypes = {
    children: PropTypes.node
}

export default Layout;
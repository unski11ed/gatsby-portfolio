import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import classNames from 'classnames';
import { Link } from 'gatsby';

import 'water.css/src/parts/_core.css';
import './base.scss';
import './../styles/styles.scss';

import avenirFont from './../fonts/avenir-400.woff2';
import classes from './layout.module.scss';

import Navigation from './../components/navigation';
import NavigationItem from './../components/navigationItem';
import PageTransition from './../components/pageTransition';

import LayoutContext from './layoutContext';

class Layout extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            transitionAnimationEnabled: true,
            navbarTransparent: false,
        }
    }
    
    render() {
        const { children, location } = this.props;
        const { pathname } = location;
        const pageSlug = pathname.replace(/\//g, '');

        return (
            <React.Fragment>
                <Helmet>
                    <link
                        rel="preload"
                        as="font"
                        href={avenirFont}
                        type="font/woff2"
                        crossOrigin="anonymous"
                    />
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
                        }

                    }}
                >
                    <main className={ classes['layout'] }>
                        { /* Portal Backgrounds will spawn here: */ }
                        <div className={ classes['layout__background'] } id="layout-background-portal" />

                        { /* Navbar */ }
                        <header
                            className={classNames(classes['layout__navbar'], {
                                [classes['layout__navbarTransparent']]: this.state.navbarTransparent
                            })}
                        >
                            <Link className={ classes['layout__navbar__brand'] } to="/">
                                mkurban.me
                            </Link>
                            
                            <Navigation className={ classes['layout__navbar__navigation'] }>
                                <NavigationItem to="/skills-and-experiences">
                                    Skills and Experiences
                                </NavigationItem>
                                <NavigationItem to="/portfolio">
                                    Portfolio
                                </NavigationItem>
                                <NavigationItem to="/about-me">
                                    About Me
                                </NavigationItem>
                            </Navigation>
                        </header>

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
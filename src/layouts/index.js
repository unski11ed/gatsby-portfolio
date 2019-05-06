import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

import './base.scss';
import classes from './layout.module.scss';

import avenirFont from './../fonts/avenir-400.woff2';

import Navigation from './../components/navigation';
import NavigationItem from './../components/navigationItem';
import PageTransition from './../components/pageTransition';

class Layout extends React.Component {
    componentDidMount() {
        console.log('mounted');
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
                <main className={ classes['layout'] }>
                    <header className={ classes['layout__navbar'] }>
                        mkurban.me
                        <Navigation>
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
                    <PageTransition transitionKey={ pageSlug }>
                        { children }
                    </PageTransition>
                </main>
            </React.Fragment>
        );
    }
}
Layout.propTypes = {
    children: PropTypes.node
}

export default Layout;
import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';


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
        }
    }

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
                <LayoutContext.Provider
                    value={{
                        ...this.state,
                        toggleTransitionAnimations: (enabled) => {
                            this.setState({
                                transitionAnimationEnabled: typeof enabled === 'undefined' ?
                                    !this.state.transitionAnimationEnabled :
                                    enabled
                            });
                        }
                    }}
                >
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
                </LayoutContext.Provider>
            </React.Fragment>
        );
    }
}
Layout.propTypes = {
    children: PropTypes.node
}

export default Layout;
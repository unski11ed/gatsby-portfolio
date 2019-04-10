import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

import './base.scss';
import classes from './layout.module.scss';

import avenirFont from './../fonts/avenir-400.woff2';

class Layout extends React.Component {
    render() {
        const { children } = this.props;
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
                    { children }
                </main>
            </React.Fragment>
        );
    }
}
Layout.propTypes = {
    children: PropTypes.node
}

export default Layout;
import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import TextBlock from './textBlock';

import classes from './footer.module.scss';

const Footer = ({ className, html }) => (
    <TextBlock
        tag="footer"
        className={ cn(className, classes['footer']) }
        htmlContent={ html }
    />
);
Footer.propTypes = {
    html: PropTypes.string.isRequired,
    className: PropTypes.string,
};

export default Footer;

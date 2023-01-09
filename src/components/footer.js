import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import TextBlock from './textBlock';

import classes from './footer.module.scss';

const Footer = ({ children, className }) => (
    <TextBlock
        tag="footer"
        className={ cn(className, classes['footer']) }
    >
        { children }
    </TextBlock>
);
Footer.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
};

export default Footer;

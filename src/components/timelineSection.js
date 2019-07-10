import React from 'react';
import PropTypes from 'prop-types';

import classes from './timeline.module.scss';

const TimelineSection = ({ children, tag: Tag }) => (
    <Tag className={ classes.timelineSection }>
        { children }
    </Tag>
);
TimelineSection.propTypes = {
    children: PropTypes.node,
    tag: PropTypes.elementType
};
TimelineSection.defaultProps = {
    tag: 'section'
};
export default TimelineSection;

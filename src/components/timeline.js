import React from 'react';
import PropTypes from 'prop-types';

import classes from './timeline.module.scss';

import TimelineSection from './timelineSection';

const Timeline = ({ children, tag: Tag, ...otherProps }) => (
    <Tag className={ classes['timeline'] } { ...otherProps }>
        { children }
    </Tag>
);
Timeline.propTypes = {
    children: PropTypes.node,
    tag: PropTypes.elementType,
};
Timeline.defaultProps = {
    tag: 'div'
}

Timeline.Section = TimelineSection;

export default Timeline;

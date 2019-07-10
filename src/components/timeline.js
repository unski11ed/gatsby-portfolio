import React from 'react';
import PropTypes from 'prop-types';

import classes from './timeline.module.scss';

import TimelineLabel from './timelineLabel';
import TimelineSection from './timelineSection';
import Icon from './icon';

const Timeline = ({ children, tag: Tag, ...otherProps }) => (
    <Tag className={ classes.timeline } { ...otherProps }>
        { children }

        <Icon className={ classes.timelineArrow } glyph="sort-down" />
    </Tag>
);
Timeline.propTypes = {
    children: PropTypes.node,
    tag: PropTypes.elementType,
};
Timeline.defaultProps = {
    tag: 'div'
}

Timeline.Label = TimelineLabel;
Timeline.Section = TimelineSection;

export default Timeline;

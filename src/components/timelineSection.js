import React from 'react';
import PropTypes from 'prop-types';

import classes from './timeline.module.scss';

const TimelineSection = ({ children, tag: Tag, year }) => (
    <Tag className={ classes['timeline__section'] } style={{ '--year': `"${year}"` }}>
        { children }
    </Tag>
);
TimelineSection.propTypes = {
    children: PropTypes.node,
    tag: PropTypes.elementType,
    year: PropTypes.string,
};
TimelineSection.defaultProps = {
    tag: 'section'
};
export default TimelineSection;

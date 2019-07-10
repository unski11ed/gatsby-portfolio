import React from 'react';
import PropTypes from 'prop-types';

import classes from './timeline.module.scss';

const TimelineLabel = ({ children }) => (
    <span className={ classes.timelineLabel }>
        { children }
    </span>
);
TimelineLabel.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.node
    ])
}
export default TimelineLabel;

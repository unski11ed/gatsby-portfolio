import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';

import classes from './contentfulVideo.module.scss';

const ContentfulVideo = ({ videoData, innerRef, ...otherProps }) => {
    const videoUrl = get(videoData, 'file.url');
    const [videoLoaded, toggleVideoLoaded] = useState(false);
    console.log(videoData);
    return (
        <div ref={ innerRef } { ...otherProps }>
            <video autoPlay className={ classes.video }>
                <source src={ videoUrl } type="video/mp4" />
            </video>
        </div>
    );
}
ContentfulVideo.propTypes = {
    videoData: PropTypes.object,
    innerRef: PropTypes.object,
};

export default ContentfulVideo;
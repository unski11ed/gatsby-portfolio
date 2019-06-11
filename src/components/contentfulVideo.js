import React, { useReducer, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { get } from 'lodash';

import Icon from './icon';

import classes from './contentfulVideo.module.scss';

const initialState = {
    isPlaying: false,
    videoReady: false,
}

function reducer(state, action) {
    switch (action.type) {
        case 'play':
            return { isPlaying: true };
        case 'pause':
            return { isPlaying: false };
        case 'canBePlayed':
            if (action.value === true && !state.isPlaying) {
                return { isPlaying: true };
            }
            if (action.value === false && state.isPlaying) {
                return { isPlaying: false };
            }
            return {};
        case 'ready':
            return { videoReady: true };
        default:
            throw new Error();
    }
}

const ContentfulVideo = ({
    videoData,
    innerRef,
    canBePlayed,
    className,
    showControls,
    ...otherProps
}) => {
    const videoUrl = get(videoData, 'file.url');
    const videoElement = useRef(null);

    const [state, dispatch] = useReducer(reducer, initialState)
    
    // When canBePlayed prop is changed - dispatch an update action
     useEffect(() => {
        dispatch({ type: 'canBePlayed', value: canBePlayed })
    }, [canBePlayed]);

    if (videoElement.current) {
        if (state.isPlaying) {
            videoElement.current.play();
        } else {
            videoElement.current.pause();
        }   
    }

    return (
        <div
            ref={ innerRef }
            className={ classNames(className, classes.wrap) }
            { ...otherProps }
        >
            {
                showControls && (
                    <a
                        className={ classes.control }
                        href="javascript:;"
                        onClick={ () => { state.isPlaying ? dispatch({ type: 'pause' }) : dispatch({ type: 'play' }) } }
                    >
                        <span className={ classes.controlIcon }>
                            <Icon glyph={ state.isPlaying ? 'pause-circle' : 'play-circle' } />
                        </span>
                    </a>
                )
            }
            <video
                loop
                preload="metadata"
                className={ classes.video }
                ref={ videoElement }
                onCanPlay={ () => { dispatch({ type: 'ready' }) } }
            >
                <source src={ videoUrl } type="video/mp4" />
            </video>
        </div>
    );
}
ContentfulVideo.propTypes = {
    className: PropTypes.string,
    videoData: PropTypes.object,
    innerRef: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.func
    ]),
    canBePlayed: PropTypes.bool,
    showControls: PropTypes.bool,
};
ContentfulVideo.defaultProps = {
    canBePlayed: true,
    showControls: true,
};

export default ContentfulVideo;
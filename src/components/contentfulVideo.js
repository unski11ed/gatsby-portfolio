import React, { useReducer, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { get } from 'lodash';

import ContentfulImage from './contentfulImage';
import Delayed from './delayed';
import Icon from './icon';
import Image from './image';

import classes from './contentfulVideo.module.scss';

const initialState = {
    isPlaying: false,
    videoReady: false,
    playProgress: 0,
}

function reducer(state, action) {
    switch (action.type) {
        case 'play':
            return {
                ...state,
                isPlaying: true,
            };
        case 'pause':
            return {
                ...state,
                isPlaying: false,
            };
        case 'canBePlayed':
            if (action.value === true && !state.isPlaying) {
                return {
                    ...state,
                    isPlaying: true
                };
            }
            if (action.value === false && state.isPlaying) {
                return {
                    ...state,
                    isPlaying: false
                };
            }
            return {};
        case 'ready':
            return {
                ...state,
                videoReady: true
            };
        case 'changePlayProgress':
            return {
                ...state,
                playProgress: action.value,
            };
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
    placeholderImage,
    muted,
    ...otherProps
}) => {
    const videoUrl = get(videoData, 'file.url');
    const videoElement = useRef(null);

    const [state, dispatch] = useReducer(reducer, initialState)
    
    // When canBePlayed prop is changed - dispatch an update action
    useEffect(() => {
        dispatch({ type: 'canBePlayed', value: canBePlayed })
    }, [canBePlayed]);

    // If controls are disabled - control the play state only by
    // canBePlayed prop
    useEffect(() => {
        if (!showControls) {
            if (canBePlayed) {
                dispatch({ type: 'play' });
            } else {
                dispatch({ type: 'pause' });

                if (videoElement.current) {
                    videoElement.current.currentTime = 0;
                }
            }
        }
    }, [canBePlayed, showControls]);

    if (videoElement.current && state.videoReady) {
        if (state.isPlaying) {
            videoElement.current.play();

        } else {
            videoElement.current.pause();
        }   
    }
    
    return (
        <div
            ref={ innerRef }
            className={ classNames(className, classes['wrap']) }
            { ...otherProps }
        >
            {
                showControls && state.videoReady && (
                    <a
                        className={ classNames(classes['control'], {
                            [classes['control--paused']]: !state.isPlaying,
                            [classes['control--playing']]: state.isPlaying
                        })}
                        href="javascript:;"
                        onClick={ () => { state.isPlaying ? dispatch({ type: 'pause' }) : dispatch({ type: 'play' }) } }
                    >
                        <span className={ classes['control__icon'] }>
                            <Icon glyph={ state.isPlaying ? 'pause-circle' : 'play-circle' } />
                        </span>
                    </a>
                )
            }

            {
                showControls && !state.videoReady && placeholderImage &&  (
                    <div className={ classNames(classes['control'], classes['control--loading']) }>
                        <ContentfulImage
                            imageData={ placeholderImage.fluid }
                            className={ classes['control__placeholder'] }
                        >
                        {
                            (imageSrcs) => (
                                <Image
                                    wrapClassName={ classes['control__placeholder'] }
                                    { ...imageSrcs }
                                />
                            )
                        }
                        </ContentfulImage>

                        <Delayed delay={ 2000 }>
                            <span className={ classes['control__icon'] }>
                                <Icon glyph="spinner" />
                            </span>
                        </Delayed>
                    </div>
                ) 
            }

            <video
                loop
                preload="metadata"
                className={ classes['video'] }
                muted={ muted }
                ref={ videoElement }
                onCanPlay={ () => { dispatch({ type: 'ready' }) } }
                onTimeUpdate={(e) => {
                    const player = e.currentTarget;
                    if (!isNaN(player.duration)) {
                        dispatch({
                            type: 'changePlayProgress',
                            value: player.currentTime / player.duration * 100,
                        })
                    }
                }}
            >
                <source src={ videoUrl } type="video/mp4" />
            </video>

            <div className={ classes['progress'] }>
                <div className={ classes['progress__bar'] } style={{ width: `${state.playProgress}%` }}>
                </div>
            </div>
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
    placeholderImage: PropTypes.object,
    muted: PropTypes.bool,
};
ContentfulVideo.defaultProps = {
    canBePlayed: true,
    showControls: true,
    muted: true,
};

export default ContentfulVideo;
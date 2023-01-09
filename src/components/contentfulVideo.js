import React, { useReducer, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { get, isEmpty } from 'lodash';

import ContentfulImage from './contentfulImage';
import Delayed from './delayed';
import Icon from './icon';
import ButtonText from './buttonText';

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
    progress,
    preloadContent,
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

    useEffect(() => {
        const togglePlay = async (play) => {
            try {
                if (play) {
                    await videoElement.current.play();
                } else {
                    await videoElement.current.pause();
                }
            } catch(e) {
                // HACK: I don't really know how to handle it properly...
                // play is asynchronous, and you shouldnt be able to call pause
            }
        };

        if (videoElement.current && state.videoReady) {
            togglePlay(state.isPlaying);  
        }
    }, [
        state.videoReady,
        state.isPlaying
    ]);
    
    return (
        <div
            ref={ innerRef }
            className={ classNames(className, classes['wrap']) }
            { ...otherProps }
        >
            {
                showControls && state.videoReady && (
                    <ButtonText
                        className={ classNames(classes['control'], {
                            [classes['control--paused']]: !state.isPlaying,
                            [classes['control--playing']]: state.isPlaying
                        })}
                        onClick={ () => { state.isPlaying ? dispatch({ type: 'pause' }) : dispatch({ type: 'play' }) } }
                    >
                        <span className={ classes['control__icon'] }>
                            <Icon glyph={ state.isPlaying ? 'pause-circle' : 'play-circle' } />
                        </span>
                    </ButtonText>
                )
            }

            {
                !state.videoReady && !isEmpty(placeholderImage) &&  (
                    <div className={ classNames(classes['control'], classes['control--loading']) }>
                        <ContentfulImage imageData={placeholderImage} className={classes['control__placeholder']} />
                        {
                            showControls && (
                                <Delayed delay={ 2000 }>
                                    <span className={ classes['control__icon'] }>
                                        <Icon glyph="spinner" />
                                    </span>
                                </Delayed>
                            )
                        }
                    </div>
                ) 
            }

            <video
                loop
                preload={ preloadContent ? 'auto' : 'metadata' }
                className={ classes['video'] }
                muted={ muted }
                ref={ videoElement }
                onCanPlayThrough={ () => { dispatch({ type: 'ready' }) } }
                onTimeUpdate={(e) => {
                    const player = e.currentTarget;
                    if (!isNaN(player.duration)) {
                        dispatch({
                            type: 'changePlayProgress',
                            value: player.currentTime / player.duration * 100,
                        })
                    }
                }}
                // poster={ imageSrcs.src.jpeg }
            >
                <source src={ videoUrl } type="video/mp4" />
            </video>

            {
                progress && (
                    <div className={ classes['progress'] }>
                        <div className={ classes['progress__bar'] } style={{ width: `${state.playProgress}%` }}>
                        </div>
                    </div>
                )
            }
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
    progress: PropTypes.bool,
    preloadContent: PropTypes.bool,
};
ContentfulVideo.defaultProps = {
    canBePlayed: true,
    showControls: true,
    muted: true,
    progress: true,
    placeholderImage: { },
    preloadContent: false,
};

export default ContentfulVideo;
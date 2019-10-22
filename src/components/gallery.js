import React, { useLayoutEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import anime from 'animejs';
import { map, get, times, reduce, find, filter } from 'lodash';
import classNames from 'classnames';

import ContentfulImage from './contentfulImage';
import ContentfulVideo from './contentfulVideo';
import Image from './image';
import Icon from './icon';
import IntersectionObserver from './intersectionObserver';

import classes from './gallery.module.scss';

const Gallery = ({ className, assets, videoPlaceholderImage }) => {
    const containerRef = useRef();
    const [rectSize, setRectSize] = useState({ width: 0, height: 0 });
    useLayoutEffect(() => {
        const resizeHandler = () => {
            const rect = containerRef.current.getBoundingClientRect();

            setRectSize({
                width: rect.width,
                height: rect.height
            });
        };

        if (typeof window !== 'undefined') {
            window.addEventListener('resize', resizeHandler);

            resizeHandler();
        }

        return () => {
            if (typeof window !== 'undefined') {
                window.removeEventListener('resize', resizeHandler);
            }
        };
    }, []);

    return (
        <div
            className={ classes['gallery'] }
            ref={ containerRef }
            style={{
                '--gallery-width': `${rectSize.width}px`,
                '--gallery-height': `${rectSize.height}px`,
            }}
        >
            <div className={ classes['gallery__rail'] }>
                {
                    map(assets, asset => {
                        const fileUrl = get(asset, 'file.url');

                        const isVideo = fileUrl.indexOf('.mp4') >= 0;
                        const isImage = (
                            fileUrl.indexOf('.png') >= 0 ||
                            fileUrl.indexOf('.jpg') >= 0
                        );
                        const itemClassName = classNames(classes['gallery__item'], {
                            //[classes['gallery__item--active']]: index === currentPhotoIndex
                        });

                        //  Handle Video
                        if (isVideo) {
                            return (
                                <ContentfulVideo
                                    key={ asset.id }
                                    videoData={ asset }
                                    className={ itemClassName }
                                    canBePlayed={ false /*index === currentPhotoIndex && this.state.isGalleryVisible*/ }
                                    placeholderImage={ videoPlaceholderImage }
                                />
                            );
                        }

                        // Handle Image
                        if (isImage) {
                            return (
                                <ContentfulImage imageData={ get(asset, 'fluid') } key={ asset.id }>
                                {
                                    (imageSrcs) => (
                                        <Image
                                            { ...imageSrcs }
                                            wrapClassName={ itemClassName }
                                        />
                                    )
                                }
                                </ContentfulImage>
                            );
                        }

                        return null;
                    })
                }
            </div>
        </div>
    )
};
Gallery.propTypes = {
    className: PropTypes.className,
    assets: PropTypes.array,
    videoPlaceholderImage: PropTypes.object,
};

export default Gallery;

import React, { useLayoutEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { map, get } from 'lodash';
import classNames from 'classnames';
import { useDebouncedCallback } from 'use-debounce';

import ContentfulImage from './contentfulImage';
import ContentfulVideo from './contentfulVideo';
import Image from './image';
import Icon from './icon';
import IntersectionObserver from './intersectionObserver';
import { scrollToPosition } from './../common/scrollTo';

import classes from './gallery.module.scss';

const Gallery = ({ className, assets, videoPlaceholderImage, showNav }) => {
    const containerRef = useRef();
    const [isGalleryVisible, setIsGalleryVisible] = useState(true);
    const [isTouchEnabled, setIsTouchEnabled] = useState(false);
    const [galleryWidth, setGalleryWidth] = useState(0);
    const [currentSlide, setCurrentSlide] = useState(0);
    const totalSlides = assets.length;
    const [scrollHandler] = useDebouncedCallback(() => {
        const currentScrollLeft = containerRef.current.scrollLeft;
        const targetSlide = Math.round(currentScrollLeft / galleryWidth);
        
        setCurrentSlide(targetSlide);
    }, 50);

    const resizeHandler = () => {
        const rect = containerRef.current.getBoundingClientRect();

        setGalleryWidth(rect.width);

        setSlide(currentSlide);
    };

    useLayoutEffect(() => {
        if (typeof window !== 'undefined') {
            window.addEventListener('resize', resizeHandler);

            window.requestAnimationFrame(() => {
                window.requestAnimationFrame(resizeHandler);
            });

            // Detect touch support
            const isTouch = ( 'ontouchstart' in window ) ||  
                ( navigator.maxTouchPoints > 0 ) || 
                ( navigator.msMaxTouchPoints > 0 );
            setIsTouchEnabled(isTouch);

            if (isTouch) {
                containerRef.current.addEventListener('scroll', scrollHandler);
            }
        }

        return () => {
            if (typeof window !== 'undefined') {
                window.removeEventListener('resize', resizeHandler);
                containerRef.current.removeEventListener('scroll', scrollHandler);
            }
        };
    }, []);

    const setSlide = (slideNo) => {
        const targetSlide = slideNo < 0 ?
            totalSlides + (slideNo % totalSlides) :
            slideNo % totalSlides;
        
        const targetX = galleryWidth * targetSlide;

        scrollToPosition({ x: targetX }, { duration: 400 }, containerRef.current);

        setCurrentSlide(targetSlide);
    }

    const slideLeft = () => {
        setSlide(currentSlide - 1);

        return false;
    }

    const slideRight = () => {
        setSlide(currentSlide + 1);

        return false;
    }

    return (
        <IntersectionObserver
            options={{
                threshold: 0.85
            }}
            onIntersectionEnter={ () => {
                setIsGalleryVisible(true);
            } }
            onIntersectionLeave={ () => {
                setIsGalleryVisible(false);
            } }
        >
            <div
                className={ classNames(classes['gallery-wrap'], className) }
                style={{
                    '--gallery-width': `${galleryWidth}px`,
                    '--gallery-total': totalSlides,
                    '--gallery-current': currentSlide,
                }}
            >
                <div
                    className={ classNames(classes['gallery'], {
                        [classes['gallery--touch']]: isTouchEnabled
                    }) }
                    ref={ containerRef }
                >
                    <div className={ classes['gallery__rail'] }>
                        {
                            map(assets, (asset, index) => {
                                const fileUrl = get(asset, 'file.url', '');

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
                                            canBePlayed={ index === currentSlide && isGalleryVisible }
                                            placeholderImage={ videoPlaceholderImage }
                                            progress={ false }
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
                {
                    showNav && (
                        <>
                            <a
                                onClick={ slideLeft }
                                className={ classNames(classes['gallery__nav'], classes['gallery__nav--left']) }
                            >
                                <Icon glyph="chevron-left" shadow />
                            </a>
                            <a
                                onClick={ slideRight }
                                className={ classNames(classes['gallery__nav'], classes['gallery__nav--right']) }
                            >
                                <Icon glyph="chevron-right" shadow />
                            </a>
                        </>
                    )
                }
                <div className={ classes['gallery__track'] }>
                    <div className={ classes['gallery__track__pointer'] } />
                </div>
            </div>
        </IntersectionObserver>
    )
};
Gallery.propTypes = {
    className: PropTypes.string,
    assets: PropTypes.array,
    videoPlaceholderImage: PropTypes.object,
    showNav: PropTypes.bool
};
Gallery.defaultProps = {
    showNav: true
};

export default Gallery;

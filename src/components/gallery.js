import React from 'react';
import PropTypes from 'prop-types';
import anime from 'animejs';
import { map, get, times, reduce, find } from 'lodash';
import classNames from 'classnames';

import ContentfulImage from './contentfulImage';
import Image from './image';

import classes from './gallery.module.scss';

const imageStyles = [
    { translateX: -20, scale: 1.05, opacity:   0, boxShadow: '15px 15px 8px 0px rgba(0, 0, 0, 0.55)' },
    { translateX:   0, scale: 1.00, opacity:   1, boxShadow: '10px 10px 8px 0px rgba(0, 0, 0, 0.55)' },
    { translateX:  20, scale: 0.95, opacity: 0.6, boxShadow: '5px 5px 4px 0px rgba(0, 0, 0, 0.55)' },
    { translateX:  40, scale: 0.90, opacity: 0.2, boxShadow: '2px 2px 4px 0px rgba(0, 0, 0, 0.55)' },
    { translateX:  60, scale: 0.85, opacity:   0, boxShadow: '0 0 0 0 rgba(0, 0, 0, 0.55)' }
];

const getAnimeTransforms = (targetIndex, delta) => {
    let toStyle, fromStyle;

    if (delta > 0) {
        fromStyle = imageStyles[targetIndex + 1];
        toStyle = imageStyles[targetIndex];
    }
    if (delta < 0) {
        fromStyle = imageStyles[targetIndex];
        toStyle = imageStyles[targetIndex + 1];
    }
    
    return {
        translateX: {
            value: [fromStyle.translateX, toStyle.translateX],
        },
        scale: {
            value: [fromStyle.scale, toStyle.scale],
        },
        opacity: {
            value: [fromStyle.opacity, toStyle.opacity],
        },
        boxShadow: {
            value: [fromStyle.boxShadow, toStyle.boxShadow],
        }
    };
}

const VISIBLE_ELEMENTS = 3;

class Gallery extends React.Component {
    static propTypes = {
        images: PropTypes.array,
    }

    constructor(props) {
        super(props);

        this.state = {
            currentPhotoIndex: 0,
        }
        this.itemsRefs = { };
    }

    animateElements(elementsSet, delta) {
        const animationsFinishes = map(elementsSet, (element, index) => {
            // Build an Animation Definition for a particular element
            const animDef = {
                ...getAnimeTransforms(index, delta),
                begin: () => {
                    element.style.zIndex = elementsSet.length - index;

                    // First Element which is invisible shouldn't react to events
                    element.style.pointerEvents = index === 0 ? 'none' : 'all';
                },
                targets: element,
                duration: 500,
                easing: 'easeInOutQuart',
            };

            // Execute animation and Setup Easings
            return anime({
                ...animDef,
                /*
                opacity: {
                    ...animDef.opacity,
                    easing: 'easeInOutQuad'
                }
                */
            }).finished;
        });

        return Promise.all(animationsFinishes);    
    }

    async changeCurrentElement(delta) {
        const { images } = this.props;
        const { currentPhotoIndex } = this.state;
        
        // Calculate New Photo Index
        let nextIndex = currentPhotoIndex + delta;
        if (nextIndex < 0) {
            nextIndex = images.length - 1;
        }
        if (nextIndex >= images.length) {
            nextIndex = nextIndex % images.length;
        }
        
        // Animate Out The Current Element
        const elementsToAnimate = times(VISIBLE_ELEMENTS + 1, (index) =>
            this.getElementAtIndex(index + (delta < 0 ? nextIndex : currentPhotoIndex)));
        await this.animateElements(elementsToAnimate, delta);

        // Set it in the state
        this.setState({ currentPhotoIndex: nextIndex });
    }

    getElementAtIndex(index) {
        const { images } = this.props;

        let normalizedIndex = index;
        if (normalizedIndex < 0) {
            normalizedIndex = images.length - currentPhotoIndex;
        }
        if (normalizedIndex >= images.length) {
            normalizedIndex = normalizedIndex % images.length;
        }

        const { id } = images[normalizedIndex];
        const targetRef = this.itemsRefs[id];

        return targetRef;
    }

    componentDidMount() {
        // Apply initial styles
        const { currentPhotoIndex } = this.state;

        // Get references for visible images
        const elementsToInitialize = times(VISIBLE_ELEMENTS, (index) =>
            this.getElementAtIndex(index + currentPhotoIndex));
        
        // Set initial styling for those images
        for (let [index, element] of elementsToInitialize.entries()) {
            const styleDef = imageStyles[index + 1];

            element.style.transform = `translateX(${styleDef.translateX}px) scale(${styleDef.scale})`;
            element.style.opacity = styleDef.opacity;
            element.style.boxShadow = styleDef.boxShadow;
        }
    }

    render() {
        const { images } = this.props;
        const { currentPhotoIndex } = this.state;
        
        return (
            <React.Fragment>
                <div className={ classes.gallery }>
                    {
                        map(images, (image, index) => (
                            <ContentfulImage imageData={ get(image, 'fluid') } key={ image.id }>
                            {
                                (imageSrcs) => (
                                    <Image
                                        { ...imageSrcs }
                                        wrapClassName={
                                            classNames(classes.galleryItem, {
                                                [classes.active]: index === currentPhotoIndex
                                            })
                                        }
                                        innerRef={(ref) => { this.itemsRefs[image.id] = ref; }}
                                    />
                                )
                            }
                            </ContentfulImage>
                        ))
                    }
                </div>

                <button type="button" onClick={() => this.changeCurrentElement(-1)}>Prev</button>
                <button type="button" onClick={() => this.changeCurrentElement(+1)}>Next</button>
            </React.Fragment>
        );
    }
}

export default Gallery;

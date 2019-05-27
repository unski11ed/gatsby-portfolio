import React from 'react';
import PropTypes from 'prop-types';
import anime from 'animejs';
import { map, get, times, reduce, find } from 'lodash';
import classNames from 'classnames';

import ContentfulImage from './contentfulImage';
import Image from './image';

import classes from './gallery.module.scss';

const imageStyles = [
    { translateX: -20, opacity:   0, boxShadow: '15px 15px 8px 0px rgba(0,0,0,0.55)' },
    { translateX:   0, opacity:   1, boxShadow: '10px 10px 8px 0px rgba(0,0,0,0.55)' },
    { translateX:  20, opacity: 0.6, boxShadow: '5px 5px 4px 0px rgba(0,0,0,0.55)' },
    { translateX:  40, opacity: 0.2, boxShadow: '2px 2px 4px 0px rgba(0,0,0,0.55)' },
];

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

    animateElements(elementsSet) {
        const animationsFinishes = map(elementsSet, (element, index) => {
            // TODO: Generate animation declarations and provide it to anime

            return anime({
                targets: element,
                translateX: '-=20px',
                scale: 1.05,
                opacity: [1, 0],
            }).finished;
        });

        return Promise.all(animationsFinishes);    
    }

    async changeCurrentElement(delta) {
        const { images } = this.props;
        const { currentPhotoIndex } = this.state;
        
        // Calculate New Photo Index
        let nextIndex = currentPhotoIndex + delta < 0;
        if (nextIndex < 0) {
            nextIndex = images.length - currentPhotoIndex;
        }
        if (nextIndex >= images.length) {
            nextIndex = nextIndex % images.length;
        }
        
        // Animate Out The Current Element
        const elementsToAnimate = times(4, (index) =>
            this.getElementAtIndex(index + currentPhotoIndex));
        await this.animateElements(elementsToAnimate);

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

    render() {
        const { images } = this.props;
        const { currentPhotoIndex } = this.state;
        
        // TODO: Provide styles to image instead of classes
        return (
            <React.Fragment>
                <button type="button" onClick={() => this.changeCurrentElement(+1)}>Next</button>

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
            </React.Fragment>
        );
    }
}

export default Gallery;

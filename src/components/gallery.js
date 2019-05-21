import React from 'react';
import PropTypes from 'prop-types';
import { map, get, times, reduce } from 'lodash';
import classNames from 'classnames';

import ContentfulImage from './contentfulImage';
import Image from './image';

import classes from './gallery.module.scss';

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

    changeCurrentElement(delta) {

    }

    render() {
        const { images } = this.props;
        const { currentPhotoIndex } = this.state;
        
        return (
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
                <button type="button" onClick={() => this.changeCurrentElement(+1)}>Next</button>
            </div>
        );
    }
}

export default Gallery;

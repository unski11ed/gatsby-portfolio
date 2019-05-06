import React from 'react';
import { first } from 'lodash';
import PropTypes from 'prop-types';

const ContentfulImage = ({ children, imageData }) => {
    if (!imageData) {
        return null;
    }
    const images = imageData.srcSet.split(',\n').map((urlSize) => {
        const [url, width] = urlSize.split(' ');
        return {
            url,
            width,
        }
    });

    return children({
        src: imageData.src,
        srcPlaceholder: first(images).url
    });
}
    
ContentfulImage.propTypes = {
    children: PropTypes.func.isRequired,
    imageData: PropTypes.object.isRequired,
}

export default ContentfulImage;
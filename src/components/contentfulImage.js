import React from 'react';
import { first, map } from 'lodash';
import PropTypes from 'prop-types';
import urlJoin from 'url-join';

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
    const placeholderImageUrl = first(images).url;

    return children({
        src: {
            jpeg: urlJoin(imageData.src, '?fm=jpg'),
            webp: urlJoin(imageData.src, '?fm=webp')
        },
        srcPlaceholder: {
            jpeg: urlJoin(placeholderImageUrl, '?fm=jpg'),
            webp: urlJoin(placeholderImageUrl, '?fm=webp')
        },
        srcSet: {
            jpeg: map(images, image => `${urlJoin(image.url, '?fm=jpeg')} ${image.width}`).join(',\n'),
            webp: map(images, image => `${urlJoin(image.url, '?fm=webp')} ${image.width}`).join(',\n'), 
        },
    });
}
    
ContentfulImage.propTypes = {
    children: PropTypes.func.isRequired,
    imageData: PropTypes.object.isRequired,
}

export default ContentfulImage;
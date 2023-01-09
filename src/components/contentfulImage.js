import React from 'react';
import PropTypes from 'prop-types';

import { GatsbyImage, getImage } from 'gatsby-plugin-image';

const ContentfulImage = ({ className, imageData }) => (
    <GatsbyImage image={getImage(imageData)} className={className} alt={imageData.title || ''} />
);
    
ContentfulImage.propTypes = {
    className: PropTypes.string,
    imageData: PropTypes.object.isRequired,
}

export default ContentfulImage;
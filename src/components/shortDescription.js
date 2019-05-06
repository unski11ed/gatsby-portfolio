import React from 'react';
import PropTypes from 'prop-types';

const ShortDescription = React.memo(({ html, ...otherProps }) => {
    const paragraphContentRegexp = /\<p\>(.*)\<\/p\>/g;
    const regexpMatches = paragraphContentRegexp.exec(html);
    const firstParagraphContent = regexpMatches[1];

    return (
        <p { ...otherProps } dangerouslySetInnerHTML={{__html: firstParagraphContent}} />
    )
});
ShortDescription.propTypes = {
    html: PropTypes.string,
}

export default ShortDescription;
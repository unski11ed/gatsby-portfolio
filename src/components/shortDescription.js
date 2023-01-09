import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const ShortDescription = React.memo(({ html, className, ...otherProps }) => {
    const paragraphContentRegexp = /<p>(.*)<\/p>/g;
    const regexpMatches = paragraphContentRegexp.exec(html);
    const firstParagraphContent = regexpMatches[1];

    return (
        <p
            { ...otherProps }
            className={ classNames(className, 'text-styling') }
            dangerouslySetInnerHTML={{__html: firstParagraphContent}}
        />
    )
});
ShortDescription.propTypes = {
    html: PropTypes.string,
}

export default ShortDescription;
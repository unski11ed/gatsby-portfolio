import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './icon.scss';

const Icon = ({ children, glyph, className, fixedWidth }) => {
    if (children) {
        const child = React.Children.only(children);

        return React.cloneElement(child, {
            className: classNames('icon', child.props.className, className, {
                'icon--fixed-width': fixedWidth
            })
        });
    } else {
        return (
            <span
                className={
                    classNames('icon', 'icon-fa', `icon--${glyph}`, className, {
                        'icon--fixed-width': fixedWidth
                    })
                }
                alt={ glyph }
            />
        )
    }
};

Icon.propTypes = {
    children: PropTypes.node,
    glyph: PropTypes.string,
    className: PropTypes.string,
    fixedWidth: PropTypes.bool,
};

export default Icon;

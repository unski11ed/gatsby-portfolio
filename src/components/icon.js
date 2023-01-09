import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
    faAngleLeft,
    faAngleRight,
    faAngleUp,
    faAlignJustify,
    faChevronLeft,
    faChevronDown,
    faChevronRight,
    faTags,
    faPenAlt,
    faTools,
    faTimes,
    faPlay,
    faPause,
    faPhone,
    faSpinner,
    faSortDown,
    faCircle,
    faEnvelope,
    faPaperPlane,
    faBars,
    faEllipsisH
} from '@fortawesome/free-solid-svg-icons';
import {
    faCalendar,
    faPlayCircle,
    faPauseCircle,
} from '@fortawesome/free-regular-svg-icons';
import {
    faGithub,
    faCodepen,
    faLinkedinIn,
    faFacebookMessenger,
    faSkype,
} from '@fortawesome/free-brands-svg-icons';

import './icon.scss';

const iconImages = {
    'pen-alt': faPenAlt,
    'tools': faTools,
    'times': faTimes,
    'angle-left': faAngleLeft,
    'angle-right': faAngleRight,
    'angle-up': faAngleUp,
    'align-justify': faAlignJustify,
    'calendar': faCalendar,
    'chevron-left': faChevronLeft,
    'chevron-down': faChevronDown,
    'chevron-right': faChevronRight,
    'tags': faTags,
    'play': faPlay,
    'pause': faPause,
    'phone': faPhone,
    'spinner': faSpinner,
    'sort-down': faSortDown,
    'circle': faCircle,
    'envelope': faEnvelope,
    'paper-plane': faPaperPlane,
    'bars': faBars,
    'ellipsis-h': faEllipsisH,
    'play-circle': faPlayCircle,
    'pause-circle': faPauseCircle,
    'github': faGithub,
    'codepen': faCodepen,
    'linkedin-in': faLinkedinIn,
    'facebook-messenger': faFacebookMessenger,
    'skype': faSkype,
}

const Icon = ({ children, glyph, className, style, fixedWidth, shadow, size }) => {
    if (children) {
        const child = React.Children.only(children);

        return React.cloneElement(child, {
            className: classNames('icon', child.props.className, className, {
                'icon--fixed-width': fixedWidth
            }),
            style: { ...child.props.style, style }
        });
    } else {
        return (
            <FontAwesomeIcon
                size={size}
                className={
                    classNames('icon', 'icon-fa', className, {
                        'icon--fixed-width': fixedWidth,
                        'icon--shadow': shadow
                    })
                }
                style={ style }
                icon={ iconImages[glyph] }
                fixedWidth={ fixedWidth }
            />
        )
    }
};

Icon.propTypes = {
    children: PropTypes.node,
    glyph: PropTypes.string,
    className: PropTypes.string,
    fixedWidth: PropTypes.bool,
    shadow: PropTypes.bool,
    style: PropTypes.object,
    size: PropTypes.oneOf(['sm', 'md']),
};
Icon.defaultProps = {
    style: { }
};

export default Icon;

import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import Icon from './icon';

import classes from './navbar.module.scss';

const NavbarSocial = ({ addresses }) => (
    <div className={ classes['navbar__social'] }>
        <div className={ classes['navbar__social__column'] }>
            <a
                href={ addresses.gitHub }
                className={ classes['navbar__social__item'] }
                target="_blank" rel="noopener noreferrer"
            >
                <Icon glyph="facebook-messenger" target="_blank" rel="noopener noreferrer" />
            </a>

            <a
                href={ addresses.gitHub }
                className={ cn(classes['navbar__social__item']) }
                target="_blank" rel="noopener noreferrer"
            >
                <Icon glyph="github" />
            </a>

            <a
                href={ addresses.linkedIn }
                className={ cn(classes['navbar__social__item']) }
                target="_blank" rel="noopener noreferrer"
            >
                <Icon glyph="linkedin-in" />
            </a>
        </div>

        <div className={ classes['navbar__social__column'] }>
            <span className={ cn(classes['navbar__social__item'], classes['navbar__social__item--icon-text']) }>
                <Icon glyph="paper-plane" target="_blank" rel="noopener noreferrer" />
                { addresses.email }
            </span>
        </div>
    </div>
);

NavbarSocial.propTypes = {
    addresses: PropTypes.shape({
        email: PropTypes.string,
        gitHub: PropTypes.string,
        linkedIn: PropTypes.string,
        messenger: PropTypes.string,
    })
}

export default NavbarSocial;
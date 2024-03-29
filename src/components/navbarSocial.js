import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import Icon from './icon';

import classes from './navbar.module.scss';

const NavbarSocial = ({ addresses }) => (
    <div className={ classes['navbar__social'] }>
        <div className={ classes['navbar__social__column'] } data-fade-order="100">
            <span className={ cn(classes['label'], classes['show-collapsed']) }>Social:</span>

            <a
                href={ addresses.messenger }
                className={ classes['navbar__social__item'] }
                target="_blank" rel="noopener noreferrer"
                aria-label="Messenger Contact"
            >
                <Icon glyph="facebook-messenger" target="_blank" rel="noopener noreferrer" />
            </a>

            <a
                href={ addresses.gitHub }
                className={ cn(classes['navbar__social__item']) }
                target="_blank" rel="noopener noreferrer"
                aria-label="GitHub Profile"
            >
                <Icon glyph="github" />
            </a>

            <a
                href={ addresses.linkedIn }
                className={ cn(classes['navbar__social__item']) }
                target="_blank" rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
            >
                <Icon glyph="linkedin-in" />
            </a>
        </div>

        <div className={ classes['navbar__social__column'] } data-fade-order="101">
            <span className={ cn(classes['label'], classes['show-collapsed']) }>Email:</span>

            <span className={ cn(classes['navbar__social__item']) }>
                <Icon
                    glyph="paper-plane"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={ cn(classes['hide-collapsed'], 'mr-2') }
                />
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
        skype: PropTypes.string,
        messenger: PropTypes.string,
    })
}

export default NavbarSocial;

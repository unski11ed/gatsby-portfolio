import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { map } from 'lodash';
import classNames from 'classnames';

import Icon from './icon';
import Button from './button';

import TextNavigationContext from './textNavigationContext';

import classes from './textNavigationNavigator.module.scss';

const TextNavigationNavigator = ({ collapsible }) => {
    const textNavContext = useContext(TextNavigationContext);
    
    return (
        <div
            className={classNames(classes['navigator'], {
                [classes['navigator--collapsible']]: collapsible
            })}
        >
            <div className={ classes['navigator__entries'] }>
                {
                    map(textNavContext.headers, (header, index) => (
                        <a
                            key={ index }
                            href="#"
                            className={
                                classNames(
                                    classes['navigator-entry'],
                                    classes[`navigator-entry--${header.level}`], {
                                        [classes['navigator-entry--active']]:
                                            header === textNavContext.activeHeader
                                    }
                                )
                            }
                            onClick={(e) => {
                                e.preventDefault();
                                
                                textNavContext.onHeaderClicked(header);

                                return false;
                            }}
                        >
                            { header.content }
                        </a>
                    ))
                }
            </div>

            { /* Collapsible Only */ }
            <div className={ classes['navigator__collapsible-wrap'] }>
                <h1>{ textNavContext.activeHeader ? textNavContext.activeHeader.content : "" }</h1>

                <Icon glyph="ellipsis-h" />
            </div>
        </div>
    );
};
TextNavigationNavigator.propTypes = {
    collapsible: PropTypes.bool,
};

export default TextNavigationNavigator;
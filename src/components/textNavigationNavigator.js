import React, { useContext } from 'react';
import { map } from 'lodash';
import classNames from 'classnames';

import TextNavigationContext from './textNavigationContext';

import classes from './textNavigationNavigator.module.scss';

const TextNavigationNavigator = () => {
    const textNavContext = useContext(TextNavigationContext);
    
    return (
        <div className={ classes.navigator }>
            {
                map(textNavContext.headers, (header) => (
                    <a
                        href="#"
                        className={
                            classNames(
                                classes['navigatorEntry'],
                                classes[`navigatorEntry${header.level}`], {
                                    [classes['navigatorEntryActive']]:
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
    );
};

export default TextNavigationNavigator;
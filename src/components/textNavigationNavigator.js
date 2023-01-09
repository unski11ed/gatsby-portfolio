import React, { useContext } from 'react';
import { map } from 'lodash';
import classNames from 'classnames';

import TextNavigationContext from './textNavigationContext';
import ButtonText from './buttonText';

import classes from './textNavigationNavigator.module.scss';

const TextNavigationNavigator = () => {
    const textNavContext = useContext(TextNavigationContext);
    
    return (
        <div className={ classes['navigator'] }>
            <div className={ classes['navigator__entries'] }>
                {
                    map(textNavContext.headers, (header, index) => (
                        <ButtonText
                            key={ index }
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
                        </ButtonText>
                    ))
                }
            </div>
        </div>
    );
};

export default TextNavigationNavigator;
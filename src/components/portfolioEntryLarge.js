import React, { forwardRef, useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import { get } from 'lodash';
import classNames from 'classnames';

import TransitionWrap from './transitionWrap';
import Gallery from './gallery';
import Icon from './icon';
import Tooltip from './tooltip';
import PortfolioEntryInfoBox from './portfolioEntryInfoBox';

import { scrollToPosition } from './../common/scrollTo';

import commonClasses from './portfolioEntry.module.scss';
import localClasses from './portfolioEntryLarge.module.scss';

const classes = {
    ...commonClasses,
    ...localClasses,
};

const PortfolioEntryLarge = forwardRef(function PortfolioEntryLarge({ data, prevPathName }, ref) {
    const textHtml = get(data, 'body.childMarkdownRemark.html');
    const galleryItems = [
        data.heroVideo,
        ...data.gallery
    ];
    const contentWrapRef = useRef();
    const scrollToTopHandler = useCallback((e) => {
        e.preventDefault();

        scrollToPosition({ y: 0 }, { }, contentWrapRef.current);
    }, [contentWrapRef]);
    
    return (
        <div className={ classes['portfolio-entry'] } ref={ ref }>
            <div className={ classes['content-wrap'] }>
                <article className={ classes['content'] }>
                    <TransitionWrap>
                        <div className={ classes['content__info'] }>
                            <header className={  classes['info-box'] }>
                                <div className={ classes['info-box__header'] }>
                                    <Tooltip text="Close" placement="right">
                                        <Link to={ prevPathName || '/portfolio/' } className={ classes['close'] }>
                                            <Icon glyph="angle-left" className={ classes['close__icon'] }/>
                                        </Link>
                                    </Tooltip>

                                    <h1>
                                        { data.title }
                                    </h1>
                                </div>

                                <PortfolioEntryInfoBox
                                    data={ data }
                                    className={ classNames(classes['info-box__content']) }
                                />
                            </header>
                        </div>
                    </TransitionWrap>
                    <div className={ classes['content__wrap'] } ref={ contentWrapRef }>
                        <section id="project-gallery" className={ classes['content__gallery'] }>
                            <TransitionWrap>
                                <Gallery
                                    assets={ galleryItems }
                                    videoPlaceholderImage={ data.heroImage }
                                />
                            </TransitionWrap>
                        </section>

                        <div className={ classes['content__wrap__inner'] }>
                            <section id="project-text" className={ classNames(classes['content__text'], classes['text']) }>
                                <TransitionWrap>
                                    <div dangerouslySetInnerHTML={{ __html: textHtml }} className="text-styling">
                                    </div>
                                </TransitionWrap>
                            </section>

                            <div className={ classes['footer'] }>
                                <p className={ classes['footer__lead'] }>You seem to be interested! :)</p>
                                <p className={ classes['footer__content'] }>
                                    Unfortunately that's all :( <a href="#" onClick={ scrollToTopHandler }>Back Top</a>
                                </p>
                            </div>
                        </div>
                    </div>
                </article>
            </div>
        </div>
    )
});
PortfolioEntryLarge.propTypes = {
    data: PropTypes.object.isRequired,
    prevPathName: PropTypes.string,
};

export default PortfolioEntryLarge;

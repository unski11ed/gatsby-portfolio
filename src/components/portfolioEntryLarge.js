import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import { get } from 'lodash';
import classNames from 'classnames';

import TransitionWrap from './transitionWrap';
import Gallery from './gallery';
import Icon from './icon';
import Tooltip from './tooltip';

import PortfolioEntryInfoBox from './portfolioEntryInfoBox';

import commonClasses from './portfolioEntry.module.scss';
import localClasses from './portfolioEntryLarge.module.scss';

const classes = {
    ...commonClasses,
    ...localClasses,
};

const PortfolioEntryLarge = ({ data }) => {
    const textHtml = get(data, 'body.childMarkdownRemark.html');
    const galleryItems = [
        data.heroVideo,
        ...data.gallery
    ];

    return (
        <div className={ classes['content-wrap'] }>
            <article className={ classes['content'] }>
                <TransitionWrap>
                    <div className={ classes['content__info'] }>
                        <header className={  classes['info-box'] }>
                            <div className={ classes['info-box__header'] }>
                                <Tooltip text="Close" placement="right">
                                    <Link to="/portfolio" className={ classes['close'] }>
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
                <div className={ classes['content__wrap'] }>
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
                    </div>
                </div>
            </article>
        </div>
    )
};
PortfolioEntryLarge.propTypes = {
    data: PropTypes.object.isRequired,
};

export default PortfolioEntryLarge;

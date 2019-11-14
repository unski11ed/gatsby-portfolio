import React from 'react';
import PropTypes from 'prop-types';
import Media from 'react-responsive';

import { Link } from 'gatsby';
import { get } from 'lodash';
import classNames from 'classnames';

import TransitionWrap from './transitionWrap';
import Gallery from './gallery';
import Icon from './icon';
import Tooltip from './tooltip';

import PortfolioEntryInfoBox from './portfolioEntryInfoBox';

import commonClasses from './portfolioEntry.module.scss';
import localClasses from './portfolioEntrySmall.module.scss';

const classes = {
    ...commonClasses,
    ...localClasses,
};

const PortfolioEntrySmall = ({ data }) => {
    const textHtml = get(data, 'body.childMarkdownRemark.html');
    const galleryItemsLandscape = [
        data.heroVideo,
        ...data.gallery
    ];
    const galleryItemsPortrait = data.galleryPhone;

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
                            <Media query="(orientation: portrait)">
                            {
                                (portraitMatches) => (
                                    <section id="project-gallery" className={ classes['content__gallery'] }>
                                        <TransitionWrap>
                                            <Gallery
                                                assets={ portraitMatches ? galleryItemsPortrait : galleryItemsLandscape }
                                                videoPlaceholderImage={ data.heroImage }
                                            />
                                        </TransitionWrap>
                                    </section>
                                )
                            }
                            </Media>
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
PortfolioEntrySmall.propTypes = {
    data: PropTypes.object.isRequired,
};

export default PortfolioEntrySmall;

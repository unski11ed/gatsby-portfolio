import React, { useEffect, useState, forwardRef, useRef } from 'react';
import ResizeObserver from '@juggle/resize-observer';
import PropTypes from 'prop-types';
import Media from 'react-responsive';
import { Link } from 'gatsby';
import { get, first } from 'lodash';
import classNames from 'classnames';

import TransitionWrap from './transitionWrap';
import Gallery from './gallery';
import Icon from './icon';
import PortfolioEntryInfoBox from './portfolioEntryInfoBox';
import { scrollToPosition } from './../common/scrollTo';

import commonClasses from './portfolioEntry.module.scss';
import localClasses from './portfolioEntrySmall.module.scss';

const classes = {
    ...commonClasses,
    ...localClasses,
};

const PortfolioEntrySmall = forwardRef(function PortfolioEntrySmall({ data, prevPathName }, ref) {
    const [galleryHeight, setGalleryHeight] = useState(0);
    const [galleryHidden, setGalleryHidden] = useState(false);
    const galleryRef = useRef();
    const containerRef = useRef();

    const textHtml = get(data, 'body.childMarkdownRemark.html');
    const galleryItemsLandscape = [
        data.heroVideo,
        ...data.gallery
    ];
    const galleryItemsPortrait = data.galleryPhone;

    const scrollToTopHandler = (e) => {
        e.preventDefault();

        scrollToPosition({ y: 0 }, { }, containerRef.current);
    };

    useEffect(() => {
        // Watch the size of gallery
        const resizeObserver = new ResizeObserver((entries) => {
            const entry = first(entries);
            if (entry && entry.contentRect) {
                const height = entry.contentRect.height;
                if (height !== galleryHeight) {
                    setGalleryHeight(entry.contentRect.height);
                }
            }
        });
        resizeObserver.observe(galleryRef.current);

        return () => {
            resizeObserver.disconnect();
        }
    }, [galleryHeight]);

    useEffect(() => {
        // Watch scroll position and set the CSS variable
        const scrollHandler = (e) => {
            const scrollTop = e.target.scrollTop;
            const scrollLength = scrollTop / galleryHeight;

            containerRef.current.style.setProperty('--scroll-length', scrollLength > 1 ? 1 : scrollLength);

            setGalleryHidden(scrollTop > galleryHeight);
        };

        containerRef.current.addEventListener('scroll', scrollHandler);

        return () => {
            if (containerRef.current) {
                containerRef.current.removeEventListener('scroll', scrollHandler);
            }
        }
    }, [galleryHeight, containerRef.current]);

    return (
        <div
            className={ classes['portfolio-entry'] }
            ref={ r => {
                ref(r);

                containerRef.current = r;
            } }
        >
            <div className={ classes['navbar'] }>
                <Link to={ prevPathName || '/portfolio' } className={ classes['navbar-command'] }>
                    <Icon glyph="angle-left" shadow className={ classes['navbar-command__icon'] } />
                    <span className={ classes['navbar-command__text'] }>
                        Back
                    </span>
                </Link>

                <a
                    href="#"
                    className={ classes['navbar-command'] }
                    onClick={ scrollToTopHandler }
                    style={{ opacity: galleryHidden ? 1 : 0 }}
                >
                    <span className={ classes['navbar-command__text'] }>
                        Top
                    </span>
                    <Icon glyph="angle-up" shadow className={ classes['navbar-command__icon'] } />
                </a>
            </div>
            <div className={ classes['content-wrap'] }>
                <article className={ classes['content'] }>
                    <Media query="(orientation: portrait)">
                    {
                        (portraitMatches) => (
                            <section
                                id="project-gallery"
                                className={ classes['content__gallery'] }
                                ref={ galleryRef }
                            >
                                <TransitionWrap>
                                    <Gallery
                                        assets={ portraitMatches ? galleryItemsPortrait : galleryItemsLandscape }
                                        videoPlaceholderImage={ data.heroImage }
                                        showNav={ false }
                                    />
                                </TransitionWrap>
                            </section>
                        )
                    }
                    </Media>

                    <div
                        className={ classes['content__wrap'] }
                        style={{
                            marginTop: galleryHeight ? `${galleryHeight}px` : ''
                        }}
                    >
                        <TransitionWrap>
                            <div className={ classes['content__info'] }>
                                <header className={  classes['info-box'] }>
                                    <div className={ classes['info-box__header'] }>
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

                        <section id="project-text" className={ classNames(classes['content__text'], classes['text']) }>
                            <TransitionWrap>
                                <div dangerouslySetInnerHTML={{ __html: textHtml }} className="text-styling">
                                </div>
                            </TransitionWrap>
                        </section>
                    </div>
                </article>
            </div>
        </div>
    )
});
PortfolioEntrySmall.propTypes = {
    data: PropTypes.object.isRequired,
    prevPathName: PropTypes.string,
};

export default PortfolioEntrySmall;

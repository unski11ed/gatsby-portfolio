import React from 'react';
import classNames from 'classnames';
import anime from 'animejs';
import { get, map, startCase } from 'lodash';
import { Link, graphql } from 'gatsby';
import Media from 'react-responsive';

import TransitionWrap from './../components/transitionWrap';
import Container from './../components/container';
import Gallery from './../components/gallery';
import TechIcon from './../components/techIcon';
import Icon from './../components/icon';
import Button from './../components/button';
import IntersectionObserver from './../components/intersectionObserver';
import Tooltip from './../components/tooltip';
import Overlay from './../components/overaly';

import LayoutConext from './../layouts/layoutContext';
import { entryAnimationConfig } from './../common/transitionAnimations';
import { tagColors } from './../common/consts';

import classes from './portfolio-entry.module.scss';

class PortfolioEntry extends React.Component {
    static contextType = LayoutConext;

    constructor(props) {
        super(props);

        this.containerRef = React.createRef();

        this.state = {
            headerOutOfViewPort: true,
            galleryVideoPlayable: true,
        }
    }

    async animateContentEntry(elementRef) {
        if (!this.containerRef.current && elementRef) {
            this.containerRef.current = elementRef;
            const containerElement = this.containerRef.current;
            const transitionWrapElements = containerElement.querySelectorAll('.transition-element');

            const childrenAnimation = anime({
                ...entryAnimationConfig({
                    staggerDelay: 100,
                    duration: 400,
                }),
                targets: transitionWrapElements,
            }).finished;

            /*
            
            */
           
        }
    }

    componentDidMount() {
        this.context.toggleTransitionAnimations(true);
    }

    render() {
        const item = get(this.props, 'data.contentfulPortfolioProject');
        const textHtml = get(item, 'body.childMarkdownRemark.html');
        const descriptionHtml = get(item, 'description.childMarkdownRemark.html');
        const galleryItems = [
            item.heroVideo,
            ...item.gallery
        ];

        const galleryElement = (
            <section id="project-gallery" className={ classes['content__gallery'] }>
                <TransitionWrap>
                    <Gallery
                        assets={ galleryItems }
                        videoPlaceholderImage={ item.heroImage }
                        videoPlayEnabled={ this.state.galleryVideoPlayable }
                    />
                </TransitionWrap>
            </section>
        );

        const contentElement = (
            <section id="project-text" className={ classes['content__text'] }>
                <TransitionWrap>
                    <div dangerouslySetInnerHTML={{ __html: textHtml }} className="text-styling">
                    </div>
                </TransitionWrap>
            </section>
        );

        return (
            <Overlay>
                <div className={ classNames(classes['portfolio-entry']) } ref={ this.animateContentEntry.bind(this) }>
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
                                                { item.title }
                                            </h1>
                                        </div>

                                        <div className={ classNames(classes['info-box__content'], classes['info']) }>
                                            { /*    Info: Description   */}
                                            <div
                                                className={ classNames(classes['info'], classes['info--description']) }
                                                dangerouslySetInnerHTML={{ __html: descriptionHtml }}
                                            />

                                            { /*    Info: Date     */}
                                            <div className={ classes['info'] }>
                                                <div className={ classNames(classes['info__title'], 'text-icon') }>
                                                    <Icon glyph="calendar" className="text-muted" />
                                                    <span>Timespan</span>
                                                </div>
                                                <div className={ classes['info__content'] }>
                                                    { item.startDate } - { item.endDate ? item.endDate : 'Now' }
                                                </div>
                                            </div>

                                            { /*    Info: Tags   */}
                                            {
                                                item.tags && (
                                                    <div className={ classes['info'] }>
                                                        <div className={ classNames(classes['info__title'], 'text-icon') }>
                                                            <Icon glyph="tags" className="text-muted" />
                                                            <span>Tags</span>
                                                        </div>
                                                        <div className={ classNames(classes['info__content'], 'tag-cloud') }>
                                                            {
                                                                map(item.tags, (tag, index) => (
                                                                    <div
                                                                        key={ index }
                                                                        className={
                                                                            classNames(
                                                                                'tag-cloud__tag',
                                                                                'text-icon',
                                                                                'badge',
                                                                                'badge--bg'
                                                                            ) 
                                                                        }
                                                                    >
                                                                        <Icon glyph="circle" className={`bg-${tagColors[tag]}`} />

                                                                        <span>{ startCase(tag) }</span>
                                                                    </div>
                                                                ))
                                                            }
                                                        </div>
                                                    </div>
                                                )
                                            }

                                            { /*    Info: Technologies   */}
                                            <div className={ classes['info'] }>
                                                <div className={ classNames(classes['info__title'], 'text-icon') }>
                                                    <Icon glyph="tools" className="text-muted" />
                                                    <span>Technologies</span>
                                                </div>
                                                <div className={ classNames(classes['info__content'], 'tag-cloud') }>
                                                    {
                                                        map(item.technologies, (techName, index) => (
                                                            <div className={ classNames('tag-cloud__tag', 'text-icon', 'badge', 'badge--bg') } key={ index }>
                                                                <Icon>
                                                                    <TechIcon name={ techName } />
                                                                </Icon>
                                                                <span>{ startCase(techName) }</span>
                                                            </div>
                                                        ))
                                                    }
                                                </div>
                                            </div>

                                            { /* Links */ }
                                            <div className={ classes['buttons'] }>
                                                {
                                                    item.links.gitHub && (
                                                        <Button
                                                            outline
                                                            size="md"
                                                            className={ classes['button'] }
                                                            href={ item.links.gitHub }
                                                            tag="a"
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                        >
                                                            GitHub Source
                                                            <Icon glyph="github" className={ classes['button__icon'] } />
                                                        </Button>
                                                    )
                                                }
                                                {
                                                    item.links.live && (
                                                        <Button
                                                            size="md"
                                                            className={ classes['button'] }
                                                            href={ item.links.live }
                                                            tag="a"
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                        >
                                                            Live Demo
                                                            <Icon glyph="play" className={ classes['button__icon'] } />
                                                        </Button>
                                                    )
                                                }
                                                {
                                                    item.links.codeSandbox && (
                                                        <Button
                                                            outline
                                                            size="md"
                                                            className={ classes['button'] }
                                                            href={ item.links.codeSandbox }
                                                            tag="a"
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                        >
                                                            CodeSandbox Demo
                                                            <Icon glyph="codesandbox" className={ classes['button__icon'] } />
                                                        </Button>
                                                    )
                                                }
                                            </div>
                                        </div>
                                    </header>
                                </div>
                            </TransitionWrap>
                            
                            <Media query="(min-width: 767px)">
                            {
                                (phoneMatches) => !!phoneMatches ? (
                                    <div className={ classes['content__wrap'] }>
                                        { galleryElement }

                                        <div className={ classes['content__wrap__inner'] }>
                                            { contentElement }
                                        </div>
                                    </div>
                                ) : (
                                    <React.Fragment>
                                        { galleryElement }

                                        { contentElement }
                                    </React.Fragment>
                                )
                            }
                            </Media>
                            
                        </article>
                    </div>
                </div>
            </Overlay>
        );
    }
}

export default PortfolioEntry;

export const pageQuery = graphql`
    query PortfolioEntryBySlug($slug: String!) {
        site {
            siteMetadata {
                title
            }
        }
        contentfulPortfolioProject(slug: { eq: $slug }) {
            title
            technologies
            tags
            startDate(formatString: "MMM YYYY")
            endDate(formatString: "MMM YYYY")
            links {
                gitHub
                codePen
                codeSandbox
                live
            }
            heroImage {
                id
                fluid(maxWidth: 1080, resizingBehavior: SCALE) {
                    ...GatsbyContentfulFluid_withWebp
                }
            }
            heroVideo {
                id
                file {
                    url
                }
            }
            gallery {
                id
                title
                fluid(maxWidth: 1880, resizingBehavior: SCALE) {
                    ...GatsbyContentfulFluid_withWebp
                }
                file {
                    url
                }
            }
            description {
                childMarkdownRemark {
                    html
                }
            }
            body {
                childMarkdownRemark {
                    html
                }
            }
        }
    }
`;

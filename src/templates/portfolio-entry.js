import React from 'react';
import classNames from 'classnames';
import anime from 'animejs';
import { get, map, startCase } from 'lodash';
import { Link, graphql } from 'gatsby';

import TransitionWrap from './../components/transitionWrap';
import Container from './../components/container';
import Gallery from './../components/gallery';
import TechIcon from './../components/techIcon';
import Icon from './../components/icon';
import IntersectionObserver from './../components/intersectionObserver';
import Tooltip from './../components/tooltip';

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
        }
    }

    animateContentEntry() {
        const containerElement = this.containerRef.current;
        const transitionWrapElements = containerElement.querySelectorAll('.transition-element');

        anime({
            ...entryAnimationConfig,
            targets: transitionWrapElements,
        })        
    }

    componentDidMount() {
        this.context.toggleTransitionAnimations(true);

        this.animateContentEntry();

        console.log(this.props);
    }

    render() {
        const item = get(this.props, 'data.contentfulPortfolioProject');
        const textHtml = get(item, 'body.childMarkdownRemark.html');
        const descriptionHtml = get(item, 'description.childMarkdownRemark.html');

        return (
            <div className={ classNames(classes['portfolio-entry'], 'portfolio-post-bg') } ref={ this.containerRef }>
                <div className={ classes['content-wrap'] }>
                    <Container>
                        <article className={ classes['content'] }>
                            <TransitionWrap>
                                <div
                                    className={ classes['content__header'] }
                                >
                                    <h1>
                                        { item.title }
                                    </h1>

                                    <Tooltip text="Close">
                                        <Link to="/portfolio" className={ classes['close'] }>
                                            <Icon glyph="times" className={ classes['close__icon'] }/>
                                        </Link>
                                    </Tooltip>
                                </div>
                            </TransitionWrap>

                            <TransitionWrap>
                                <div className={ classes['content__info'] }>
                                    <header className={  classes['info-box'] }>
                                        <div className={ classNames(classes['info-box__content'], classes['info']) }>
                                            { /*    Info: Date     */}
                                            <div className={ classNames(classes['info__title'], 'text-icon') }>
                                                <Icon glyph="calendar" className="text-muted" />
                                                <span>Timespan</span>
                                            </div>
                                            <div className={ classes['info__content'] }>
                                                { item.startDate } - { item.endDate ? item.endDate : 'Now' }
                                            </div>

                                            { /*    Info: Description   */}
                                            <div className={ classNames(classes['info__title'], 'text-icon') }>
                                                <Icon glyph="pen-alt" className="text-muted" />
                                                <span>Description</span>
                                            </div>
                                            <div className={ classes['info__content'] } dangerouslySetInnerHTML={{ __html: descriptionHtml }} />

                                            { /*    Info: Tags   */}
                                            {
                                                item.tags && (
                                                    <React.Fragment>
                                                        <div className={ classNames(classes['info__title'], 'text-icon') }>
                                                            <Icon glyph="tags" className="text-muted" />
                                                            <span>Tags</span>
                                                        </div>
                                                        <div className={ classNames(classes['info__content'], 'tag-cloud') }>
                                                            {
                                                                map(item.tags, (tag) => (
                                                                    <div
                                                                        className={
                                                                            classNames(
                                                                                'tag-cloud__tag',
                                                                                'text-icon',
                                                                                'badge',
                                                                                'badge--small',
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
                                                    </React.Fragment>
                                                )
                                            }

                                            { /*    Info: Technologies   */}
                                            <div className={ classNames(classes['info__title'], 'text-icon') }>
                                                <Icon glyph="tools" className="text-muted" />
                                                <span>Technologies</span>
                                            </div>
                                            <div className={ classNames(classes['info__content'], 'tag-cloud') }>
                                                {
                                                    map(item.technologies, (techName) => (
                                                        <div className={ classNames('tag-cloud__tag', 'text-icon', 'badge', 'badge--bg') }>
                                                            <Icon>
                                                                <TechIcon name={ techName } />
                                                            </Icon>
                                                            <span>{ startCase(techName) }</span>
                                                        </div>
                                                    ))
                                                }
                                            </div>
                                        </div>
                                    </header>
                                </div>
                            </TransitionWrap>
                            
                            <section id="project-gallery" className={ classes['content__gallery'] }>
                                <TransitionWrap>
                                    <Gallery
                                        assets={ item.gallery }
                                        videoPlaceholderImage={ item.heroImage }
                                    />
                                </TransitionWrap>
                            </section>

                            <section id="project-text" className={ classes['content__text'] }>
                                <TransitionWrap>
                                    <div dangerouslySetInnerHTML={{ __html: textHtml }} className="text-styling">
                                    </div>
                                </TransitionWrap>
                            </section>
                        </article>
                    </Container>
                </div>
            </div>

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
            heroImage {
                fluid(maxWidth: 1080, resizingBehavior: SCALE) {
                    ...GatsbyContentfulFluid_tracedSVG
                }
            }
            gallery {
                id
                title
                fluid(maxWidth: 1880, resizingBehavior: SCALE) {
                    ...GatsbyContentfulFluid_tracedSVG
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

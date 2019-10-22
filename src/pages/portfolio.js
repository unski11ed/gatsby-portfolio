import React, { forwardRef, useRef, useContext } from 'react';
import PropTypes from 'prop-types';
import { graphql, navigate } from 'gatsby';
import MediaQuery from 'react-responsive';
import {
    isFunction,
    get,
    map,
    isEmpty,
    startCase,
    orderBy,
} from 'lodash';
import anime from 'animejs';
import classNames from 'classnames';

import Container from './../components/container';
import Grid from './../components/grid';
import GridItem from './../components/gridItem';
import ContentfulImage from './../components/contentfulImage';
import ContentfulVideo from './../components/contentfulVideo';
import Image from './../components/image';
import ShortDescription from './../components/shortDescription';
import Icon from './../components/icon';
import TechIcon from './../components/techIcon';
import TransitionWrap from './../components/transitionWrap';
import TextBlock from './../components/textBlock';
import IntersectionObserver from './../components/intersectionObserver';
import { tagColors } from './../common/consts';
import { getContentEntryBySlug } from './../common/helpers';

import LayoutContext from './../layouts/layoutContext';

import classes from './portfolio.module.scss';

const CHILD_FADE_DURATION = 200; //ms

const PortfolioItem = forwardRef(
    function PortfolioItem(
        {
            data,
            isActive,
            className,
            ...otherProps
        },
        refCallback
    ) {
        const itemRef = useRef();
        const layoutContext = useContext(LayoutContext);

        const clickHandler = async (targetUrl) => {
            // Disable Page Transition Animation
            layoutContext.toggleTransitionAnimations(false);

            // Hide all of the Children sequentially
            const itemsAnimPromises = Array
                .from(itemRef.current.children)
                .map((childElement, index) => {
                    return anime({
                        targets: childElement,
                        opacity: 0,
                        easing: 'easeInOutQuad',
                        delay: index * CHILD_FADE_DURATION * 0.5,
                        duration: CHILD_FADE_DURATION
                    }).finished;
                });
            await Promise.all(itemsAnimPromises);

            // Get Current Item position
            const itemRect = itemRef.current.getBoundingClientRect();
            // Setup Item Style Before animation
            Object.assign(itemRef.current.style, {
                left: `${itemRect.left}px`,
                top: `${itemRect.top}px`,
                width: `${itemRect.right - itemRect.left}px`,
                height: `${itemRect.bottom - itemRect.top}px`,
                zIndex: 100,
                position: 'fixed',
            })
            // Animate the Item to Fullscreen
            await anime({
                targets: itemRef.current,
                top: 0,
                left: 0,
                width: typeof window !== 'undefined' ? window.innerWidth : 0,
                height: typeof window !== 'undefined' ? window.innerHeight : 0,
                easing: 'spring(1, 80, 100, 10)',
                complete: () => {
                    // When animation complete - redirect to target element
                    navigate(targetUrl);

                    // After navigation completes - reenable animations
                    // layoutContext.toggleTransitionAnimations(true);
                }
            }).finished;
        }

        const innerContent = (
            <React.Fragment>
                {
                    isEmpty(data.heroVideo) ? (
                        <ContentfulImage imageData={ get(data, 'heroImage.fluid') }>
                        {
                            (imageSrcs) => (
                                <Image
                                    { ...imageSrcs }
                                    wrapClassName={ classes['portfolio-item__image-wrap'] }
                                    className={ classes['portfolio-item__image'] }
                                />
                            )
                        }
                        </ContentfulImage>
                    ) : (
                        <ContentfulVideo
                            videoData={ get(data, 'heroVideo') }
                            placeholderImage={ get(data, 'heroImage.fluid') }
                            showControls={ false }
                            canBePlayed={ isActive }
                            className={ classes['portfolio-item__image-wrap'] }
                        />
                    )
                }
                <div className={ classes['portfolio-item__head'] }>
                    <div className={ classes['portfolio-item__title'] }>
                        { /*    Title    */ }
                        <h5 className={ classes['portfolio-item__title__header'] }>
                            { data.title }
                        </h5>

                        { /*    Dates       */ }
                        <div className={ classes['portfolio-item__title__date'] }>
                            { data.startDate } - { data.endDate ? data.endDate : 'Now' }
                        </div>
                    </div>
                    
                    { /*    Technology Icons    */ }
                    <div className={ classes['portfolio-item__stack'] }>
                        {
                            map(data.technologies, (techName, index) => (
                                <TechIcon name={ techName } key={ index } />
                            ))
                        }
                    </div>
                </div>

                { /*    Description     */ }
                <ShortDescription
                    className={ classes['portfolio-item__description'] }
                    html={ get(data, 'description.childMarkdownRemark.html') }
                />

                { /*    Tags    */ }
                {
                    data.tags && (
                        <div className={ classNames(classes['portfolio-item__tags'], 'tag-cloud') }>
                            {
                                map(data.tags, (tag) => (
                                    <div
                                        key={ tag }
                                        className={
                                            classNames(
                                                classes.techEntry,
                                                'tag-cloud__tag',
                                                'text-icon',
                                                'badge',
                                                'badge--small',
                                                'badge--bg-alt'
                                            ) 
                                        }
                                    >
                                        <Icon glyph="circle" className={`bg-${tagColors[tag]}`} />

                                        <span>{ startCase(tag) }</span>
                                    </div>
                                ))
                            }
                        </div>
                    )
                }
            </React.Fragment>
        );

        return (
            <div
                className={ classNames(classes['portfolio-item'], className, 'portfolio-post-bg') }
                ref={ (ref) => {
                    itemRef.current = ref;

                    if (isFunction(refCallback)) {
                        refCallback(ref);
                    }
                } }
                { ...otherProps }
            >
                {
                    data.contentless ? (
                        <div className={ classes['portfolio-item__content'] }>
                            { innerContent }
                        </div>
                    ) : (
                        <a
                            className={ classes['portfolio-item__content'] }
                            onClick={(e) => {
                                e.preventDefault();

                                this.clickHandler(`/portfolio-entry/${data.slug}/`);

                                return false;
                            }}
                            href={ `/portfolio-entry/${data.slug}/` }
                        >
                            { innerContent }
                        </a>
                    )
                }

                { /*    Actions     */ }
                <div className={ classes['portfolio-item__actions'] }>
                    {
                        data.links.gitHub &&
                            <a href={ data.links.gitHub } target="_blank" rel="noopener noreferrer">
                                Source <Icon glyph="github"/>
                            </a>
                    }
                    {
                        data.links.live &&
                            <a href={ data.links.live } target="_blank" rel="noopener noreferrer">
                                Live Demo <Icon glyph="play"/>
                            </a>
                    }
                    {
                        data.links.codePen &&
                            <a href={ data.links.codePen } target="_blank" rel="noopener noreferrer">
                                CodePen <Icon glyph="codepen"/>
                            </a>
                    }
                    {
                        data.links.codeSandbox &&
                            <a href={ data.links.codeSandbox } target="_blank" rel="noopener noreferrer">
                                CodeSandbox <Icon glyph="codesandbox"/>
                            </a>
                    }
                </div>
            </div>
        );
    });
PortfolioItem.propTypes = {
    data: PropTypes.object.isRequired,
    isActive: PropTypes.bool.isRequired,
    className: PropTypes.string,
    ref: PropTypes.func,
};

class Portfolio extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            hoveredItemId: null,
            visibleItemId: null,
        };
    }

    render() {
        const projects = get(this.props, 'data.allContentfulPortfolioProject.edges');
        const orderedProjects = orderBy(projects, [(project, index) => !project.node.endDate ? 1: 0], ['desc']);

        const textContent = get(this.props, 'data.allContentfulContentEntry.edges');
        const headEntry = getContentEntryBySlug(textContent, 'portfolio-head');
        console.log(this.state.visibleItemId);
        return (
            <Container className="page-wrap">
                <header className={ classes['heading'] }>
                    <h1>Portfolio</h1>
                    <TextBlock
                        htmlContent={ get(headEntry, 'content.childContentfulRichText.html') }
                    />
                </header>

                <MediaQuery maxWidth="659px">
                {
                    (phoneMatches) => (
                        <Grid className={{ [classes['portfolio-items--highlight']]: this.state.hoveredItemId !== null }}>
                            {
                                map(orderedProjects, (project) => (
                                    <TransitionWrap key={ project.node.id }>
                                        <GridItem
                                            onMouseEnter={ () => { this.setState({ hoveredItemId: project.node.id }) } }
                                            onMouseLeave={ () => { this.setState({ hoveredItemId: null }) } }
                                        >
                                            <IntersectionObserver
                                                enabled={ !!phoneMatches }
                                                options={{
                                                    threshold: 0.85
                                                }}
                                                onIntersectionEnter={ () => {
                                                    this.setState({ visibleItemId: project.node.id });
                                                } }
                                                onIntersectionLeave={ () => {
                                                    if (this.state.visibleItemId === project.node.id) {
                                                        this.setState({ visibleItemId: null });
                                                    }
                                                } }
                                            >
                                                <PortfolioItem
                                                    data={ project.node }
                                                    isActive={
                                                        phoneMatches ? 
                                                            this.state.visibleItemId === project.node.id :
                                                            this.state.hoveredItemId === project.node.id
                                                    }
                                                    className={{ [classes['portfolio-item--highlighted']]: this.state.hoveredItemId === project.node.id }}
                                                />
                                            </IntersectionObserver>
                                            
                                        </GridItem>
                                    </TransitionWrap>
                                ))
                            }
                        </Grid>
                    )
                }
                </MediaQuery>
            </Container>
        );
    }
}

export default Portfolio;

export const pageQuery = graphql`
    query ProjectsIndexQuery {
        allContentfulPortfolioProject(sort: { fields: [endDate], order: DESC }, filter: { node_locale: {eq: "en-US"} }) {
            edges {
                node {
                    id
                    title
                    slug
                    node_locale
                    publishDate(formatString: "MMMM Do, YYYY")
                    technologies
                    tags
                    links {
                        gitHub
                        codePen
                        codeSandbox
                        live
                    }
                    startDate(formatString: "MMM YYYY")
                    endDate(formatString: "MMM YYYY")
                    heroImage {
                        fluid(maxWidth: 1080, resizingBehavior: SCALE) {
                            ...GatsbyContentfulFluid_tracedSVG
                        }
                    },
                    heroVideo {
                        file {
                            url
                        }
                    }
                    description {
                        childMarkdownRemark {
                            html
                        }
                    }
                    contentless
                }
            }
        }
        allContentfulContentEntry(filter: { node_locale: {eq: "en-US"}, group: {eq: "portfolio"} }) {
            edges {
                node {
                    id
                    title
                    slug
                    group
                    content {
                        childContentfulRichText {
                            html
                        }
                    }
                    node_locale
                }
            }
        }
    }`
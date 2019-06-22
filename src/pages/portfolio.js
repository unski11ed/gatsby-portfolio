import React from 'react';
import PropTypes from 'prop-types';
import { graphql, navigate } from 'gatsby';
import { get, map, isEmpty, startCase } from 'lodash';
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
import { tagColors } from './../common/consts';

import LayoutContext from './../layouts/layoutContext';

import classes from './portfolio.module.scss';

const CHILD_FADE_DURATION = 200; //ms

class PortfolioItem extends React.Component {
    static contextType = LayoutContext;

    constructor(props) {
        super(props);

        this.itemRef = React.createRef();
        this.titleRef = React.createRef();
    }

    async clickHandler(targetUrl) {
        // Disable Page Transition Animation
        this.context.toggleTransitionAnimations(false);

        // Hide all of the Children sequentially
        const itemsAnimPromises = Array
            .from(this.itemRef.current.children)
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
        const itemRect = this.itemRef.current.getBoundingClientRect();
        // Setup Item Style Before animation
        Object.assign(this.itemRef.current.style, {
            left: `${itemRect.left}px`,
            top: `${itemRect.top}px`,
            width: `${itemRect.right - itemRect.left}px`,
            height: `${itemRect.bottom - itemRect.top}px`,
            zIndex: 100,
            position: 'fixed',
        })
        // Animate the Item to Fullscreen
        await anime({
            targets: this.itemRef.current,
            top: 0,
            left: 0,
            width: typeof window !== 'undefined' ? window.innerWidth : 0,
            height: typeof window !== 'undefined' ? window.innerHeight : 0,
            easing: 'spring(1, 80, 100, 10)',
            complete: () => {
                // When animation complete - redirect to target element
                navigate(targetUrl);

                // After navigation completes - reenable animations
                //this.context.toggleTransitionAnimations(true);
            }
        }).finished;
    }

    componentDidMount() {
        console.log(window.history);
    }

    render() {
        const { data, isActive, className, ...otherProps } = this.props;

        return (
            <a
                className={ classNames(classes.portfolioItem, className, 'portfolio-post-bg') }
                onClick={(e) => {
                    e.preventDefault();

                    this.clickHandler(`/portfolio-entry/${data.slug}/`);

                    return false;
                }}
                href={ `/portfolio-entry/${data.slug}/` }
                ref={ this.itemRef }
                { ...otherProps }
            >
                {
                    isEmpty(data.heroVideo) ? (
                        <ContentfulImage imageData={ get(data, 'heroImage.fluid') }>
                        {
                            (imageSrcs) => (
                                <Image
                                    { ...imageSrcs }
                                    wrapClassName={ classes.portfolioItemImageWrap }
                                    className={ classes.portfolioItemImage }
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
                            className={ classes.portfolioItemImageWrap }
                        />
                    )
                }
                { /*    Title    */ }
                <h5
                    className={ classes.portfolioItemTitle }
                >
                    { data.title }
                </h5>

                { /*    Dates       */ }
                <div className={ classes.portfolioItemDate }>
                    { data.startDate } - { data.endDate ? data.endDate : 'Now' }
                </div>

                { /*    Technology Icons    */ }
                <div className={ classes.portfolioItemStack }>
                    {
                        map(data.technologies, (techName, index) => (
                            <TechIcon name={ techName } key={ index } />
                        ))
                    }
                </div>

                { /*    Description     */ }
                <ShortDescription
                    className={ classes.portfolioItemDescription }
                    html={ get(data, 'description.childMarkdownRemark.html') }
                />

                { /*    Tags    */ }
                {
                    data.tags && (
                        <div className={ classNames(classes.portfolioItemTags, 'tag-cloud') }>
                            {
                                map(data.tags, (tag) => (
                                    <div
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
            </a>
        );
    }   
}
PortfolioItem.propTypes = {
    data: PropTypes.object.isRequired,
    isActive: PropTypes.bool.isRequired,
    className: PropTypes.string,
}

class Portfolio extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            hoveredItemId: null
        };
    }

    render() {
        const projects = get(this.props, 'data.allContentfulPortfolioProject.edges');
        console.log(projects);
        
        return (
            <Container>
                <Grid className={{ [classes.portfolioItemsHighlight]: this.state.hoveredItemId !== null }}>
                    {
                        map(projects, (project) => (
                            <TransitionWrap key={ project.node.id }>
                                <GridItem
                                    onMouseEnter={ () => { this.setState({ hoveredItemId: project.node.id }) } }
                                    onMouseLeave={ () => { this.setState({ hoveredItemId: null }) } }
                                >
                                    <PortfolioItem
                                        data={ project.node }
                                        isActive={ this.state.hoveredItemId === project.node.id }
                                        className={{ [classes.portfolioItemHighlighted]: this.state.hoveredItemId === project.node.id }}
                                    />
                                </GridItem>
                            </TransitionWrap>
                        ))
                    }
                </Grid>
            </Container>
        );
    }
}

export default Portfolio;

export const pageQuery = graphql`
    query ProjectsIndexQuery {
        allContentfulPortfolioProject(sort: { fields: [publishDate], order: DESC }, filter: { node_locale: {eq: "en-US"} }) {
            edges {
                node {
                    id
                    title
                    slug
                    node_locale
                    publishDate(formatString: "MMMM Do, YYYY")
                    technologies
                    tags
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
                }
            }
        }
    }`
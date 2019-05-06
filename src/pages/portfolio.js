import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import { get, map } from 'lodash';
import anime from 'animejs';

import Container from './../components/container';
import Grid from './../components/grid';
import GridItem from './../components/gridItem';
import ContentfulImage from './../components/contentfulImage';
import Image from './../components/image';
import ShortDescription from './../components/shortDescription';
import TechIcon from './../components/techIcon';

import classes from './portfolio.module.scss';

const CHILD_FADE_DURATION = 200; //ms

class PortfolioItem extends React.Component {
    constructor(props) {
        super(props);

        this.itemRef = React.createRef();
        this.titleRef = React.createRef();
    }

    async clickHandler() {
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
            easing: 'spring(1, 80, 100, 10)'
        }).finished;
    }

    render() {
        const { data } = this.props;

        return (
            <div
                className={ classes.portfolioItem }
                onClick={ this.clickHandler.bind(this) }
                ref={ this.itemRef }
            >
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
                <h5
                    className={ classes.portfolioItemTitle }
                >
                    { data.title }
                </h5>
                <div className={ classes.portfolioItemBody }>
                    <ShortDescription
                        className={ classes.portfolioItemDescription }
                        html={ get(data, 'description.childMarkdownRemark.html') }
                    />

                    <div className={ classes.portfolioItemStack }>
                        {
                            map(data.technologies, (techName, index) => (
                                <TechIcon name={ techName } key={ index } />
                            ))
                        }
                    </div>
                </div>
            </div>
        );
    }   
}
PortfolioItem.propTypes = {
    data: PropTypes.object.isRequired,
}

class Portfolio extends React.Component {
    render() {
        const projects = get(this.props, 'data.allContentfulPortfolioProject.edges');
        console.log(projects)
        return (
            <Container>
                <Grid>
                    {
                        map(projects, (project) => (
                            <GridItem key={ project.node.id }>
                                <PortfolioItem data={ project.node } />
                            </GridItem>
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
                    heroImage {
                        fluid(maxWidth: 1080, resizingBehavior: SCALE) {
                            ...GatsbyContentfulFluid_tracedSVG
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
import React from 'react';
import classNames from 'classnames';
import anime from 'animejs';
import { Link, graphql } from 'gatsby';

import TransitionWrap from './../components/transitionWrap';
import LayoutConext from './../layouts/layoutContext';
import { entryAnimationConfig } from './../common/transitionAnimations';

import classes from './portfolio-entry.module.scss';

class PortfolioEntry extends React.Component {
    static contextType = LayoutConext;

    constructor(props) {
        super(props);

        this.containerRef = React.createRef();
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
        return (
            <div className={ classNames(classes.portfolioEntry, 'portfolio-post-bg') } ref={ this.containerRef }>
                <Link to="/portfolio">
                    Close
                </Link>
                <TransitionWrap>
                    <span>Chuj</span>
                </TransitionWrap>
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
            startDate(formatString: "MMMM Do, YYYY")
            endDate(formatString: "MMMM Do, YYYY")
            gallery {
                id
                title
                fluid(maxWidth: 1920, resizingBehavior: SCALE) {
                    ...GatsbyContentfulFluid_tracedSVG
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
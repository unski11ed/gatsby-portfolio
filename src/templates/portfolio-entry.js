import React from 'react';
import anime from 'animejs';
import { get } from 'lodash';
import { graphql } from 'gatsby';
import Media from 'react-responsive';
import Helmet from 'react-helmet';

import Overlay from './../components/overaly';

import LayoutConext from './../layouts/layoutContext';
import { entryAnimationConfig } from './../common/transitionAnimations';

import PortfolioEntryLarge from './../components/portfolioEntryLarge';
import PortfolioEntrySmall from './../components/portfolioEntrySmall';

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
        if (!this.containerRef.current && elementRef && elementRef !== this.containerRef) {
            this.containerRef.current = elementRef;
            const containerElement = this.containerRef.current;
            const transitionWrapElements = containerElement.querySelectorAll('.transition-element');

            anime({
                ...entryAnimationConfig({
                    staggerDelay: 100,
                    duration: 400,
                }),
                targets: transitionWrapElements,
            });
        }
    }

    componentDidMount() {
        this.context.toggleTransitionAnimations(true);
    }

    render() {
        const item = get(this.props, 'data.contentfulPortfolioProject');

        return (
            <>
                <Helmet>
                    <title>Project - { item.title } | mkurban.dev</title>
                    <meta name="robots" content="noindex"></meta>
                </Helmet>

                <Overlay>
                    <Media query="(max-width: 767px)">
                    {
                        (smallMatches) => !!smallMatches ?
                            <PortfolioEntrySmall
                                data={ item }
                                prevPathName={ this.context.prevPathName }
                                ref={ this.animateContentEntry.bind(this) }
                            /> :
                            <PortfolioEntryLarge
                                data={ item }
                                prevPathName={ this.context.prevPathName }
                                ref={ this.animateContentEntry.bind(this) }
                            />
                    }
                    </Media>
                </Overlay>
            </>
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
                fluid(maxWidth: 1880, resizingBehavior: SCALE, quality: 100) {
                    ...GatsbyContentfulFluid_withWebp
                }
                file {
                    url
                }
            }
            galleryPhone {
                id
                title
                fluid(maxWidth: 1052, resizingBehavior: SCALE, quality: 100) {
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

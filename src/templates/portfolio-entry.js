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

export const query = graphql`
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
                gatsbyImageData(width: 1080)
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
                gatsbyImageData(width: 1880)
                file {
                    url,
                    contentType
                }
            }
            galleryPhone {
                id
                title
                gatsbyImageData(width: 1052)
                file {
                    url
                    contentType
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

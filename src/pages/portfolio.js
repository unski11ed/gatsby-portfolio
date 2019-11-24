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
import Overlay from './../components/overaly';
import { tagColors } from './../common/consts';
import { getContentEntryBySlug } from './../common/helpers';

import LayoutContext from './../layouts/layoutContext';

import classes from './portfolio.module.scss';

const PortfolioItem = forwardRef(
    function PortfolioItem(
        {
            data,
            isActive,
            className,
            transitionMaskElement,
            ...otherProps
        },
        refCallback
    ) {
        const itemRef = useRef();
        const transitionMaskRef = useRef();
        const layoutContext = useContext(LayoutContext);

        const clickHandler = async (targetUrl) => {
            const outAnimation = anime({
                targets: itemRef.current,
                scale: 1.4,
                opacity: [1, 0],
                easing: 'easeInQuad',
                duration: 400,
            }).finished;
            
            const inAnimation = anime({
                delay: 400,
                targets: transitionMaskElement,
                scale: [0.5, 1],
                opacity: [0, 1],
                easing: 'easeOutQuad',
                duration: 300,
                begin: () => {
                    transitionMaskElement.style.display = 'block';
                }
            }).finished;

            await Promise.all([outAnimation, inAnimation]);

            navigate(targetUrl);
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
                                        <Icon glyph="circle" className={`text-${tagColors[tag]}`} />

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

                                clickHandler(`/portfolio-entry/${data.slug}/`);

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
                            <a href={ data.links.gitHub }  target="_blank" rel="noopener noreferrer">
                                Source <Icon glyph="github"/>
                            </a>
                    }
                    {
                        data.links.live &&
                            <a href={ data.links.live } target="_blank" rel="noopener noreferrer">
                                Demo <Icon glyph="play"/>
                            </a>
                    }
                    {
                        data.links.codePen &&
                            <a href={ data.links.codePen } target="_blank" rel="noopener noreferrer">
                                CodePen <Icon glyph="codepen"/>
                            </a>
                    }
                    {
                        // There is no CodeSandbox icon at the moment in FontAwesome, so ....
                        // let's treat it as CodePen ;P
                        data.links.codeSandbox &&
                            <a href={ data.links.codeSandbox } target="_blank" rel="noopener noreferrer">
                                CodePen <Icon glyph="codepen"/>
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
    transitionMaskElement: PropTypes.object,
    ref: PropTypes.func,
};

class Portfolio extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            hoveredItemId: null,
            visibleItemId: null,
        };
        this.transitionMaskRef = React.createRef();
    }

    render() {
        const projects = get(this.props, 'data.allContentfulPortfolioProject.edges');
        const orderedProjects = orderBy(projects, [(project, index) => !project.node.endDate ? 1: 0], ['desc']);

        const textContent = get(this.props, 'data.allContentfulContentEntry.edges');
        const headEntry = getContentEntryBySlug(textContent, 'portfolio-head');

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
                                                    transitionMaskElement={ this.transitionMaskRef.current }
                                                    className={ classNames({
                                                        [classes['portfolio-item--highlighted']]: !phoneMatches && this.state.hoveredItemId === project.node.id
                                                    }) }
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

                <Overlay>
                    <div
                        className={ classes['transition-mask'] }
                        ref={(ref) => {
                            if (!this.transitionMaskRef.current) {
                                this.transitionMaskRef.current = ref;
                                this.forceUpdate();
                            }
                        }}
                    />
                </Overlay>
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
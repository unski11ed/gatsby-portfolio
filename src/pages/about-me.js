import React from 'react';
import cn from 'classnames';
import { graphql } from 'gatsby';
import { get, map, pipe, keys } from 'lodash/fp';
import MediaQuery from 'react-responsive';
import Helmet from 'react-helmet';
import { renderRichText } from 'gatsby-source-contentful/rich-text';

import TransitionWrap from './../components/transitionWrap';

import classes from './about-me.module.scss';

import TextBlock from './../components/textBlock';
import ContentfulImage from './../components/contentfulImage';
import Image from './../components/image';
import TechIcon from './../components/techIcon';
import Icon from './../components/icon';

const contactToIcon = (key) => {
    switch (key) {
        case 'linkedIn':
            return 'linkedin-in';
        case 'mail':
            return 'envelope';
        case 'messenger':
            return 'facebook-messenger';
        case 'phone':
            return 'phone';
        case 'github':
            return 'github';
        case 'skype':
            return 'skype';
        default:
            return '';
    }
}

class AboutMe extends React.Component {
    render() {
        const data = get('data.allContentfulAboutMe.edges[0].node')(this.props);
        const bioContent = get('bio')(data);
        const contact = get('contactInfo')(data);
        const photoDesktop = get('photoDesktop')(data);
        const photoMobile = get('photoMobile')(data);
        const stackItems = get('stack')(data);
        const title = get('title')(data);
        const subTitle = get('subTitle')(data);

        return (
            <>
                <Helmet>
                    <title>About Me | mkurban.dev</title>
                </Helmet>
                <MediaQuery query="(max-width: 759px)">
                {
                    (phoneMatches) => (
                        <div className={ classes['about-me-wrap'] }>
                            <div className={ classes['about-me'] }>
                                <TransitionWrap>
                                    <div className={ classes['about-me__photo'] }>
                                        <ContentfulImage imageData={ !!phoneMatches ? photoMobile : photoDesktop }>
                                            {
                                                (imageSrcs) => (
                                                    <Image { ...imageSrcs } alt='Photo' />
                                                )
                                            }
                                        </ContentfulImage>
                                    </div>
                                </TransitionWrap>
                                <TransitionWrap>
                                    <header className={ cn(classes['about-me__header'], classes['header']) }>
                                        <h1 className={ cn(classes['header__title']) }>
                                            { title }
                                        </h1>
                                        <p className={ classes['header__subtitle'] }>
                                            { subTitle }
                                        </p>
                                        <div className={ classes['header__stack'] }>
                                            {
                                                map(stackItem => (
                                                    <TechIcon name={ stackItem } key={ stackItem } />
                                                ))(stackItems)
                                            }
                                        </div>
                                    </header>
                                </TransitionWrap>
                                <TransitionWrap>
                                    <div className={ classes['about-me__contact'] }>
                                        {
                                            pipe(
                                                keys,
                                                map(key => {
                                                    const {
                                                        userName,
                                                        url,
                                                    } = contact[key];
                                                    const innerContent = (
                                                        <>
                                                            <Icon glyph={ contactToIcon(key) } fixedWidth />
                                                            <span className={ classes['contact__username'] }>
                                                                { userName }
                                                            </span>
                                                        </>
                                                    );
                                                    return url ? (
                                                        <a 
                                                            className={ classes['contact'] }
                                                            key={ key }
                                                            href={ url }
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                        >
                                                            { innerContent }
                                                        </a>
                                                    ) : (
                                                        <div className={ classes['contact'] } key={ key }>
                                                            { innerContent }
                                                        </div>
                                                    );
                                                })
                                            )(contact)
                                        }
                                    </div>
                                </TransitionWrap>
                                <TransitionWrap>
                                    <section className={ classes['about-me__bio'] }>
                                        <TextBlock>
                                            { renderRichText(bioContent) }
                                        </TextBlock>
                                    </section>
                                </TransitionWrap>
                                
                            </div>
                        </div>
                    )
                }
                </MediaQuery>
            </>
        );
    }
}

export default AboutMe;

export const query = graphql`
    query PortfolioAboutMe {
        allContentfulAboutMe(filter: { node_locale: {eq: "en-US"} }) {
            edges {
                node {
                    title
                    subTitle
                    stack
                    photoDesktop {
                        id
                        gatsbyImageData(width: 440, quality: 100)
                    }
                    photoMobile {
                        id
                        gatsbyImageData(width: 440, quality: 100)
                    }
                    contactInfo {
                        mail {
                            userName
                        }
                        github {
                            url
                            userName
                        }
                        linkedIn {
                            url
                            userName
                        }
                        messenger {
                            url
                            userName
                        }
                    }
                    bio {
                        raw
                    }
                }
            }
        }
    }
`;

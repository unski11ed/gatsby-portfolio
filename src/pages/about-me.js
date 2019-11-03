import React from 'react';
import cn from 'classnames';
import { get, map, chain } from 'lodash';
import MediaQuery from 'react-responsive';

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
        default:
            return '';
    }
}

class AboutMe extends React.Component {
    render() {
        const data = get(this.props, 'data.allContentfulAboutMe.edges[0].node');
        const bioContent = get(data, 'bio.childContentfulRichText.html');
        const contact = get(data, 'contactInfo');
        const photoDesktop = get(data, 'photoDesktop.fluid');
        const photoMobile = get(data, 'photoMobile.fluid');
        const stackItems = get(data, 'stack');
        const title = get(data, 'title');
        const subTitle = get(data, 'subTitle');

        return (
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
                                            map(stackItems, stackItem => (
                                                <TechIcon name={ stackItem } key={ stackItem } />
                                            ))
                                        }
                                    </div>
                                </header>
                            </TransitionWrap>
                            <TransitionWrap>
                                <div className={ classes['about-me__contact'] }>
                                    {
                                        chain(contact)
                                            .keys()
                                            .map(key => {
                                                return (
                                                    <div className={ classes['contact'] } key={ key }>
                                                        <Icon glyph={ contactToIcon(key) } />
                                                        <span className={ classes['contact__username'] }>
                                                            { contact[key].userName }
                                                        </span>
                                                    </div>
                                                );
                                            })
                                            .value()
                                    }
                                </div>
                            </TransitionWrap>
                            <TransitionWrap>
                                <section className={ classes['about-me__bio'] }>
                                    <TextBlock htmlContent={ bioContent } />
                                </section>
                            </TransitionWrap>
                            
                        </div>
                    </div>
                )
            }
            </MediaQuery>
        );
    }
}

export default AboutMe;

export const pageQuery = graphql`
    query PortfolioAboutMe {
        allContentfulAboutMe(filter: { node_locale: {eq: "en-US"} }) {
            edges {
                node {
                    title
                    subTitle
                    stack
                    photoDesktop {
                        id
                        fluid(maxWidth: 440, quality: 100) {
                            ...GatsbyContentfulFluid_withWebp
                        }
                    }
                    photoMobile {
                        id
                        fluid(maxWidth: 440, quality: 100) {
                            ...GatsbyContentfulFluid_withWebp
                        }
                    }
                    contactInfo {
                        mail {
                            userName
                        }
                        phone {
                            userName
                        }
                        github {
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
                        childContentfulRichText {
                            html
                        }
                    }
                }
            }
        }
    }
`;

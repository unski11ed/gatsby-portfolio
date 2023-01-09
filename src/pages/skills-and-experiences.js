import React from 'react';
import classNames from 'classnames';
import { graphql } from 'gatsby';
import { get } from 'lodash';
import MediaQuery from 'react-responsive';
import Helmet from 'react-helmet';
import { renderRichText } from 'gatsby-source-contentful/rich-text';

import { getContentEntryBySlug } from './../common/helpers';

import Container from './../components/container';
import TransitionWrap from './../components/transitionWrap';
import TextNavigation from './../components/textNavigation';
import TextNavigationNavigator from './../components/textNavigationNavigator';
import TextNavigationTextWrap from './../components/textNavigationTextWrap';
import TextBlock from './../components/textBlock';
import Timeline from './../components/timeline';
import Footer from './../components/footer';

import classes from './skills-and-experiences.module.scss';

class SkillsAndExperiences extends React.Component {
    render() {
        const data = get(this.props, 'data.allContentfulContentEntry.edges');
        const skills = getContentEntryBySlug(data, 'skills');
        const timelineHobbystic = getContentEntryBySlug(data, 'timeline-hobbystic');
        const timelineCommercial = getContentEntryBySlug(data, 'timeline-commercial');
        const timelineAdvanced = getContentEntryBySlug(data, 'timeline-advanced');
        const footerContent = getContentEntryBySlug(data, 'skills-and-experiences-footer');

        return (
            <>
                <Helmet>
                    <title>Skills &amp; Experiences | mkurban.dev</title>
                </Helmet>
                <MediaQuery maxWidth='819px'>
                {
                    (matches) => (
                        <Container className={ classNames("page-wrap", classes.template) }>
                            <TextNavigation>
                                {
                                    !matches && (
                                        <TransitionWrap>
                                            <nav className={ classes.navigation }>
                                                <TextNavigationNavigator/>
                                            </nav>
                                        </TransitionWrap>
                                    )
                                }
                                <TransitionWrap>
                                    <TextNavigationTextWrap>
                                        <article className={ classNames("text-styling", classes.content) }>
                                            <h1>Skills</h1>

                                            <section>
                                                { renderRichText(skills.content) }
                                            </section>

                                            <h1>Experiences</h1>

                                            <Timeline tag="section">
                                                <Timeline.Section year="2001">
                                                    <TextBlock>
                                                        { renderRichText(timelineHobbystic.content) }
                                                    </TextBlock>
                                                </Timeline.Section>
                                                <Timeline.Section year="2013">
                                                    <TextBlock>
                                                        { renderRichText(timelineCommercial.content) }
                                                    </TextBlock>
                                                </Timeline.Section>
                                                <Timeline.Section year="2014">
                                                    <TextBlock>
                                                        { renderRichText(timelineAdvanced.content) }
                                                    </TextBlock>
                                                </Timeline.Section>
                                            </Timeline>
                                        </article>
                                    </TextNavigationTextWrap>
                                </TransitionWrap>
                            </TextNavigation>

                            <Footer className={ classes['footer'] }>
                                { renderRichText(footerContent.content) }
                            </Footer>
                        </Container>
                    )
                }
                </MediaQuery>
            </>
        );
    }
}

export default SkillsAndExperiences;

export const query = graphql`
    query SkillsAndExperiencesQuery {
        allContentfulContentEntry(filter: { node_locale: {eq: "en-US"}, group: {eq: "skills-and-experiences"} }) {
            edges {
                node {
                    id
                    title
                    slug
                    group
                    content {
                        raw
                    }
                    node_locale
                }
            }
        }
    }`

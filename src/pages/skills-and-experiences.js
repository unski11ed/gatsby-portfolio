import React from 'react';
import classNames from 'classnames';
import { get } from 'lodash';
import MediaQuery from 'react-responsive';

import { getContentEntryBySlug } from './../common/helpers';

import Container from './../components/container';
import TransitionWrap from './../components/transitionWrap';
import TextNavigation from './../components/textNavigation';
import TextNavigationNavigator from './../components/textNavigationNavigator';
import TextNavigationTextWrap from './../components/textNavigationTextWrap';
import Timeline from './../components/timeline';

import classes from './skills-and-experiences.module.scss';

class SkillsAndExperiences extends React.Component {
    render() {
        const data = get(this.props, 'data.allContentfulContentEntry.edges');
        const skills = getContentEntryBySlug(data, 'skills');
        const timelineHobbystic = getContentEntryBySlug(data, 'timeline-hobbystic');
        const timelineCommercial = getContentEntryBySlug(data, 'timeline-commercial');
        const timelineAdvanced = getContentEntryBySlug(data, 'timeline-advanced');

        return (
            <MediaQuery maxWidth='819px'>
            {
                (matches) => (
                    <Container className={ classNames("page-wrap", classes.template) }>
                        <TextNavigation>
                            <TransitionWrap>
                                <nav className={ classes.navigation }>
                                    <TextNavigationNavigator collapsible={ !!matches }/>
                                </nav>
                            </TransitionWrap>
                            <TransitionWrap>
                                <TextNavigationTextWrap>
                                    <article className={ classNames("text-styling", classes.content) }>
                                        <h1>Skills</h1>

                                        <section dangerouslySetInnerHTML={{ __html: get(skills, 'content.childContentfulRichText.html') }} />

                                        <h1>Experiences</h1>

                                        <Timeline tag="section">
                                            <Timeline.Section>
                                                <Timeline.Label>2001</Timeline.Label>
                                                <div dangerouslySetInnerHTML={{ __html: get(timelineHobbystic, 'content.childContentfulRichText.html') }}></div>
                                            </Timeline.Section>
                                            <Timeline.Section>
                                                <Timeline.Label>2013</Timeline.Label>
                                                <div dangerouslySetInnerHTML={{ __html: get(timelineCommercial, 'content.childContentfulRichText.html') }}></div>
                                            </Timeline.Section>
                                            <Timeline.Section>
                                                <Timeline.Label>2016</Timeline.Label>
                                                <div dangerouslySetInnerHTML={{ __html: get(timelineAdvanced, 'content.childContentfulRichText.html') }}></div>
                                            </Timeline.Section>
                                        </Timeline>
                                    </article>
                                </TextNavigationTextWrap>
                            </TransitionWrap>
                        </TextNavigation>
                    </Container>
                )
            }
            </MediaQuery>
        );
    }
}

export default SkillsAndExperiences;

export const pageQuery = graphql`
    query SkillsAndExperiencesQuery {
        allContentfulContentEntry(filter: { node_locale: {eq: "en-US"}, group: {eq: "skills-and-experiences"} }) {
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

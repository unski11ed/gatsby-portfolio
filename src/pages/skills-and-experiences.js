import React from 'react';
import classNames from 'classnames';
import { get, find } from 'lodash';

import { getContentEntryBySlug } from './../common/helpers';

import Container from './../components/container';
import TransitionWrap from './../components/transitionWrap';

import classes from './skills-and-experiences.module.scss';

class SkillsAndExperiences extends React.Component {
    render() {
        const data = get(this.props, 'data.allContentfulContentEntry.edges');
        const skills = getContentEntryBySlug(data, 'skills');
        console.log(this.props);
        console.log(get(skills, 'content.childMarkdownRemark'));
        return (
            <Container className={ classNames("page-wrap", classes.template) }>
                <TransitionWrap>
                    <div className={ classes.navigation }>
                        <div>CHuj</div>
                    </div>
                </TransitionWrap>
                <TransitionWrap>
                    <article className={ classNames("text-styling", classes.content) }>
                        <h1>Skills</h1>

                        <section dangerouslySetInnerHTML={{ __html: get(skills, 'content.childContentfulRichText.html') }} />

                        <h2>Experiences</h2>

                        <section>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed in mi turpis. Aliquam blandit a eros non facilisis. Proin laoreet libero a dui sagittis dignissim. In sed consectetur eros. Vestibulum vestibulum posuere nunc in pellentesque. Vivamus elit urna, ullamcorper ut neque vitae, eleifend semper enim. Maecenas aliquet iaculis dui, in tristique mi cursus vel. Fusce dapibus posuere eleifend.
                            </p>
                            <p>
                            Nam tellus nulla, placerat sodales risus efficitur, varius aliquam velit. Ut porta ipsum eget varius iaculis. Aliquam nisl dolor, volutpat nec sem id, congue eleifend libero. Maecenas dignissim nunc quis mauris pretium, ac posuere dolor dapibus. Nunc eleifend nisi eu mattis rutrum. In neque lorem, dictum quis semper sit amet, sodales quis sapien. Donec rutrum faucibus magna non aliquam. Donec maximus quam ante, non ornare sapien scelerisque ac.
                            </p>
                        </section>
                    </article>
                </TransitionWrap>
            </Container>
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

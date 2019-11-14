import React from 'react';
import PropTypes from 'prop-types';
import { get, map, startCase } from 'lodash';
import classNames from 'classnames';

import Icon from './icon';
import TechIcon from './techIcon';
import Button from './button';

import { tagColors } from './../common/consts';

import classes from './portfolioEntryInfoBox.module.scss';

const PortfolioEntryInfoBox = ({ data, className }) => {
    const descriptionHtml = get(data, 'description.childMarkdownRemark.html');

    return (
        <div className={ classNames(className, classes['info']) }>
            { /*    Info: Description   */}
            <div
                className={ classNames(classes['info'], classes['info--description']) }
                dangerouslySetInnerHTML={{ __html: descriptionHtml }}
            />

            { /*    Info: Date     */}
            <div className={ classes['info'] }>
                <div className={ classNames(classes['info__title'], 'text-icon') }>
                    <Icon glyph="calendar" className="text-muted" />
                    <span>Timespan</span>
                </div>
                <div className={ classes['info__content'] }>
                    { data.startDate } - { data.endDate ? data.endDate : 'Now' }
                </div>
            </div>

            { /*    Info: Tags   */}
            {
                data.tags && (
                    <div className={ classes['info'] }>
                        <div className={ classNames(classes['info__title'], 'text-icon') }>
                            <Icon glyph="tags" className="text-muted" />
                            <span>Tags</span>
                        </div>
                        <div className={ classNames(classes['info__content'], 'tag-cloud') }>
                            {
                                map(data.tags, (tag, index) => (
                                    <div
                                        key={ index }
                                        className={
                                            classNames(
                                                'tag-cloud__tag',
                                                'text-icon',
                                                'badge',
                                                'badge--bg'
                                            ) 
                                        }
                                    >
                                        <Icon glyph="circle" className={`bg-${tagColors[tag]}`} />

                                        <span>{ startCase(tag) }</span>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                )
            }

            { /*    Info: Technologies   */}
            <div className={ classes['info'] }>
                <div className={ classNames(classes['info__title'], 'text-icon') }>
                    <Icon glyph="tools" className="text-muted" />
                    <span>Technologies</span>
                </div>
                <div className={ classNames(classes['info__content'], 'tag-cloud') }>
                    {
                        map(data.technologies, (techName, index) => (
                            <div className={ classNames('tag-cloud__tag', 'text-icon', 'badge', 'badge--bg') } key={ index }>
                                <Icon>
                                    <TechIcon name={ techName } />
                                </Icon>
                                <span>{ startCase(techName) }</span>
                            </div>
                        ))
                    }
                </div>
            </div>

            { /* Links */ }
            <div className={ classes['buttons'] }>
                {
                    data.links.gitHub && (
                        <Button
                            outline
                            size="md"
                            className={ classes['button'] }
                            href={ data.links.gitHub }
                            tag="a"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            GitHub Source
                            <Icon glyph="github" className={ classes['button__icon'] } />
                        </Button>
                    )
                }
                {
                    data.links.live && (
                        <Button
                            size="md"
                            className={ classes['button'] }
                            href={ data.links.live }
                            tag="a"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Live Demo
                            <Icon glyph="play" className={ classes['button__icon'] } />
                        </Button>
                    )
                }
                {
                    data.links.codeSandbox && (
                        <Button
                            outline
                            size="md"
                            className={ classes['button'] }
                            href={ data.links.codeSandbox }
                            tag="a"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            CodeSandbox Demo
                            <Icon glyph="codesandbox" className={ classes['button__icon'] } />
                        </Button>
                    )
                }
            </div>
        </div>
    );
};
PortfolioEntryInfoBox.propTypes = {
    data: PropTypes.object.isRequired,
    className: PropTypes.string,
};

export default PortfolioEntryInfoBox;

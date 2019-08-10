import React from 'react';
import classNames from 'classnames';
import { Link } from 'gatsby';

import Button from '../components/button';
import HomeBackground from '../components/homeBackground';
import BodyPositionObserver from '../components/bodyPositionObserver';
import LayoutContext from './../layouts/layoutContext';

import classes from './index.module.scss';

import { colors } from './../common/consts';
import { getDocumentSize } from './../common/helpers';

const SLIDES = [
    {
        animation: require('./../images/home/growth.svg'),
        color: colors.primary,
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut fringilla eros mauris, ac auctor orci dapibus vulputate. Donec quis accumsan lectus. Aliquam varius velit enim, et molestie sem feugiat ac.'
    },
    {
        animation: require('./../images/home/rocket.svg'),
        color: colors.success,
        description: 'Nullam luctus sit amet nulla non dignissim. Nunc euismod elit eu risus mattis ultricies. Suspendisse potenti.',
    },
    {
        animation: require('./../images/home/heart.svg'),
        color: colors.danger,
        description: 'Vestibulum eu semper nisi, vitae porttitor enim. Nulla commodo turpis lorem, at blandit diam porta quis. Donec et eros at lectus hendrerit convallis. Ut euismod ante mauris, in varius nisl laoreet eu.'
    }
];
const SLIDE_CHANGE_INTERVAL = 10000;
const SLIDE_TRANSITION_DURATION = 1000;

class RootIndex extends React.Component {
    static contextType = LayoutContext;

    state = {
        currentSlideIndex: 0,
        lightOrigin: {
            x: 0.5,
            y: 0.5,
            width: 100,
            height: 100,
        }
    }
    changeInterval = 0;

    constructor() {
        super();

        this.nextSlide = this.nextSlide.bind(this);
        this.onAnimationColPosChanged = this.onAnimationColPosChanged.bind(this);
    }

    nextSlide() {
        this.setState({
            currentSlideIndex: (this.state.currentSlideIndex + 1) % SLIDES.length,
        })
    }

    onAnimationColPosChanged(position) {
        const docSize = getDocumentSize(document);

        this.setState({
            lightOrigin: {
                x: position.x / docSize.width,
                y: position.y / docSize.height,
                widthPx: position.width,
                heightPx: position.height
            }
        });
    }

    componentDidMount() {
        this.context.toggleNavbarTransparent(true);

        this.changeInterval = setInterval(this.nextSlide, SLIDE_CHANGE_INTERVAL);
    }

    componentWillUnmount() {
        clearInterval(this.changeInterval);

        this.context.toggleNavbarTransparent(false);
    }

    render() {
        const currentSlide = SLIDES[this.state.currentSlideIndex];

        return (
            <React.Fragment>
                <HomeBackground
                    color={ currentSlide.color }
                    className={ classes.background }
                    origin={ this.state.lightOrigin }
                    transitionDuration={ SLIDE_TRANSITION_DURATION }
                />
                <div className={ classes['homePage'] }>
                    <div
                        className={ classes['intro'] }
                        style={{
                            '--theme-color': currentSlide.color,
                            '--slide-transition-duration': `${SLIDE_TRANSITION_DURATION}ms`,
                        }}
                    >
                        <div
                            className={ classNames(classes['intro__infoCol'], classes['info']) }
                        >
                            <h1 className={ classes['info__header'] }>
                                <span>Maciej</span> <span>Kurbański</span>
                            </h1>
                            <p className={ classes['info__description'] }>
                                { currentSlide.description }
                            </p>
                            <div className={ classes['info__actions'] }>
                                <Button size="lg" tag={ Link }>
                                    View Portfolio
                                </Button>
                                <Button size="lg" color="link" tag={ Link }>
                                    Skills &amp; Experiences
                                </Button>
                            </div>
                        </div>
                        <BodyPositionObserver
                            onPositionChanged={ this.onAnimationColPosChanged }
                        >
                        {
                            ({ domRef }) => (
                                <div className={ classes['intro__animationCol'] } ref={ domRef }>
                                    <img src={ currentSlide.animation } />
                                </div>
                            )
                        }
                        </BodyPositionObserver>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default RootIndex;
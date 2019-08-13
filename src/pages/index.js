import React from 'react';
import classNames from 'classnames';
import { Flipper, Flipped } from 'react-flip-toolkit';
import { Link } from 'gatsby';
import Color from 'color';
import anime from 'animejs';

import Button from '../components/button';
import HomeBackground from '../components/homeBackground';
import BodyPositionObserver from '../components/bodyPositionObserver';
import LayoutContext from './../layouts/layoutContext';
import FadeContentSwap from './../components/fadeContentSwap';

import classes from './index.module.scss';

import { colors } from './../common/consts';
import { getDocumentSize } from './../common/helpers';

const SLIDES = [
    {
        key: "experienced",
        animation: require('./../images/home/growth.svg'),
        color: colors.primary,
        description: (
            <React.Fragment>
                <strong>Fullstack WebDeveloper</strong> with over <strong>6&nbsp;years</strong> of experience in <strong>commercial</strong> projects.
            </React.Fragment>
        )
    },
    {
        key: "productive",
        animation: require('./../images/home/rocket.svg'),
        color: colors.success,
        description: (
            <React.Fragment>
                Eager to solve <strong>complex problems</strong> with the most <strong>effective and straightforward</strong> solutions.
            </React.Fragment>
        ),
    },
    {
        key: "passionate",
        animation: require('./../images/home/heart.svg'),
        color: colors.danger,
        description: (
            <React.Fragment>
                <strong>Passionate Programmer</strong> excited about embracing <strong>cutting edge technologies</strong> with <strong>clean code</strong>!
            </React.Fragment>
        )
    }
];
const SLIDE_CHANGE_INTERVAL = 10000;
const SLIDE_TRANSITION_DURATION = 1000;

const descriptionAppearAnimation = (transitionElement) => {
    anime({
        opacity: [0, 1],
        duration: SLIDE_TRANSITION_DURATION / 2,
        targets: transitionElement,
        complete: () => {

        },
    });
};
const descriptionHideAnimation = (transitionElement, index, removeElement) => {
    anime({
        opacity: [1, 0],
        duration: SLIDE_TRANSITION_DURATION / 2,
        targets: transitionElement,
        complete: () => {
            removeElement();
        },
    });
};

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
                <div className={ classes['home-page'] }>
                    <div
                        className={ classes['intro'] }
                        style={{
                            '--theme-color': currentSlide.color,
                            '--button-color': Color(currentSlide.color).darken(0.25).hex(),
                            '--slide-transition-duration': `${SLIDE_TRANSITION_DURATION}ms`,
                        }}
                    >
                        <div
                            className={ classNames(classes['intro__info-col'], classes['info']) }
                        >
                            <h1 className={ classes['info__header'] }>
                                <span>Maciej</span> <span>Kurbański</span>
                            </h1>
                            <FadeContentSwap
                                transitionKey={ currentSlide.key }
                                duration={ SLIDE_TRANSITION_DURATION / 2 }
                                className={ classes['info__description-wrap'] }
                            >
                                <p className={ classes['info__description'] } key={ currentSlide.key }>
                                    { currentSlide.description }
                                </p>
                            </FadeContentSwap>
                            <div className={ classes['info__actions'] }>
                                <Button size="lg" tag={ Link } className={ classes['info__actions__interactive']} to="/portfolio">
                                    View Portfolio
                                </Button>
                                <Button size="lg" color="link" tag={ Link } to="/skills-and-experiences">
                                    Skills &amp; Experiences
                                </Button>
                            </div>
                        </div>
                        <div className={ classes['intro__animation-col'] }>
                            <BodyPositionObserver
                                onPositionChanged={ this.onAnimationColPosChanged }
                            >
                            {
                                ({ domRef }) => (
                                    <div className={ classes['intro__animation-wrap'] } ref={ domRef }>
                                        <img src={ currentSlide.animation } />
                                    </div>
                                )
                            }
                            </BodyPositionObserver>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default RootIndex;
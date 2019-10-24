import React from 'react';
import classNames from 'classnames';

import { Link } from 'gatsby';
import Color from 'color';
import MediaQuery from 'react-responsive';

import Button from '../components/button';
import HomeBackground from '../components/homeBackground';
import BodyPositionObserver from '../components/bodyPositionObserver';
import LayoutContext from './../layouts/layoutContext';
import ContentSwapFade from './../components/contentSwapFade';
import ContentSwapHomeIcon from './../components/contentSwapHomeIcon';
import HomeIconIdleAnimation from './../components/homeIconIdleAnimation';

import classes from './index.module.scss';

import { colors } from './../common/consts';
import { getDocumentSize, compose } from './../common/helpers';

const SLIDES = [
    {
        key: "experienced",
        animation: require('./../images/home/growth.svg'),
        themeColor: 'primary',
        description: (
            <React.Fragment>
                <strong>Fullstack WebDeveloper</strong> with over <strong>6&nbsp;years</strong> of experience in <strong>commercial</strong> projects.
            </React.Fragment>
        )
    },
    {
        key: "productive",
        animation: require('./../images/home/rocket.svg'),
        themeColor: 'success',
        description: (
            <React.Fragment>
                Solving <strong>complex problems</strong> with the most <strong>effective and straightforward</strong> solutions.
            </React.Fragment>
        ),
    },
    {
        key: "passionate",
        animation: require('./../images/home/heart.svg'),
        themeColor: 'danger',
        description: (
            <React.Fragment>
                <strong>Passionate Programmer</strong> excited about embracing <strong>cutting edge technologies</strong> with <strong>clean code</strong>!
            </React.Fragment>
        )
    }
];
const SLIDE_CHANGE_INTERVAL = 7000;
const SLIDE_TRANSITION_DURATION = 1000;
const ICON_CHANGE_DELAY = SLIDE_CHANGE_INTERVAL - SLIDE_TRANSITION_DURATION / 2;

class RootIndex extends React.Component {
    static contextType = LayoutContext;

    state = {
        currentSlideIndex: 0,
        currentIconIndex: 0,

        lightOrigin: {
            x: 0.5,
            y: 0.5,
            width: 100,
            height: 100,
        }
    }
    slideChangeInterval = 0;
    iconChangeInterval = 0;

    constructor() {
        super();

        this.nextSlide = this.nextSlide.bind(this);
        this.nextIcon = this.nextIcon.bind(this);
        
        this.onAnimationColPosChanged = this.onAnimationColPosChanged.bind(this);
    }

    nextSlide() {
        const nextSlideIndex = (this.state.currentSlideIndex + 1) % SLIDES.length;

        this.setState({
            currentSlideIndex: nextSlideIndex,
        });
        this.context.setThemeColor(
            SLIDES[this.state.currentSlideIndex].themeColor
        );
    }

    nextIcon() {
        this.setState({
            currentIconIndex: (this.state.currentIconIndex + 1) % SLIDES.length,
        });
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

        this.slideChangeInterval = setInterval(this.nextSlide, SLIDE_CHANGE_INTERVAL);
        // Set an interval offset between icon and rest of the content change
        setTimeout(() => {
            this.iconChangeInterval = setInterval(this.nextIcon, SLIDE_CHANGE_INTERVAL);

            this.nextIcon();
        }, ICON_CHANGE_DELAY);

        // Set the Layout Theme Color - Brand Logo etc.
        this.context.setThemeColor(SLIDES[this.state.currentSlideIndex].themeColor);
    }

    componentWillUnmount() {
        clearInterval(this.slideChangeInterval);
        clearInterval(this.iconChangeInterval);

        this.context.toggleNavbarTransparent(false);
        this.context.resetThemeColor();
    }

    render() {
        const currentSlide = SLIDES[this.state.currentSlideIndex];
        const {
            animation: currentIcon,
            key: iconTransitionKey,
        } = SLIDES[this.state.currentIconIndex];

        return (
            <MediaQuery maxWidth="659px">
            {
                (phoneMatches) => (
                    <React.Fragment>
                        <HomeBackground
                            color={ colors[currentSlide.themeColor]  }
                            className={ classes.background }
                            origin={ this.state.lightOrigin }
                            transitionDuration={ SLIDE_TRANSITION_DURATION }
                        />
                        <div className={ classes['home-page'] }>
                            <div
                                className={ classes['intro'] }
                                style={{
                                    '--theme-color': colors[currentSlide.themeColor],
                                    '--button-color': Color(colors[currentSlide.themeColor]).darken(0.25).hex(),
                                    '--slide-transition-duration': `${SLIDE_TRANSITION_DURATION}ms`,
                                }}
                            >
                                <div
                                    className={ classNames(classes['intro__info-col'], classes['info']) }
                                >
                                    <h1 className={ classNames(classes['info__header'], 'transition-element') }>
                                        <span>Maciej</span> <span>Kurbański</span>
                                    </h1>
                                    <ContentSwapFade
                                        transitionKey={ currentSlide.key }
                                        duration={ SLIDE_TRANSITION_DURATION / 2 }
                                        className={ classes['info__description-wrap'] }
                                    >
                                        <p
                                            className={ classNames(classes['info__description'], 'transition-element') }
                                            key={ currentSlide.key }
                                        >
                                            { currentSlide.description }
                                        </p>
                                    </ContentSwapFade>
                                    <div className={ classes['info__actions'] }>
                                        <Button
                                            size={ phoneMatches ? "md" : "lg" }
                                            tag={ Link }
                                            className={ classNames(
                                                classes['info__actions__interactive'],
                                                'transition-element'
                                            ) }
                                            to="/portfolio"
                                        >
                                            View Portfolio
                                        </Button>
                                        <Button
                                            size={ phoneMatches ? "md" : "lg" }
                                            color="white"
                                            outline
                                            tag={ Link }
                                            className='transition-element'
                                            to="/skills-and-experiences"
                                        >
                                            Skills &amp; Experiences
                                        </Button>
                                    </div>
                                </div>
                                <div className={ classes['intro__animation-col'] }>
                                    <BodyPositionObserver
                                        onPositionChanged={ this.onAnimationColPosChanged }
                                    >
                                    {
                                        ({ domRef: bodyPositionRef }) => (
                                            <ContentSwapHomeIcon
                                                transitionKey={ iconTransitionKey }
                                                duration={ SLIDE_TRANSITION_DURATION }
                                            >
                                                <div
                                                    className={ classNames(
                                                        classes['intro__animation-wrap'],
                                                        'transition-element'
                                                    ) }
                                                    key={ iconTransitionKey }
                                                    ref={ bodyPositionRef }
                                                >
                                                    <img src={ currentIcon } />
                                                </div>
                                            </ContentSwapHomeIcon>
                                        )
                                    }
                                    </BodyPositionObserver>
                                </div>
                            </div>
                        </div>
                    </React.Fragment>
                )
            }
            </MediaQuery>
        );
    }
}

export default RootIndex;
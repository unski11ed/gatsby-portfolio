import React from 'react';

import HomeBackground from '../components/homeBackground';

import classes from './index.module.scss';

import { colors } from './../common/consts';

const SLIDES = [
    {
        animation: '',
        color: colors.primary,
    },
    {
        animation: '',
        color: colors.success,
    },
    {
        color: colors.danger
    }
];
const SLIDE_CHANGE_INTERVAL = 7000;

class RootIndex extends React.Component {
    rippledParticlesApi = null;
    state = {
        currentSlideIndex: 0,
    }
    changeInterval = 0;

    constructor() {
        super();

        this.nextSlide = this.nextSlide.bind(this);
    }

    nextSlide() {
        this.setState({
            currentSlideIndex: (this.state.currentSlideIndex + 1) % SLIDES.length,
        })
    }

    componentDidMount() {
        this.changeInterval = setInterval(this.nextSlide, SLIDE_CHANGE_INTERVAL);
    }

    componentWillUnmount() {
        clearInterval(this.changeInterval);
    }

    render() {
        const currentSlide = SLIDES[this.state.currentSlideIndex];

        return (
            <React.Fragment>
                <HomeBackground
                    color={ currentSlide.color }
                    className={ classes.background }
                />
            </React.Fragment>
        );
    }
}

export default RootIndex;
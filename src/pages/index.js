import React from 'react';

import HomeBackground from '../components/homeBackground';
import LayoutContext from './../layouts/layoutContext';

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
    static contextType = LayoutContext;

    state = {
        currentSlideIndex: 0,
    }
    changeInterval = 0;
    pageRef = React.createRef();

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
            <div ref={ this.pageRef }>
                <HomeBackground
                    color={ currentSlide.color }
                    className={ classes.background }
                />
            </div>
        );
    }
}

export default RootIndex;
import anime from 'animejs';

const ANIMATION_DURATION = 300;
const STAGGER_DELAY = 50;

export const entryAnimationConfig = ({ staggerDelay, duration } = {}) => ({
    opacity: [0, 1],
    duration: duration || ANIMATION_DURATION,
    delay: anime.stagger(staggerDelay || STAGGER_DELAY),
    easing: 'easeInQuad'
});

export const leaveAnimationConfig = () => ({
    opacity: 0,
    easing: 'easeOutQuad',
    duration: ANIMATION_DURATION,
});
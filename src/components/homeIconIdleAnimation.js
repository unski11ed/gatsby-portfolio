import PropTypes from 'prop-types';
import anime from 'animejs';

const HomeIconIdleAnimation = ({ children, duration, angle }) => {
    const iconRefCallback = (target) => {
        if (target) {
            anime({
                targets: target,
                rotateY: [0, -angle],
                duration,
                easing: 'linear',
                complete: () => {
                    target.style.transform = '';
                }
            })
        }
    };

    return children({ domRef: iconRefCallback });
}

HomeIconIdleAnimation.propTypes = {
    children: PropTypes.func.isRequired,
    duration: PropTypes.number,
    angle: PropTypes.number,
}

HomeIconIdleAnimation.defaultProps = {
    duration: 5000,
    angle: 30,
}

export default HomeIconIdleAnimation;
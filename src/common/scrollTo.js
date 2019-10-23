import anime from 'animejs';
import { isNumber } from 'lodash';
const getWindow = () => window !== undefined ? window : null;
const getGlobalScrollElement = () => {
    const window = getWindow();

    return window ? (
        window.document.scrollingElement ||
        window.document.body ||
        window.document.documentElement
    ) : null
}

export const scrollToPosition = (position, config = {}, element = getGlobalScrollElement()) => {
    if (element) {
        const options = {
            easing: 'easeInOutQuad',
            duration: 300,
            ...config
        };

        return anime({
            targets: element,
            scrollTop: isNumber(position.y) ? position.y : undefined,
            scrollLeft: isNumber(position.x) ? position.x : undefined,
            ...options
        });
    }

    return Promise.resolve();
}
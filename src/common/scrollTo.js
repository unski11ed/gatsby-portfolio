import anime from 'animejs';

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
        console.log(options);
        return anime({
            targets: element,
            scrollTop: position.y || undefined,
            //scrollLeft: position.x || undefined,
            ...options
        });
    }

    return Promise.resolve();
}
import { chain } from 'lodash';

export const getContentEntryBySlug = (dataSet, slug) =>
    chain(dataSet)
        .find(({ node }) => node.slug === slug)
        .get('node')
        .value();

export const getDocumentSize = (document) => {
    const body = document.body;
    const html = document.documentElement;

    const height = Math.max(
        body.scrollHeight,
        body.offsetHeight, 
        html.clientHeight,
        html.scrollHeight,
        html.offsetHeight
    );
    const width = Math.max(
        body.scrollWidth,
        body.offsetWidth, 
        html.clientWidth,
        html.scrollWidth,
        html.offsetWidth
    );

    return { width, height };
}

export const compose = (funcs) => function() {
    for (const func of funcs) {
        func.apply(this, arguments);
    }
}

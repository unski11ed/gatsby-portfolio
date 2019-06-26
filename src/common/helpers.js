import { chain } from 'lodash';

export const getContentEntryBySlug = (dataSet, slug) =>
    chain(dataSet)
        .find(({ node }) => node.slug === slug)
        .get('node')
        .value();
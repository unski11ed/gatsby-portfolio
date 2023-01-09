import React from 'react';
import { capitalize } from 'lodash';
import PropTypes from 'prop-types';

import iconAngular from '../images/tech-icons/angular.svg';
import iconDotNet from '../images/tech-icons/dotnet-alt.svg';
import iconJavascript from '../images/tech-icons/javascript.svg';
import iconJquery from '../images/tech-icons/jquery.svg';
import iconMeteor from '../images/tech-icons/meteor.svg';
import iconNextJs from '../images/tech-icons/nextjs.svg';
import iconNodeJs from '../images/tech-icons/nodejs.svg';
import iconReact from '../images/tech-icons/react.svg';
import iconRedux from '../images/tech-icons/redux.svg';
import iconRxJs from '../images/tech-icons/rxjs.svg';
import iconTypescript from '../images/tech-icons/typescript.svg';
import iconVue from '../images/tech-icons/vuejs.svg';
import iconWebsockets from '../images/tech-icons/websockets.svg';
import iconWordpress from '../images/tech-icons/wordpress.svg';
import iconCss from '../images/tech-icons/css.svg';
import iconJs from '../images/tech-icons/js.svg';

const icons = {
    'angular': iconAngular,
    'dotnet': iconDotNet,
    'javascript': iconJavascript,
    'jquery': iconJquery,
    'meteor': iconMeteor,
    'nextjs': iconNextJs,
    'nodejs': iconNodeJs,
    'react': iconReact,
    'redux': iconRedux,
    'rxjs': iconRxJs,
    'typescript': iconTypescript,
    'vue': iconVue,
    'websockets': iconWebsockets,
    'wordpress': iconWordpress,
    'css': iconCss,
    'js': iconJs
}

const TechIcon = ({ name, ...otherProps }) => (
    <img src={ icons[name] || null } alt={ `${capitalize(name)} Logo` } { ...otherProps } />
);
TechIcon.propTypes = {
    name: PropTypes.string,
}

export default TechIcon;
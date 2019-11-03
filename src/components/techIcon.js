import React from 'react';
import { capitalize } from 'lodash';
import PropTypes from 'prop-types';

const icons = {
    'angular': require('./../images/tech-icons/angular.svg'),
    'dotnet': require('./../images/tech-icons/dotnet-alt.svg'),
    'javascript': require('./../images/tech-icons/javascript.svg'),
    'jquery': require('./../images/tech-icons/jquery.svg'),
    'meteor': require('./../images/tech-icons/meteor.svg'),
    'nextjs': require('./../images/tech-icons/nextjs.svg'),
    'nodejs': require('./../images/tech-icons/nodejs.svg'),
    'react': require('./../images/tech-icons/react.svg'),
    'redux': require('./../images/tech-icons/redux.svg'),
    'rxjs': require('./../images/tech-icons/rxjs.svg'),
    'typescript': require('./../images/tech-icons/typescript.svg'),
    'vue': require('./../images/tech-icons/vuejs.svg'),
    'websockets': require('./../images/tech-icons/websockets.svg'),
    'wordpress': require('./../images/tech-icons/wordpress.svg'),
    'css': require('./../images/tech-icons/css.svg'),
    'js': require('./../images/tech-icons/js.svg')
}

const TechIcon = ({ name, ...otherProps }) => (
    <img src={ icons[name] || null } alt={ `${capitalize(name)} Logo` } { ...otherProps } />
);
TechIcon.propTypes = {
    name: PropTypes.string,
}

export default TechIcon;
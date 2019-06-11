import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import anime from 'animejs';

import classes from './image.module.scss';

class Image extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            imageLoaded: false,
            placeholderVisible: true,
        }
        this.placeholderRef = React.createRef();
        this.imageRef = React.createRef();

        this.onImageLoaded = this.onImageLoaded.bind(this);
    }

    async transitionImages() {
        await anime({
            targets: this.placeholderRef.current,
            opacity: 0,
            easing: 'easeOutCubic',
            duration: 300,
        }).finished;

        this.setState({ placeholderVisible: false })
    }

    onImageLoaded() {
        console.log('image loaded');
        this.setState({ imageLoaded: true });
        this.transitionImages();
    }

    render() {
        const {
            wrapClassName,
            className,
            srcPlaceholder,
            src,
            srcSet,
            style,
            alt,
            innerRef,
        } = this.props;

        const wrapClass = classNames(classes.imageWrap, wrapClassName);
        const imageLowClass = classNames(
            className,
            classes.imageLowRes
        );
        const imageHighClass = classNames(
            className,
            classes.imageHighRes,
            {
                [classes.loaded]: !this.state.placeholderVisible
            }
        );
        return (
            <div className={ wrapClass } style={ style } ref={ innerRef }>
                <picture className={ imageHighClass } onLoad={ this.onImageLoaded }>
                    <source srcSet={ srcSet.webp } type="image/webp" />
                    <source srcSet={ srcSet.jpeg } type="image/jpeg" />
                    <img srcSet={ srcSet.jpeg } alt={ alt } />
                </picture>
                {
                    this.state.placeholderVisible && (
                        <picture className={ imageLowClass } ref={ this.placeholderRef }>
                            <source srcSet={ srcPlaceholder.webp } type="image/webp" />
                            <source srcSet={ srcPlaceholder.jpeg } type="image/jpeg" />
                            <img src={ srcPlaceholder.jpeg } alt={ alt && `${alt} (Low Quality)` } />
                        </picture>
                    )
                }
            </div>
        );
    }
}
Image.propTypes = {
    srcPlaceholder: PropTypes.object.isRequired,
    src: PropTypes.object.isRequired,
    srcSet: PropTypes.object.isRequired,
    wrapClassName: PropTypes.string,
    className: PropTypes.string,
    style: PropTypes.object,
    alt: PropTypes.string,
    innerRef: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.func
    ]),
}

export default Image;
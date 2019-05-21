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

    render() {
        const {
            wrapClassName,
            className,
            srcPlaceholder,
            src,
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
            classes.imageHighRes
        );
        return (
            <div className={ wrapClass } style={ style } ref={ innerRef }>
                <img
                    src={ src }
                    className={ imageHighClass }
                    alt={ alt }
                    onLoad={ () => {
                        this.setState({ imageLoaded: true });
                        this.transitionImages()
                    } }
                />
                {
                    this.state.placeholderVisible && (
                        <img
                            src={ srcPlaceholder }
                            className={ imageLowClass }
                            alt={ alt && `${alt} (Low Quality)` }
                            ref={ this.placeholderRef }
                        />
                    )
                }
            </div>
        );
    }
}
Image.propTypes = {
    srcPlaceholder: PropTypes.string.isRequired,
    src: PropTypes.string.isRequired,
    wrapClassName: PropTypes.string,
    className: PropTypes.string,
    style: PropTypes.object,
    alt: PropTypes.string,
    innerRef: PropTypes.any,
}

export default Image;
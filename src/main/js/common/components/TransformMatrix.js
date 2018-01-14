import React from 'react'
import PropTypes from 'prop-types'
import * as math from 'mathjs'

class TransformMatrix extends React.Component {
    static propTypes = {
        originX: PropTypes.number, // px
        originY: PropTypes.number, // px
        translateX: PropTypes.number, // px
        translateY: PropTypes.number, // px
        rotation: PropTypes.number, // radians
        scale: PropTypes.number
    };

    static defaultProps = {
        originX: 0,
        originY: 0,
        translateX: 0,
        translateY: 0,
        rotation: 0,
        scale: 1
    };

    translateMatrix = (x, y) => {
        return [
            [1, 0, x],
            [0, 1, y],
            [0, 0, 1]
        ];
    };

    scaleMatrix = (scale) => {
        return [
            [scale, 0, 0],
            [0, scale, 0],
            [0, 0, 1]
        ];
    };

    rotateMatrix = (theta) => {
            return [
                [math.cos(theta), -math.sin(theta), 0],
                [math.sin(theta), math.cos(theta), 0],
                [0, 0, 1]
            ];
        };


    transformMatrix = () => {
        return math.multiply(
            this.translateMatrix(this.props.originX, this.props.originY),
            this.scaleMatrix(this.props.scale),
            this.translateMatrix(this.props.translateX, this.props.translateY),
            this.rotateMatrix(this.props.rotation),
            this.translateMatrix(-this.props.originX, -this.props.originY)
        )
    };

    transformFunction = (array) => {
        return math.flatten(math.multiply(this.transformMatrix(), [array[0], array[1], 1]));
    };

    cssTransformMatrix = () => {
        let m = math.flatten(this.transformMatrix());
        return `matrix(${m[0]},${m[3]},${m[1]},${m[4]},${m[2]},${m[5]})`;
    };


    render = () =>
        <div ref={elem => this.elem = elem}
             style={{transform: this.cssTransformMatrix(), transformOrigin: "top left"}}>
            {this.props.children}
        </div>


}

export default TransformMatrix

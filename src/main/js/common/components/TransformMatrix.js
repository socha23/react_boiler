import React from 'react'
import PropTypes from 'prop-types'
import * as transform from '../transformMatrixHelpers'

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


    transformMatrix = () => {
        return transform.multiply(
            transform.translateMatrix(-this.props.originX, -this.props.originY),
            transform.scaleMatrix(this.props.scale),
            transform.rotateMatrix(this.props.rotation),
            transform.translateMatrix(this.props.translateX, this.props.translateY),
            transform.translateMatrix(this.props.originX, this.props.originY)
        )
    };

    transformFunction = (array) => {
        return transform.transformPoint(this.transformMatrix(), array);
    };

    cssTransformMatrix = () => {
        return transform.cssMatrix(this.transformMatrix());
    };


    render = () =>
        <div ref={elem => this.elem = elem}
             style={{transform: this.cssTransformMatrix(), transformOrigin: "top left"}}>
            {this.props.children}
        </div>


}

export default TransformMatrix

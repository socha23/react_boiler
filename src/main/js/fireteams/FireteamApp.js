import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'


import {getFireteamTag, getTargetTag, getFireteamFloorPlan} from './selectors'
import {DotMarker} from '../maps/Marker'

import TransformMatrix from '../common/components/TransformMatrix'
import translatePoint from '../common/translatePoint'

class FireteamApp extends React.Component {

    static propTypes = {
        fireteam: PropTypes.object.isRequired,
        fireteamTag: PropTypes.object.isRequired,
        targetTag: PropTypes.object,
        floorPlan: PropTypes.object
    };

    static defaultProps = {
        floorPlan: {},
        targetTag: {}
    };

    state = {
        imgBounds: null
    };

    setImgBounds = () => {
        this.setState({
            imgBounds: {
                topLeft: {x: 0, y: 0},
                bottomRight: {x: this.imgElem.width(), y: this.imgElem.height()}
            }
        });
    };

    render = () => {

        let fireteamPositionOrig = {x: 0, y: 0};
        let fireteamPositionTransformed = fireteamPositionOrig;
        let focalPoint = {x: 0, y: 0};


        if (this.state.imgBounds) {
            fireteamPositionOrig = translatePoint(
                this.props.floorPlan,
                this.state.imgBounds,
                this.props.fireteamTag.position
            );
        }

        if (this.transformMatrix) {
            fireteamPositionTransformed = this.transformMatrix.transformFunction(fireteamPositionOrig);
        }

        if (this.containerElem) {
            focalPoint = {
                x: -fireteamPositionOrig.x + this.containerElem.width() / 2,
                y: -400// + this.containerElem.height()  - 100
            };

        }

        return <div>
            <h1>Fireteam</h1>
            <h3>{this.props.fireteam.name}</h3>
            <div
                ref={e => {this.containerElem = $(e)}}
                style={{position: "relative", width: "100%", height: 500, overflow: "hidden", border: "1px solid black"}}
            >
                <TransformMatrix
                    ref={e => {this.transformMatrix = e}}
                    originX={fireteamPositionOrig.x}
                    originY={fireteamPositionOrig.y}
                    translateX={focalPoint.x}
                    translateY={focalPoint.y}

                >
                    <img
                        ref={e => {this.imgElem = $(e)}}
                        onLoad={this.setImgBounds}
                        src={this.props.floorPlan.base64content}/>
                </TransformMatrix>
                <DotMarker x={fireteamPositionTransformed.x} y={fireteamPositionTransformed.y} color="red"/>

            </div>

        </div>
    }
}

export default connect((state, {fireteam}) => ({
    fireteamTag: getFireteamTag(state, fireteam),
    targetTag: getTargetTag(state, fireteam),
    floorPlan: getFireteamFloorPlan(state, fireteam)
}))(FireteamApp)
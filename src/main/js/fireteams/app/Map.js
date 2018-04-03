import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

import {getFireteamFloorPlan, getFireteamTag, getTargetTag} from '../selectors'

import {DotMarker} from '../../maps/Marker'
import TransformMatrix from '../../common/components/TransformMatrix'
import * as transform from '../../common/transformMatrixHelpers'
import {TypeArtifact, TypeFireteam} from "../../tags/TagType";

import translatePoint from '../../common/translatePoint'


export class MapComponent extends React.Component {

    static propTypes = {
        fireteamTag: PropTypes.object.isRequired,
        targetTag: PropTypes.object,
        floorPlan: PropTypes.object,
        zoom: PropTypes.number,
        onTargetShown: PropTypes.func,
    };

    static defaultProps = {
        floorPlan: {},
        targetTag: {},
        zoom: 1,
        onTargetShown: () => {}
    };

    state = {
        imgBounds: null
    };

    componentWillReceiveProps = (nextProps) => {
        if (!nextProps.targetTag) {
            nextProps.onTargetShown(false);
        } else {
            const targetScreenPos = this.posToScreen(nextProps.targetTag.position);
            nextProps.onTargetShown(targetScreenPos.y > 0);
        }
    };

    setImgBounds = (e) => {
        this.setState({
            imgBounds: {
                topLeft: {x: 0, y: 0},
                // clientWidth i clientHeight podają wymiary przed transformacją, a o to nam tu chodzi
                bottomRight: {x: e.target.clientWidth, y: e.target.clientHeight}
            }
        });
    };

    posToScreen = (point) => {
        let fireteamOnImg = this.toImgCoords(this.props.fireteamTag.position);
        let pointOnImg = this.toImgCoords(point);

        const matrix = transform.multiply(
                    transform.translateMatrix(-fireteamOnImg.x, -fireteamOnImg.y),
                    transform.scaleMatrix(this.props.zoom),
                    transform.rotateMatrix(this.getRotation()),
                    transform.translateMatrix(this.getFocalPoint().x, this.getFocalPoint().y),
                );

        return transform.transformPoint(matrix, pointOnImg);
    };


    toImgCoords = (point) => {
        if (this.state.imgBounds) {
            return translatePoint(
                this.props.floorPlan,
                this.state.imgBounds,
                point
            );
        } else {
            return point;
        }
    };

    getFocalPoint = () => {
        return this.containerElem ? {
            x: this.containerElem.clientWidth / 2,
            y: this.containerElem.clientHeight - 100
        } : {
            x: 0, y: 0
        };
    };

    getRotation = () => {
        if (this.props.fireteamTag && this.props.targetTag) {
            const fireteamPos = this.toImgCoords(this.props.fireteamTag.position);
            const targetPos = this.toImgCoords(this.props.targetTag.position);
            return Math.atan2(fireteamPos.x - targetPos.x, fireteamPos.y - targetPos.y);
        } else {
            return 0;
        }
    };

    renderTargetMarker = () => {
        if (!this.props.targetTag) {
            return <span/>;
        }
        const targetPos = this.posToScreen(this.props.targetTag.position);
        return <DotMarker x={targetPos.x} y={targetPos.y} color={TypeArtifact.color}/>
    };

    render = () => {

        const fireteamTranslation = this.toImgCoords(this.props.fireteamTag.position);
        const fireteamPos = this.posToScreen(this.props.fireteamTag.position);

        return <div
                ref={e => {this.containerElem = e}}
                style={{
                    height: "100%",
                    position: "relative",
                    top: 0,
                    left: 0,
                    zIndex: 0,
                    overflow: "hidden",
                    backgroundColor: "white",
                    ...this.props.style

                }}
            >
                <TransformMatrix
                    translateX={this.getFocalPoint().x}
                    translateY={this.getFocalPoint().y}
                >
                        <TransformMatrix
                            scale={this.props.zoom}
                            rotation={this.getRotation()}
                            translateX = {-fireteamTranslation.x}
                            translateY = {-fireteamTranslation.y}
                        >
                            <img
                                onLoad={this.setImgBounds}
                                src={this.props.floorPlan.base64content}/>
                        </TransformMatrix>
                </TransformMatrix>
            {this.renderTargetMarker()}
            <DotMarker x={fireteamPos.x} y={fireteamPos.y} color={TypeFireteam.color}/>
        </div>
    }
}

export default connect((state, {fireteam}) => ({
    fireteamTag: getFireteamTag(state, fireteam),
    targetTag: getTargetTag(state, fireteam),
    floorPlan: getFireteamFloorPlan(state, fireteam)
}))(MapComponent)
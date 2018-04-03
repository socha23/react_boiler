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
        imgBounds: null,
        targetPos: {x: 0, y: 0}
    };

    componentWillReceiveProps = (nextProps) => {
        if (nextProps.zoom != this.props.zoom) {
            // konieczny będzie rerender po uaktualnieniu komponentów
            // (obejście na buga związanego z tym że target marker wylicza się na podstawie leżącego głębiej komponentu)
            setTimeout(() => {this.setState({zoom: nextProps.zoom})})
        }

        let fireteamTranslation = this.translateToImgCoords(nextProps.fireteamTag.position);
        let fireteamPosition = this.transformPoint(fireteamTranslation);
        if (nextProps.targetTag) {
            let targetPosition = this.transformPoint(this.translateToImgCoords(nextProps.targetTag.position), fireteamTranslation);
            let markerPos = {x: targetPosition.x - fireteamPosition.x, y: targetPosition.y - fireteamPosition.y};
            let screenPos = this.mapPosToScreenPos(markerPos);
            //console.log(screenPos);
            nextProps.onTargetShown(screenPos.y > 0);
            this.setState({targetPos: markerPos});
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

    };


    translateToImgCoords = (point) => {
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

    transformPoint = (point) => {
        if (this.transformMatrix) {
            return this.transformMatrix.transformFunction(point)}
        else {
            return point;
        }
    };

    getFocalPoint = () => {
        return this.containerElem ?
        {
            x: this.containerElem.clientWidth / 2,
            y: this.containerElem.clientHeight - 100
        } : {
            x: 0, y: 0
        };
    };

    getRotation = () => {
        if (this.props.fireteamTag && this.props.targetTag) {
            const fireteamPos = this.translateToImgCoords(this.props.fireteamTag.position);
            const targetPos = this.translateToImgCoords(this.props.targetTag.position);

            return Math.atan2(fireteamPos.x - targetPos.x, fireteamPos.y - targetPos.y);
        } else {
            return 0;
        }

    };

    mapPosToScreenPos = (point) => {
        const matrix = transform.multiply(
            transform.translateMatrix(-this.getFocalPoint().x, -this.getFocalPoint().y),
            transform.rotateMatrix(-this.getRotation()),
        );
        return transform.transformPoint(matrix, point);
    };


    render = () => {
        let fireteamTranslation = this.translateToImgCoords(this.props.fireteamTag.position);
        let targetMarker = this.props.targetTag ? <DotMarker x={this.state.targetPos.x} y={this.state.targetPos.y} color={TypeArtifact.color}/> : <span/>;

        /*
             najbardziej wewnętrzna matryca przesuwa obrazek tak żeby drużyna była w (0, 0) i
             go skaluje

             środkowa matryca obraca. Obrót nie może być w wewnętrznej bo wewnętrzną wykorzystujemy
             do wyliczenia właściwej pozycji target markera. Obrót nie zmienia tego że drużyna jest w (0, 0)

              zewnętrza przesuwa żeby drużyna (punkt 0,0) była w focal point, nie może być w tej samej
              co środkowa bo TransformMatrix translację wykonuje po obrocie. Zagnieżdżenie matryc uniezależnia nas od
              kolejności w jakiej operacje są wykonywane w ramach jednej matrycy.
         */
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
                        rotation={this.getRotation()}
                    >
                        <TransformMatrix
                            ref={e => {this.transformMatrix = e}}
                            scale={this.props.zoom}
                            translateX = {-fireteamTranslation.x}
                            translateY = {-fireteamTranslation.y}
                        >
                            <img
                                onLoad={this.setImgBounds}
                                src={this.props.floorPlan.base64content}/>
                        </TransformMatrix>
                        <DotMarker x={0} y={0} color={TypeFireteam.color}/>
                        {targetMarker}
                    </TransformMatrix>
                </TransformMatrix>

            </div>
    }
}

export default connect((state, {fireteam}) => ({
    fireteamTag: getFireteamTag(state, fireteam),
    targetTag: getTargetTag(state, fireteam),
    floorPlan: getFireteamFloorPlan(state, fireteam)
}))(MapComponent)
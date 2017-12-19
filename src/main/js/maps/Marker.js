import React from 'react';

import TagMapIcon from '../tags/TagMapIcon'

const DOT_SIZE = 8;

const DotMarker = (props) => <Marker {...props} style={{
    ...props.style,
    width: DOT_SIZE,
    height: DOT_SIZE,
    borderRadius: DOT_SIZE / 2,
    border: "1px solid black",
    backgroundColor: props.color,
    left: (props.x || 0) - DOT_SIZE / 2,
    top: (props.y || 0) - DOT_SIZE / 2
    }}/>;


const TagMapIconMarker = (props) => <Marker {...props}>
    <TagMapIcon tag={props.tag}/>
</Marker>;


const LABEL_MARKER_DIRECTIONS = {
    up: {
        arrowStyle: {left: -6, top: -1, zIndex: 1},
        arrowClass: "glyphicon-triangle-top",
        labelStyle: {left: -20, top: -8, zIndex: 2}
    },
    down: {
        arrowStyle: {left: -6, top: -11, zIndex: 2},
        arrowClass: "glyphicon-triangle-bottom",
        labelStyle: {left: -20, top: -48, zIndex: 1}
    }
};

const LabelMarker = (props) => {
    let decorationClass = "";
    let style = {fontSize: 16, backgroundColor: props.color};
    if (props.decoration) {
        decorationClass = props.decoration;
    } else {
        style.boxShadow = "2px 4px 10px #888";
    }
    let arrowDirection = props.arrowDirection || "up";
    let dirStyle = LABEL_MARKER_DIRECTIONS[arrowDirection];

    return <Marker {...props}>
        <div className="triangleContainer"
             style={{
             position: "relative",
             zIndex: 2,
             textShadow: "2px 4px 10px #888",
             ...(dirStyle.arrowStyle)}}>
            <i style={{fontSize: 16, color: props.color}} className={"glyphicon " + dirStyle.arrowClass}/>
        </div>
        <div style={{position: "relative", zIndex: 1, cursor: "pointer", ...(dirStyle.labelStyle)}}
            onClick={props.onClick}>
            <span className={"label " + decorationClass }
                  style={style}>{props.name}</span>
        </div>
    </Marker>
};


// dotCorrection is multiplied by half of dotsize to determine relative amount to move the marker by
const Marker = ({id, style, x, y, name = "", selected = false, onClick = () => {
}, children

    }) =>
    <div>
        <div
            title={name}
            style={{
            left: x,
            top: y,
            ...style,
            position: "absolute",
            zIndex: 1000
        }}>
            {children}
        </div>
        {selected ?
            <img
                src={CONTEXT_PATH + "/mapMarker-yellow.png"}
                style={{
                position: 'absolute',
                zIndex: 2000,
                left: x - 30,
                top: y - 60
            }}

            />
            : <span/>}
    </div>;

module.exports = {
    DotMarker,
    LabelMarker,
    TagMapIconMarker,
    Marker
};
import React from 'react';

import TagMapIcon from '../tags/TagMapIcon'

const DOT_SIZE = 30;

const DotMarker = (props) => {
    const dotSize = props.dotSize || DOT_SIZE;

    return <Marker {...props}>
        <div title={props.name} style={{
            width: dotSize,
            height: dotSize,
            borderRadius: dotSize / 2,
            border: "1px solid #444",
            backgroundColor: props.color,
            boxShadow: "2px 4px 10px #888",
            position: 'relative',
            cursor: 'pointer',
            left: -(dotSize / 2),
            top: -(dotSize / 2)
        }} onClick={props.onClick}>
            <div style={{
                position: 'relative',
                left: -1,
                top: -1,
                background: "linear-gradient(135deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.8) 15%, rgba(255,255,255,0) 50%)",
                borderRadius: dotSize / 2,
                width: dotSize,
                height: dotSize
            }}/>
        </div>

    </Marker>
};


const TagMapIconMarker = (props) => <Marker {...props}>
    <TagMapIcon tag={props.tag}/>
</Marker>;


const LABEL_MARKER_DIRECTIONS = {
    up: {
        arrowStyle: {left: -7, top: -1, zIndex: 1},
        arrowClass: "glyphicon-triangle-top",
        labelStyle: {left: -20, top: 12, zIndex: 2}
    },
    down: {
        arrowStyle: {left: -7, top: -11, zIndex: 2},
        arrowClass: "glyphicon-triangle-bottom",
        labelStyle: {left: -20, top: -28, zIndex: 1}
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
                 position: "absolute",
                 zIndex: 2,
                 textShadow: "2px 4px 10px #888",
                 ...(dirStyle.arrowStyle)
             }}>
            <i style={{fontSize: 16, color: props.color}} className={"glyphicon " + dirStyle.arrowClass}/>
        </div>
        <div style={{position: "absolute", zIndex: 1, cursor: "pointer", ...(dirStyle.labelStyle)}}
             onClick={props.onClick}>
            <span className={"label " + decorationClass}
                  style={style}>{props.name}</span>
        </div>
    </Marker>
};


const Marker = ({
                    id, style, x, y, name = "", selected = false, onClick = () => {
    }, children

                }) =>
    <div style={{
        left: x || 0,
        top: y || 0,
        position: "absolute",
        zIndex: 1,
        fontSize: 14,
        lineHeight: 1.4
    }}>
        {children}
        {selected ?
            <img
                src={CONTEXT_PATH + "/mapMarker-yellow.png"}
                style={{
                    position: 'absolute',
                    zIndex: 2000,
                    left: -32,
                    top: -61
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
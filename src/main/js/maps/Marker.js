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
    left: (props.style.left || 0) - DOT_SIZE / 2,
    top: (props.style.top || 0) - DOT_SIZE / 2
    }}/>;


const TagMapIconMarker = (props) => <Marker {...props}>
    <TagMapIcon tag={props.tag}/>
</Marker>;


const LabelMarker = (props) => {
    let decorationClass = "";
    let style = {fontSize: 16, backgroundColor: props.color};
    if (props.decoration) {
        decorationClass = props.decoration;
    } else {
        style.boxShadow = "2px 4px 10px #888";
    }

    return <Marker {...props}>
        <div className="triangleContainer" style={{position: "relative", left: -5, top: -3}}>
            <i style={{fontSize: 16, color: props.color}} className="glyphicon glyphicon-triangle-top"/>
        </div>
        <div style={{position: "relative",  left: -20, top: -10}}>
            <span className={"label " + decorationClass }
                  style={style}>{props.name}</span>
        </div>
    </Marker>
};


// dotCorrection is multiplied by half of dotsize to determine relative amount to move the marker by
const Marker = ({id, style = {}, name = "", selected = false, onClick = () => {
}, children

    }) =>
    <div>
        <div
            onClick={onClick}
            title={name}
            style={{
            ...style,
            position: "absolute",
            cursor: "pointer",
            zIndex: 1000
        }}>
            {children}
        </div>
        {selected ?
            <img
                src={CONTEXT_PATH + "/mapMarker.png"}
                style={{
                position: 'absolute',
                zIndex: 2000,
                left: style.left - 28,
                top: style.top - 62
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
import React from 'react';

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
    }} elem={null}/>;

// dotCorrection is multiplied by half of dotsize to determine relative amount to move the marker by
const Marker = ({id, style = {}, name = "", selected = false, onClick = () => {}, body

    }) =>
    <div
        onClick={onClick}
        title={name}
        style={appendStyle({
            ...style,
            zIndex: 1000
        })}>
        {body}
        {selected ?
            <img
                src={CONTEXT_PATH + "/mapMarker.png"}
                style={{
                    position: 'relative',
                    zIndex: 2000,
                    left: -29,
                    top: -62
                }}

            />
            : <span/>}
    </div>;

const STYLE_COMMON = {
    cursor: "pointer"
};

function appendStyle(style) {
    return {
        ...STYLE_COMMON,
        ...style
    }
}



module.exports = {
    DotMarker,
    Marker,
    DOT_SIZE
};
import React from 'react';

const DOT_SIZE = 20;

const DotMarker = (props) => <Marker {...props} style={{...props.style, ...STYLE_DOT, backgroundColor: props.color}} elem={null}/>;

const STYLE_DOT = {
    width: DOT_SIZE,
    height: DOT_SIZE,
    borderRadius: DOT_SIZE / 2,
    border: "1px solid black"
};

// dotCorrection is multiplied by half of dotsize to determine relative amount to move the marker by
const Marker = ({id, style = {}, name = "", selected = false, onClick = () => {}, dotCorrection = 1, body

    }) =>
    <div
        onClick={onClick}
        title={name}
        style={appendStyle({
            ...style,
            zIndex: 1000,
            left: (style.left || 0) + dotCorrection * DOT_SIZE / 2,
            top: (style.top || 0) + dotCorrection * DOT_SIZE / 2
        })}>
        {body}
        {selected ?
            <img
                src={CONTEXT_PATH + "/mapMarker.png"}
                style={{
                    position: 'relative',
                    zIndex: 2000,
                    left: -18,
                    top: -84
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
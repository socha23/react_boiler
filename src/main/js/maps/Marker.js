import React from 'react';

const DOT_SIZE = 20;

const STYLE_COMMON = {
    position: "absolute",
    width: DOT_SIZE,
    height: DOT_SIZE,
    borderRadius: DOT_SIZE / 2,
    border: "1px solid black",
    cursor: "pointer"
};

function appendStyle(style) {
    return {
        ...STYLE_COMMON,
        ...style
    }
}

const Marker = ({id, color = "red", style = {}, name = "", selected = false, onClick = () => {}, dotCorrection = 1

    }) =>
    <div
        onClick={onClick}
        title={name}
        style={appendStyle({
            ...style,
            backgroundColor: color,
            left: (style.left || 0) + dotCorrection * DOT_SIZE / 2,
            top: (style.top || 0) + dotCorrection * DOT_SIZE / 2
        })}>
        {selected ?
            <img
                src="/mapMarker.png"
                style={{
                    position: 'relative',
                    left: -23,
                    top: -52
                }}

            />
            : <span/>}
    </div>;

module.exports = {
    Marker: Marker,
    DOT_SIZE: DOT_SIZE
};
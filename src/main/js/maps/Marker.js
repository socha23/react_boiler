import React from 'react';

const DOT_SIZE = 20;

const STYLE_COMMON = {
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

// dotCorrection is multiplied by half of dotsize to determine relative amount to move the marker by

const Marker = ({id, color = "red", style = {}, name = "", selected = false, onClick = () => {}, dotCorrection = 1

    }) =>
    <div
        onClick={onClick}
        title={name}
        style={appendStyle({
            ...style,
            backgroundColor: color,
            zIndex: 1000,
            left: (style.left || 0) + dotCorrection * DOT_SIZE / 2,
            top: (style.top || 0) + dotCorrection * DOT_SIZE / 2
        })}>
        {selected ?
            <img
                src="/mapMarker.png"
                style={{
                    position: 'relative',
                    zIndex: 2000,
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
import React from 'react';

export const STYLE_DEFAULT = {
    className: "",
    style: {
        height: 5,
        backgroundColor: "red",
        borderRadius: 2,
        transformOrigin: "2px 2px"
    }
};

function animatedStyle(className) {
    return {
        className: "progress-bar " + className + "  progress-bar-striped active",
        style: {
            height: 10,
            borderRadius: 5,
            animationDirection: "reverse",
            transformOrigin: "0 4px",
            transition: 'none',
            opacity: 0.8
        }
    };
}

export const STYLE_ANIMATED_RED = animatedStyle("progress-bar-danger");
export const STYLE_ANIMATED_GREEN = animatedStyle("progress-bar-success");
export const STYLE_ANIMATED_YELLOW = animatedStyle("progress-bar-warning");


const Line = ({fromX, fromY, toX, toY, style=STYLE_DEFAULT}) => {
    let dX = toX - fromX;
    let dY = toY - fromY;
    let len = Math.sqrt(dX * dX + dY * dY);

    let angle = Math.PI - Math.atan2(dY, -dX);


    return <div><div className={style.className} style={{
        ...style.style,
        position: "absolute",
        width: len,
        top: fromY,
        left: fromX,
        transform: "rotate(" + angle + "rad)"
    }}/></div>
};

export default Line;
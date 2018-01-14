export function translateMatrix(x, y) {
    return [
        [1, 0, x],
        [0, 1, y],
        [0, 0, 1]
    ];
}

export function scaleMatrix(scale) {
    return [
        [scale, 0, 0],
        [0, scale, 0],
        [0, 0, 1]
    ];
}

export function rotateMatrix(theta) {
    return [
        [Math.cos(theta), -Math.sin(theta), 0],
        [Math.sin(theta), Math.cos(theta), 0],
        [0, 0, 1]
    ];
}

export function transpose(m) {
    return [
        [m[0][0], m[1][0], m[2][0]],
        [m[0][1], m[1][1], m[2][1]],
        [m[0][2], m[1][2], m[2][2]]
    ];
}

export function cssMatrix(m) {
    return `matrix(${m[0][0]},${m[1][0]},${m[0][1]},${m[1][1]},${m[0][2]},${m[1][2]})`;
}

function _multiply(a, b) {
    function sV(col, row) {
        return a[0][row] * b[col][0]
            + a[1][row] * b[col][1]
            + a[2][row] * b[col][2];
    }

    return [
        [sV(0, 0), sV(0, 1), sV(0, 2)],
        [sV(1, 0), sV(1, 1), sV(1, 2)],
        [sV(2, 0), sV(2, 1), sV(2, 2)]
    ];
}

export function multiply(...args) {
    let result = args[0];
    for (var i = 1; i < args.length; i++) {
        result = _multiply(result, args[i])
    }
    return result
}

export function transformPoint(m, point) {
    return [
        m[0][0] * point[0] + m[0][1] * point[1] + m[0][2],
        m[1][0] * point[0] + m[1][1] * point[1] + m[1][2]
    ]
}

// jakby była potrzeba dorobienia invert() to tu algorytm: http://www.senocular.com/flash/tutorials/transformmatrix/


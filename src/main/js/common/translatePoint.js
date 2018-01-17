function unpack(square = {}) {

    let x = square.topLeft ? square.topLeft.x || 0 : 0;
    let y = square.topLeft ? square.topLeft.y || 0 : 0;

    let w = square.bottomRight ? (square.bottomRight.x || 0) - x : 1;
    let h = square.bottomRight ? (square.bottomRight.y || 0) - y : 1;
    return [x, y, w, h];
}

export default function translatePoint(from, to, point = {}) {
    let [fx, fy, fw, fh] = unpack(from);
    let [tx, ty, tw, th] = unpack(to);

    const result = {
            x: fw == 0 ? tx : ((point.x || 0) - fx) / fw * tw + tx,
            y: fh == 0 ? ty : ((point.y || 0) - fy) / fh * th + ty
        };
    return result;

}
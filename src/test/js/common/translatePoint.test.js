import translatePoint from 'common/translatePoint'

const RECT_0_0_10_10 = {
        topLeft: {x: 0, y: 0},
        bottomRight: {x: 10, y: 10}
    };

const RECT_0_0_20_40 = {
        topLeft: {x: 0, y: 0},
        bottomRight: {x: 20, y: 40}
    };

test('translation in same coord system', () => {
    expect(translatePoint(RECT_0_0_10_10, RECT_0_0_10_10,
        {x: 2, y: 3}
    )).toEqual(
        {x: 2, y: 3}
    )
});

test('translation in same quadrant', () => {
    expect(translatePoint(RECT_0_0_10_10, RECT_0_0_20_40,
        {x: 2, y: 3}
    )).toEqual(
        {x: 4, y: 12}
    )
});

import * as transform from 'common/transformMatrixHelpers'

const EYE = [
    [1, 0, 0],
    [0, 1, 0],
    [0, 0, 1]
];

test('translate matrix looks as expected', () => {
    expect(transform.translateMatrix(2, 3)).toEqual([
        [1, 0, 2], [0, 1, 3], [0, 0, 1]
    ])
});


test('multiplication by eye', () => {
    const a = [[2, 2, 2], [2, 2, 2], [2, 2, 2]];
    const b = [[3, 3, 3], [3, 3, 3], [3, 3, 3]];


    expect(transform.multiply(a, b)).toEqual([
        [18, 18, 18], [18, 18, 18], [18, 18, 18]
    ])
});

test('multiplication by eye', () => {
    const matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];

    expect(transform.multiply(EYE, matrix, EYE)).toEqual(matrix)
});

test('transpose eye', () => {
    expect(transform.transpose(EYE)).toEqual(EYE)
});

test('transposose', () => {
    const matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
    expect(transform.transpose(matrix)).toEqual([
        [1, 4, 7], [2, 5, 8], [3, 6, 9]
    ])
});

test('css matrix looks allright', () => {
    const matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];

    expect(transform.cssMatrix(matrix)).toEqual("matrix(1,4,2,5,3,6)")
});

test('point transform', () => {
    const matrix = transform.translateMatrix(3, 4);

    expect(transform.transformPoint(matrix, {x: 1, y: 2})).toEqual({x: 4, y: 6})
});


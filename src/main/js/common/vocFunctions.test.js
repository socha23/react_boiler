import {find} from './vocFunctions'

const VOC = [
    {id: "foo"},
    {id: "bar"}
];

test('find returns voc value if correct id passed', () => {
    expect(find(VOC, "foo")).toBe(VOC[0]);
});
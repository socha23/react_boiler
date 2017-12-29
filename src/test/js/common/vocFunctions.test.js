import {find} from 'common/vocFunctions'

const VOC = [
    {id: "foo"},
    {id: "bar"}
];

const VOC_WITH_DUPLICATES = [
    {id: "foo"},
    {id: "bar"},
    {id: "foo"}
];


test('find returns voc value if correct id passed', () => {
    expect(find(VOC, "foo")).toBe(VOC[0])
});

test('find returns null if incorrect id passed', () => {
    expect(find(VOC, "NIE MA")).toBeNull()
});

test('find returns first matching value', () => {
    expect(find(VOC_WITH_DUPLICATES, "foo")).toBe(VOC_WITH_DUPLICATES[0])
});

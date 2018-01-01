import {isMissing, isInside} from 'tags/tagHelpers'


test('inside tags are inside', () => {
    const tag = {missing: false, inside: true};
    expect(isInside(tag)).toEqual(true)
});

test('inside tags are not missing', () => {
    const tag = {missing: false, inside: true};
    expect(isMissing(tag)).toEqual(false)
});

test('missing tags are not inside', () => {
    const tag = {missing: true, inside: false};
    expect(isInside(tag)).toEqual(false)
});

test('missing tags are missing', () => {
    const tag = {missing: true, inside: false};
    expect(isMissing(tag)).toEqual(true)
});

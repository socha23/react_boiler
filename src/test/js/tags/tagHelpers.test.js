import {isMissing, isInside, isInContainer} from 'tags/tagHelpers'

const INSIDE_TAG = {state: "INSIDE"};
const MISSING_TAG = {state: "MISSING"};
const TAG_IN_CONTAINER = {state: "IN_CONTAINER"};

test('inside tags are inside', () => {
    expect(isInside(INSIDE_TAG)).toEqual(true)
});

test('inside tags are not missing', () => {
    expect(isMissing(INSIDE_TAG)).toEqual(false)
});

test('missing tags are not inside', () => {
    expect(isInside(MISSING_TAG)).toEqual(false)
});

test('missing tags are missing', () => {
    expect(isMissing(MISSING_TAG)).toEqual(true)
});

test('tags in container are in container', () => {
    expect(isInContainer(TAG_IN_CONTAINER)).toEqual(true)
});

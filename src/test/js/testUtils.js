import React from 'react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { mount } from 'enzyme';
import { mountToJson } from 'enzyme-to-json';

export function testSnapshot(elem) {
    return () => {
        expect(mountToJson(mount(elem))).toMatchSnapshot();
    }
}

export function expectElem(elem) {
    return expect(mount(elem))
}

export function expectElemWithProvider(elem, state = {}) {
    return expectElem(withProvider(elem, state))
}

export function elemWithProvider(elem, state = {}) {
    return mount(withProvider(elem, state));
}

export function testSnapshotWithProvider(elem, state = {}) {
    return testSnapshot(withProvider(elem, state))
}

function withProvider(elem, initialState = {}) {
    const store = createStore((state, action) => state, initialState);
    return <Provider store={store}>
            {elem}
        </Provider>
}

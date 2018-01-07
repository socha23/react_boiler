import React from 'react'
import renderer from 'react-test-renderer'
import { createStore } from 'redux'
import { Provider } from 'react-redux'

export function testSnapshot(elem) {
    return () => {
        expect(renderer.create(elem).toJSON()).toMatchSnapshot();
    }
}

export function testSnapshotWithProvider(elem, state = {}) {
    return () => {
        expect(renderWithProvider(elem, state).toJSON()).toMatchSnapshot();
    }
}


export function expectElementToContainText(elem, text) {
    return () => {
        let json = renderer.create(elem).toJSON();
        expect(elemContainsText(json, text)).toBe(true);
    }
}

export function expectElementWithProviderToContainText(elem, state, text) {
    return () => {
        let json = renderWithProvider(elem, state).toJSON();
        expect(elemContainsText(json, text)).toBe(true);
    }
}

export function expectElementWithProviderToNotContainText(elem, state, text) {
    return () => {
        let json = renderWithProvider(elem, state).toJSON();
        expect(elemContainsText(json, text)).toBe(false);
    }
}

export function elemContainsText(obj, text) {
    if (typeof obj == "string") {
        return obj.indexOf(text) >= 0;
    } else if (obj.children) {
        for (let i = 0; i < obj.children.length; i++) {
            if (elemContainsText(obj.children[i], text)) {
                return true;
            }
        }
    }
    return false;
}

export function getStore(initialState) {
    return createStore((state, action) => state, initialState);
}

export function renderWithProvider(elem, state = {}) {
    return renderer.create(
        <Provider store={getStore(state)}>
            {elem}
        </Provider>
    )
}

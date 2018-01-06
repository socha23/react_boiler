import React from 'react'
import renderer from 'react-test-renderer'
import { createStore } from 'redux'
import { Provider } from 'react-redux'

function testSnapshot(elem) {
    return () => {
        expect(renderer.create(elem).toJSON()).toMatchSnapshot();
    }
}

function expectElementToContainText(elem, text) {
    return () => {
        let json = renderer.create(elem).toJSON();
        expect(doExpectElementToContainText(json, text)).toBe(true);
    }
}

function doExpectElementToContainText(obj, text) {
    if (typeof obj == "string") {
        return obj.indexOf(text) >= 0;
    } else if (obj.children) {
        for (let i = 0; i < obj.children.length; i++) {
            if (doExpectElementToContainText(obj.children[i], text)) {
                return true;
            }
        }
    }
    return false;
}

function getStore(initialState) {
    return createStore((state, action) => state, initialState);
}

function renderWithProvider(elem, state = {}) {
    return renderer.create(
        <Provider store={getStore(state)}>
            {elem}
        </Provider>
    )
}

module.exports = {
    testSnapshot,
    getStore,
    renderWithProvider,
    expectElementToContainText
};
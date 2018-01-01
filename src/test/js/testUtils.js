import React from 'react'
import renderer from 'react-test-renderer'
import { createStore } from 'redux'
import { Provider } from 'react-redux'

function testSnapshot(elem) {
    return () => {
        expect(renderer.create(elem).toJSON()).toMatchSnapshot();
    }
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
    renderWithProvider
};
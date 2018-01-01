import React from 'react'

import {renderWithProvider} from '../testUtils'

import {TagRowComponent} from 'testDashboard/TagRow'


it('renders correctly for a tag without position', () => {
    let tag = {id: "id"};
    renderWithProvider(<TagRowComponent tag={tag}/>);
});

it('position change doesnt trigger exception for a tag without position', () => {
    let tag = {id: "id"};
    let component = null;
    renderWithProvider(<TagRowComponent tag={tag} ref={(c) => {component = c}} />);

    component.onChangeX(25);
});

it('position change doesnt trigger exception for a tag without position', () => {
    let tag = {id: "id"};
    let component = null;
    renderWithProvider(<TagRowComponent tag={tag} ref={(c) => {component = c}} />);

    component.onChangeX(25); // shouldn't throw an exception
});

it('when areaName null areaChooserValue is empty', () => {
    let tag = {id: "id"};
    let component = null;
    renderWithProvider(<TagRowComponent tag={tag} ref={(c) => {component = c}} />);

    expect(component.getAreaChooserValue()).toEqual("")
});

it('when areaName not null areaChooserValue is equal to areaName', () => {
    let tag = {id: "id", areaName: "foo"};
    let component = null;
    renderWithProvider(<TagRowComponent tag={tag} ref={(c) => {component = c}} />);

    expect(component.getAreaChooserValue()).toEqual("foo")
});

it('onChangeArea updates areaName, areaId and coordinateSystemId', () => {
    let tag = {id: "id"};
    let component = null;
    renderWithProvider(<TagRowComponent tag={tag} ref={(c) => {component = c}} />);
    component.sendUpdate = jest.fn();

    let newArea = {areaName: "aName", areaId: "aId", coordinateSystemId: "cId"};
    component.onChangeArea(newArea);

    expect(component.sendUpdate.mock.calls[0][0]).toEqual(newArea);
});

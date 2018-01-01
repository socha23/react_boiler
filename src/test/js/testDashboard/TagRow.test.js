import React from 'react'

import {renderWithProvider} from '../testUtils'

import {TagRowComponent} from 'testDashboard/TagRow'


test('renders correctly for a tag without position', () => {
    tagRow({id: "id"});
});

test('position change doesnt trigger exception for a tag without position', () => {
    tagRow({id: "id"}).onChangeX(25); // shouldn't throw an exception
});

test('when areaName null areaChooserValue is empty', () => {
    let component = tagRow({id: "id"});

    expect(component.getAreaChooserValue()).toEqual("")
});

test('when areaName not null areaChooserValue is equal to areaName', () => {
    let component = tagRow({id: "id", areaName: "foo"});

    expect(component.getAreaChooserValue()).toEqual("foo")
});

test('onChangeArea updates areaName, areaId, coordinateSystemId and coordinateSystemName', () => {
    let component = tagRow();
    component.sendUpdate = jest.fn();

    let newArea = {areaName: "aName", areaId: "aId", coordinateSystemId: "cId", coordinateSystemName: "cName"};
    component.onChangeArea(newArea);

    expect(component.sendUpdate.mock.calls[0][0]).toEqual(newArea);
});


test('state attribute "missing" taken from tag', () => {
    let component = tagRow({id: "id", missing: true});

    expect(component.state.missing).toEqual(true)
});

test('state attribute "missing" false by default', () => {
    let component = tagRow({id: "id"});

    expect(component.state.missing).toEqual(false)
});

test('onChangeMissing updates missing', () => {
    let component = tagRow({id: "id"});
    component.sendUpdate = jest.fn();

    component.onChangeMissing(true);

    expect(component.sendUpdate.mock.calls[0][0]).toEqual({missing: true});
});


test('state attribute "inside" taken from tag', () => {
    let component = tagRow({id: "id", inside: true});

    expect(component.state.inside).toEqual(true)
});

test('state attribute "inside" false by default', () => {
    let component = tagRow({id: "id"});

    expect(component.state.inside).toEqual(false)
});

test('onChangeInside updates inside', () => {
    let component = tagRow({id: "id"});
    component.sendUpdate = jest.fn();

    component.onChangeInside(true);

    expect(component.sendUpdate.mock.calls[0][0]).toEqual({inside: true});
});



function tagRow(tag = {id: "tagId"}) {
    let component = null;
    renderWithProvider(<TagRowComponent tag={tag} ref={(c) => {component = c}} />);
    return component;
}

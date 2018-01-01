import React from 'react'

import {renderWithProvider} from '../testUtils'

import {TagRowComponent} from 'testDashboard/TagRow'
import {STATE_MISSING, STATE_INSIDE} from 'tags/tagHelpers'


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



test('state attribute "state" taken from tag', () => {
    let component = tagRow({id: "id", state: STATE_INSIDE});

    expect(component.state.tagState).toEqual(STATE_INSIDE)
});

test('state attribute "state" missing by default', () => {
    let component = tagRow({id: "id"});

    expect(component.state.tagState).toEqual(STATE_MISSING)
});

test('onChangeState updates state', () => {
    let component = tagRow({id: "id"});
    component.sendUpdate = jest.fn();

    component.onChangeTagState(STATE_INSIDE);

    expect(component.sendUpdate.mock.calls[0][0]).toEqual({state: STATE_INSIDE});
});



function tagRow(tag = {id: "tagId"}) {
    let component = null;
    renderWithProvider(<TagRowComponent tag={tag} ref={(c) => {component = c}} />);
    return component;
}

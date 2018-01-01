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


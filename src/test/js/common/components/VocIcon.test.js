import React from 'react'
import {mount} from 'enzyme';

import {expectElem} from '../../testUtils'

import VocIcon from 'common/components/VocIcon'
import {Priority} from 'artifacts/ArtifactVocs';

it('renders text for priority', () => {
    expectElem(<VocIcon value={Priority[0]}/>).toHaveText(Priority[0].iconText)
});

it('renders color for priority', () => {
    expect(
        mount(<VocIcon value={Priority[0]}/>)
            .find(".badge"))
            .toHaveStyle("backgroundColor", Priority[0].color)
});



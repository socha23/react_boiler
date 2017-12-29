import React from 'react'

import {testSnapshot} from '../testUtils'

import Line from 'maps/Line'

it('renders correctly when straight', testSnapshot(
            <Line fromX={0} fromY={0} toX={100} toY={0}/>
));

it('renders correctly when angled', testSnapshot(
            <Line fromX={0} fromY={0} toX={100} toY={50}/>
));

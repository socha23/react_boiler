import React from 'react'
import {testSnapshot} from '../../testUtils'

import {MapComponent} from 'fireteams/app/Map'

it('renders correctly', testSnapshot(
            <MapComponent
                fireteam={{id: "ft1", name: "Team Alpha", tagId: "tA", targetTagId: "tB"}}
                fireteamTag={{id: "tA", position: {x: 100, y: 100}, coordinateSystemId: "coordId"}}
                targetTag={{id: "tB", position: {x: 200, y: 200}, coordinateSystemId: "coordId"}}
                floorPlan={{id: "coordId", base64content: "content", topLeft: {x: 0, y: 0}, bottomRight: {x: 400, y: 400}}}
            />
));

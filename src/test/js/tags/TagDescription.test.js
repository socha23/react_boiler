import React from 'react'
import {expectElem, expectElemWithProvider} from '../testUtils'

import TagDescription from 'tags/TagDescription'

const TAG_FIRETEAM = {
    id: "fireteamTag"
};

const TAG_ARTIFACT = {
    id: "artifactTag"
};

const TAG_WAYPOINT = {
    id: "waypointTag",
    name: "Waypoint"
};

const FIRETEAM = {
    tagId: TAG_FIRETEAM.id,
    name: "Fireteam"
};

const ARTIFACT = {
    tagId: TAG_ARTIFACT.id,
    name: "Artifact"
};

const state = {
    tags: {items: [TAG_FIRETEAM, TAG_ARTIFACT, TAG_WAYPOINT]},
    artifacts: {items: [ARTIFACT]},
    fireteams: {items: [FIRETEAM]}
};





it('contains right text when artifact', () => {
    expectElemWithProvider(
        <TagDescription tag={TAG_ARTIFACT}/>
        , state).toIncludeText("Artifact")
});

it('contains right text when fireteam', () => {
    expectElemWithProvider(
        <TagDescription tag={TAG_FIRETEAM}/>
        , state).toIncludeText("Fireteam")
});

it('contains right text when waypoint', () => {
    expectElemWithProvider(
        <TagDescription tag={TAG_WAYPOINT}/>
        , state).toIncludeText("Waypoint")
});

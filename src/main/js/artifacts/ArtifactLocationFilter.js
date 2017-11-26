import React from 'react'

import {ToggleButtonsFilter, PopupToggleButtonsFilter} from '../common/components/filters'
import {crudList} from '../common/crud/crudContainers'

import {artifactLocator} from "../tags/locatorFunctions"
import {artifactTag} from "../tags/tagFunctions"

function artifactLocationId(a) {
    if (artifactLocator(a)) {
        return "outside";
    } else if (artifactTag(a)) {
        return artifactTag(a).coordinateSystemId;
    } else {
        return null;
    }
}

function locations(maps, artifacts = []) {
    let result = [...maps];
    result.push({
        id: "outside",
        name: "Na zewnątrz"
    });
    result.forEach(loc => {
       let count = artifacts.filter(a => artifactLocationId(a) == loc.id).length;
        if (count > 0) {
            loc.number = count;
        }
    });
    return result;
}


let PopupArtifactLocationFilter = ({filter, items:maps, artifacts=[], onFilterChange}) => <PopupToggleButtonsFilter
    items={locations(maps, artifacts)}
    field="location"
    filter={filter}
    onFilterChange={onFilterChange}
    labelPopupTitle="Wybierz priorytety"
    labelNoSelection="Dowolny priorytet"
/>;
PopupArtifactLocationFilter = crudList({
    resource: "floorPlans",
    onlyOnce: true
}, PopupArtifactLocationFilter);


let ArtifactLocationFilter = ({filter, items:maps, artifacts=[], onFilterChange}) => <ToggleButtonsFilter
    items={locations(maps, artifacts)}
    field="location"
    filter={filter}
    onFilterChange={onFilterChange}
/>;

ArtifactLocationFilter = crudList({
    resource: "floorPlans",
    onlyOnce: true
}, ArtifactLocationFilter);

function locationFilterMatches(artifact, filter) {
    return filter.location[artifactLocationId(artifact)];
}

module.exports = {
    PopupArtifactLocationFilter,
    ArtifactLocationFilter,
    locationFilterMatches
};

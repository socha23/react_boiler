import React from 'react'
import {connect} from 'react-redux'

import {ToggleButtonsFilter, PopupToggleButtonsFilter} from '../common/components/filters'
import {crudList} from '../common/crud/crudContainers'

import {artifactLocator} from "../tags/locatorHelpers"
import {artifactTag} from "../tags/tagHelpers"

function artifactLocationId(a, tags, locators) {
    if (artifactLocator(locators, a)) {
        return "outside";
    } else if (artifactTag(tags, a)) {
        return artifactTag(tags, a).coordinateSystemId;
    } else {
        return null;
    }
}

function locations(maps, artifacts = [], tags = [], locators = []) {
    let result = [];
    maps.forEach(map => {
        result.push({...map});
    });
    result.push({
        id: "outside",
        name: "Na zewnątrz"
    });
    result.forEach(loc => {
       let count = artifacts.filter(a => artifactLocationId(a, tags, locators) == loc.id).length;
        if (count > 0) {
            loc.number = count;
        } else {
            loc.number = null;
        }
    });
    return result;
}


let PopupArtifactLocationFilter = ({filter, items:maps, onFilterChange, artifacts=[], tags=[], locators=[]}) => <PopupToggleButtonsFilter
    items={locations(maps, artifacts, tags, locators)}
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


let ArtifactLocationFilter = ({filter, items:maps, onFilterChange, artifacts=[], tags=[], locators=[]}) => <ToggleButtonsFilter
    items={locations(maps, artifacts, tags, locators)}
    field="location"
    filter={filter}
    onFilterChange={onFilterChange}
/>;

ArtifactLocationFilter = crudList({
    resource: "floorPlans",
    onlyOnce: true
}, ArtifactLocationFilter);

function locationFilterMatches(artifact, filter, tags, locators) {
    return filter.location[artifactLocationId(artifact, tags, locators)];
}

const mapStateToProps = (state, ownProps) => {
    return {
        tags: state.tags.items,
        locators: state.locators.items
    };
};

module.exports = {
    PopupArtifactLocationFilter: connect(mapStateToProps)(PopupArtifactLocationFilter),
    ArtifactLocationFilter: connect(mapStateToProps)(ArtifactLocationFilter),
    locationFilterMatches
};

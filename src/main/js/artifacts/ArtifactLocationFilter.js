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

function filterWithLocationArtifactIds(filter, artifacts, tags, locators) {
    let result = {...filter};
    if (filter.location) {
        let ids = {};
        artifacts.forEach(a => {
            if (filter.location[artifactLocationId(a, tags, locators)]) {
                ids[a.id] = a.id;
            }
        });
        result.locationArtifactIds = ids;
    } else {
        delete result.locationArtifactIds;
    }
    return result;
}

let PopupArtifactLocationFilter = ({filter, onFilterChange, floorPlans=[], artifacts=[], tags=[], locators=[]}) => <PopupToggleButtonsFilter
    items={locations(floorPlans, artifacts, tags, locators)}
    field="location"
    filter={filter}
    onFilterChange={(f) => onFilterChange(filterWithLocationArtifactIds(f, artifacts, tags, locators))}
    labelPopupTitle="Wybierz priorytety"
    labelNoSelection="Dowolny priorytet"
/>;

let ArtifactLocationFilter = ({filter, onFilterChange, floorPlans=[], artifacts=[], tags=[], locators=[]}) => <ToggleButtonsFilter
    items={locations(floorPlans, artifacts, tags, locators)}
    field="location"
    filter={filter}
    onFilterChange={(f) => onFilterChange(filterWithLocationArtifactIds(f, artifacts, tags, locators))}
/>;

const mapStateToProps = (state, ownProps) => {
    return {
        artifacts: state.artifacts.items,
        tags: state.tags.items,
        locators: state.locators.items,
        floorPlans: state.floorPlans.items
    };
};

module.exports = {
    PopupArtifactLocationFilter: connect(mapStateToProps)(PopupArtifactLocationFilter),
    ArtifactLocationFilter: connect(mapStateToProps)(ArtifactLocationFilter)
};

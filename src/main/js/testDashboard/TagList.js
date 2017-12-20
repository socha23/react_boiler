import React from 'react'
import {connect} from 'react-redux'

import {tagTypeByTagId} from '../tags/tagHelpers'

import TagRow from './TagRow'

const TagList = ({tags}) =>
    <table className="table table-striped table-hover">
        <tbody>
        {tags.map(t =>
            <TagRow key={t.id} tag={t}/>
        )}
        </tbody>
    </table>;

const mapStateToProps = (state) => {
    let tagTypes = tagTypeByTagId(state.tags.items, state.artifacts.items, state.fireteams.items);
    return {
        tags: [...state.tags.items].sort(typeComparator(tagTypes))
    }
};

function typeComparator(tagTypes) {
    return (a, b) => {
        let typeA = tagTypes[a.id];
        let typeB = tagTypes[b.id];

        if (typeA < typeB) {
            return -1;
        } else if (typeB < typeA) {
            return 1;
        } else {
            return 0;
        }
    }
}

export default connect(mapStateToProps)(TagList);
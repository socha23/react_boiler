import React from 'react'
import {connect} from 'react-redux'

import {getAllTags} from '../tags/selectors'

import TagRow from './TagRow'

const TagList = ({tags}) =>
    <table className="table table-striped table-hover">
        <tbody>
        {tags.map(t =>
            <TagRow key={t.id} tag={t}/>
        )}
        </tbody>
    </table>;

const mapStateToProps = (state) => ({tags: getAllTags(state)});

export default connect(mapStateToProps)(TagList);
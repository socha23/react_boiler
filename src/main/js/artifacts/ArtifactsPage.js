import React from 'react'
import {crudList} from '../common/crud/crudContainers'
import ArtifactsList from './ArtifactsList'

var ArtifactsPage = ({items}) => <div>
    <ArtifactsList items={items}/>
</div>;

export default crudList("artifacts", ArtifactsPage)
import React from 'react'
import {crudList} from '../common/crud/crudContainers'
import ArtifactsList from './ArtifactsList'

var ArtifactsPage = ({items}) => <div className="container-fluid">
        <div className="row">
            <div className="col-sm-2">
            </div>
            <div className="col-sm-5">
                <ArtifactsList items={items}/>
            </div>
            <div className="col-sm-5">
            </div>
        </div>






</div>;

export default crudList("artifacts", ArtifactsPage)
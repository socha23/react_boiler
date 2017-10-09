import React from 'react'
import {crudList} from '../common/crud/crudContainers'
import ArtifactsList from './ArtifactsList'
import {Panel, PanelWithTitle} from '../common/components/Panel'
import ArtifactForm from './ArtifactForm'
import {EnumFilter} from '../common/components/filters'
import {Priority, Type} from './ArtifactVocs'

var ArtifactsPage = ({items}) => <div className="container-fluid">
        <div className="row">
            <div className="col-sm-2 colWithSmallerGutter">
                <Panel>
                    <p><b>Typ muzealiów</b></p>
                    <EnumFilter items={Type}/>
                </Panel>
                <Panel>
                    <p><b>Priorytet</b></p>
                    <EnumFilter items={Priority}/>
                </Panel>
            </div>
            <div className="col-sm-5 colWithSmallerGutter">
                <Panel>
                    <ArtifactsList items={items}/>
                </Panel>
            </div>
            <div className="col-sm-5 colWithSmallerGutter">
                <Panel>
                    <ArtifactForm item={{}} submitText="Zapisz"/>
                </Panel>
            </div>
        </div>






</div>;

export default crudList("artifacts", ArtifactsPage)
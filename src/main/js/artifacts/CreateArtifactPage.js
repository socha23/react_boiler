import React from 'react'
import {Priority, Type} from './ArtifactVocs'
import {crudActions} from '../common/crud/crudContainers'

import ArtifactForm from './ArtifactForm'

const CreateArtifactPage = (props) => (
    <div>
        <h1>Create new artifact</h1>
        <ArtifactForm
            {...props}
            submitText = "Create"
            item = {{
                name: '',
                type: Type[0].id,
                priority: Priority[0].id,
                weight: null,
                dimensions: {},
                identificationNotes: '',
                evacuationNotes: ''
            }}
            afterSubmit = {{
                growl: "Artifact created",
                redirectTo: "/artifacts"
            }}
            onSubmit={props.onCreate}
            />
    </div>
);

export default crudActions("artifacts", CreateArtifactPage)


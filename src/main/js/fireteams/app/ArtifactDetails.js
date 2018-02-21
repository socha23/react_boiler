import React from 'react'

const ArtifactDetails = ({artifact}) => <div style={{marginTop: 5, fontSize: 20, color: "white"}}>
    <div>{artifact.identificationNotes}</div>
    <div>{artifact.evacuationNotes}</div>
</div>;

export default ArtifactDetails


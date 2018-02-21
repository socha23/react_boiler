import React from 'react'

import contextPath from '../../common/contextPath'

const ArtifactImage = ({artifact}) => artifact.images ?
    <div style={{flex: "1 1 auto", overflow: "hidden"}}>
        <img style={{maxWidth: "100%", maxHeight: "100%"}}
            src={contextPath() + "/api/images/" + artifact.images[0].id}/>
    </div>
    : <div/>;

export default ArtifactImage



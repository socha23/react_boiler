import React from 'react'
import {connect} from 'react-redux'

import {findArtifactByTagId} from '../../artifacts/selectors'

const ArtifactDetails = ({artifact}) => <div>
    {artifact.name}
</div>;


export default connect((state, {fireteam}) => ({
    artifact: findArtifactByTagId(state, fireteam.targetTagId)
}))(ArtifactDetails);


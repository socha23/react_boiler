import React from 'react'
import {connect} from 'react-redux'

import {getTargetTag} from '../selectors'

export const TargetBarComponent = ({targetTag}) => <div style={{
    backgroundColor: "black",
    padding: 10,
    color: "white",
    fontSize: 30

}}>
    <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    }}>
        {targetTag ? targetTag.label : "Brak wyznaczonego celu"}
    </div>
</div>;


export default connect((state, {fireteam}) => ({
    targetTag: getTargetTag(state, fireteam)
}))(TargetBarComponent)


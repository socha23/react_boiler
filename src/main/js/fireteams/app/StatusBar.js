import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

import Fullscreen from '../../common/components/Fullscreen'

import {getFireteamTag, getTargetTag} from '../selectors'

import Map from './Map'



export const StatusBarComponent = ({fireteamTag, targetTag, targetName}) => <BlackBar>
    {
        targetTag ?
            <Target fireteamTag={fireteamTag} targetTag={targetTag}/>
            :
            <NoTarget/>
    }
</BlackBar>;


export default connect((state, {fireteam}) => ({
    fireteamTag: getFireteamTag(state, fireteam),
    targetTag: getTargetTag(state, fireteam)
}))(StatusBarComponent)

const BlackBar = ({children}) => <div style={{
        backgroundColor: "black",
        paddingTop: 10,
        color: "white",
        fontSize: 30

}}>
    <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    }}>
        {children}
    </div>
</div>;

const NoTarget = () => <div>
    Brak wyznaczonego celu
</div>;

const Target = ({fireteamTag, targetTag}) => <div>
    {targetTag.label}
</div>;


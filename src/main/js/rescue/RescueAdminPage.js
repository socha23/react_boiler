import React from 'react'
import FireteamsBrowserContainer from '../fireteams/FireteamsBrowserContainer'
import Panel from '../common/components/Panel'

export default () => <div className="container-fluid">
        <div className="row">
            <div className="col-sm-4 colWithSmallerGutter">
                <Panel>
                    <FireteamsBrowserContainer/>
                </Panel>
            </div>
        </div>
</div>

import React from 'react'
import FireteamsBrowserContainer from '../fireteams/FireteamsBrowserContainer'
import PanelWithTitle from '../common/components/PanelWithTitle'

export default () => <div className="container-fluid">
        <div className="row">
            <div className="col-sm-4 colWithSmallerGutter">
                <PanelWithTitle title="Roty strażackie">
                    <FireteamsBrowserContainer/>
                </PanelWithTitle>
            </div>
        </div>
</div>

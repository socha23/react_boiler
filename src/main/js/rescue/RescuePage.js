import React from 'react'
import {connect} from 'react-redux'

import Panel from '../common/components/Panel'

import FireteamsTabPanel from '../fireteams/FireteamsTabPanel'

const RescuePage = ({fireteams}) => <div className="container-fluid">
    <div className="row">
        <div className="col-sm-3 colWithSmallerGutter">
            <Panel>
                Lista celów
            </Panel>
        </div>
        <div className="col-sm-9 colWithSmallerGutter">
            <Panel>
                Mapa
            </Panel>
            <FireteamsTabPanel fireteams={fireteams}/>
        </div>
    </div>
</div>;

const mapStateToProps = (state) => ({
    fireteams: state.fireteams.items
});

export default connect(mapStateToProps)(RescuePage)




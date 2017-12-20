import React from 'react'

import Panel from '../common/components/Panel'

import TagList from './TagList'

const Dashboard = () =>
        <div className="container">
            <div className="row">
                <div className="col-sm-12 colWithSmallerGutter">
                    <Panel>
                        <TagList/>
                    </Panel>
                </div>
            </div>
        </div>;

export default Dashboard;



import React from 'react'

import {ResourceLoader} from '../common/crud/crudContainers'
import Dashboard from '../testDashboard/Dashboard'

export default () => <ResourceLoader resources={["artifacts", "floorPlans", "fireteams"]}>
    <ResourceLoader resources={["tags", "locators"]} interval={500}>
        <Dashboard/>
    </ResourceLoader>
</ResourceLoader>;


import React from 'react'
import { render} from 'react-dom'
import { Provider } from 'react-redux'
import {BrowserRouter} from 'react-router-dom'
import store from './store'

import AppSelect from './apps/AppSelect'

render((
    <Provider store={store}>
        <BrowserRouter basename={CONTEXT_PATH}>
            <AppSelect/>
        </BrowserRouter>
    </Provider>
), document.getElementById('app'));

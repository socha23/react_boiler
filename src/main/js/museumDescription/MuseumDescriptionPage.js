import React from 'react'
import {PropTypes} from 'prop-types'
import {connect} from 'react-redux'

import {crudActions} from '../common/crud/crudContainers'

import {getMuseumDescription} from './selectors'
import MuseumDescription from './EditableMuseumDescription'


const MuseumDescriptionPage = ({value, onUpdate}) => <div className="container-fluid">
    <MuseumDescription value={value} onChange={onUpdate}/>
</div>;

const mapStateToProps = (state) => ({
    value: getMuseumDescription(state)
});

export default connect(mapStateToProps)(
    crudActions("museumDescriptions", MuseumDescriptionPage)
);
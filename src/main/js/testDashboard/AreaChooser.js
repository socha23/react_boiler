import React from 'react'
import {connect} from 'react-redux'

const AreaChooser = ({value = "", areas = [], areasByName = {}, onChange = () => {}}) =>
    <select value={value} onChange={e => onChange(areasByName[e.target.value])}>
        {areas.map(a =>
            <option key={a.areaName} value={a.areaName}>{a.areaName}</option>
        )}
    </select>;

const mapStateToProps = (state, ownProps) => {
    let areas = [];
    let areasByName = {};
    if (state.floorPlans && state.floorPlans.items) {
        state.floorPlans.items.forEach(fp => {
            fp.areas.forEach(a => {
                let newArea = {areaName: a.name, areaId: a.id, coordinateSystemId: fp.id};
                areas.push(newArea);
                areasByName[newArea.areaName] = newArea;
            });
        });
    }
    return {areas, areasByName};
};

export default connect(mapStateToProps)(AreaChooser);
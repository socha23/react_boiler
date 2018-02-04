import React from 'react'
import {connect} from 'react-redux'
import Slider from 'react-rangeslider'

import contextPath from '../common/contextPath'
import {crudActions} from '../common/crud/crudContainers'

import {getTagDescription} from '../tags/selectors-additional'

import {tagColorsByTagId, TAG_STATES} from '../tags/tagHelpers'

import AreaChooser from './AreaChooser'

export class TagRowComponent extends React.Component {
    static defaultProps = {
        tag: {},
        color: "",
        description: "",
        floorPlan: {topLeft: {x: 0, y: 0}, bottomRight: {x: 1, y: 1}},
        onUpdate: () => {
        }
    };

    state = {
        x: this.props.tag.position ? this.props.tag.position.x : 0,
        y: this.props.tag.position ? this.props.tag.position.y : 0,
        tagState: this.props.tag.state || TAG_STATES.MISSING,
        areaName: this.props.tag.areaName
    };

    onChangeArea = ({areaName, areaId, coordinateSystemId, coordinateSystemName}) => {
        this.setState({areaName: areaName});
        this.sendUpdate({
            areaId: areaId,
            areaName: areaName,
            coordinateSystemId: coordinateSystemId,
            coordinateSystemName: coordinateSystemName
        });
    };

    onChangeTagState = (tagState) => {
        this.setState({tagState: tagState});
        this.sendUpdate({
            state: tagState
        });
    };

    onChangeX = (x) => {
        x = this.sliderToPos(x, "x");
        this.setState({x: x});
        let currentPos = this.props.tag.position;
        this.sendUpdate({position: {...currentPos, x: x}});
    };

    onChangeY = (y) => {
        y = this.sliderToPos(y, "y");
        this.setState({y: y});
        let currentPos = this.props.tag.position;
        this.sendUpdate({position: {...currentPos, y: y}});
    };

    sliderToPos = (val, field) => {
        let fp = this.props.floorPlan;

        let from = fp.topLeft[field];
        let to = fp.bottomRight[field];

        return (from + (val / 100) * (to - from));
    };

    posToSlider = (val, field) => {
        let fp = this.props.floorPlan;
        let from = fp.topLeft[field];
        let to = fp.bottomRight[field];

        return (val - from) / (to - from) * 100;

    };

    sendUpdate = (changes) => {
        let oldTag = this.props.tag;
        let newTag = {
            ...oldTag,
            ...changes,
            _links: {
                self: {
                    href: contextPath() + "/api/tags/" + oldTag.id
                }
            }
        };
        this.props.onUpdate(newTag);
    };

    getAreaChooserValue = () => {
        return this.state.areaName || ""
    };

    render = () => {
        return <tr>
            <td>
            <span className="badge" style={{backgroundColor: this.props.color}}>
                {this.props.description}
            </span>
            </td>
            <td style={{width: 200}}>
                <div>
                    <Slider value={this.posToSlider(this.state.x, "x")} onChange={this.onChangeX}/>
                </div>
            </td>
            <td style={{width: 200}}>
                <div>
                    <Slider value={this.posToSlider(this.state.y, "y")} onChange={this.onChangeY}/>
                </div>
            </td>
            <td>
                <AreaChooser value={this.getAreaChooserValue()} onChange={this.onChangeArea}/>
            </td>
            <td>
                <div className="radio">
                    <label>
                        <input type="radio"
                               value={TAG_STATES.MISSING}
                               checked={this.state.tagState == TAG_STATES.MISSING}
                               onChange={e => this.onChangeTagState(e.target.value)}/>
                        Missing
                    </label>
                </div>
                <div className="radio">
                    <label>
                        <input type="radio"
                               value={TAG_STATES.INSIDE}
                               checked={this.state.tagState == TAG_STATES.INSIDE}
                               onChange={e => this.onChangeTagState(e.target.value)}/>
                        Inside
                    </label>
                </div>
            </td>
        </tr>
    };
}

const mapStateToProps = (state, ownProps) => ({
    description: getTagDescription(state, ownProps.tag),
    color: tagColorsByTagId(state.tags.items, state.artifacts.items, state.fireteams.items)[ownProps.tag.id],
    floorPlan: state.floorPlans.items.find(fp => fp.id == ownProps.tag.coordinateSystemId)
});

export default crudActions("tags", (connect(mapStateToProps)(TagRowComponent)));
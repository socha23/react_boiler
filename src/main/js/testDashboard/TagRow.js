import React from 'react'
import {connect} from 'react-redux'

import {tagDescriptionsByTagId, tagColorsByTagId} from '../tags/tagHelpers'

class TagRow extends React.Component {
    static defaultProps = {
        tag: {},
        color: "",
        description: ""
    };

    state = {
        x: this.props.tag.position.x,
        y: this.props.tag.position.y
    };

    onChangeX = (x) => {
        this.setState({x: x});
    };

    onChangeY = (y) => {
        this.setState({y: y});
    };

    render = () => <tr>
        <td>
            <span className="badge" style={{backgroundColor: this.props.color}}>
                {this.props.description}
            </span>
        </td>
        <td>
            <input type="number" value={this.state.x} onChange={(e) => this.onChangeX(parseInt(e.target.value))}/>
        </td>
        <td>
            <input type="number" value={this.state.y} onChange={(e) => this.onChangeY(parseInt(e.target.value))}/>
        </td>
    </tr>;
}

const mapStateToProps = (state, ownProps) => ({
    description: tagDescriptionsByTagId(state.tags.items, state.artifacts.items, state.fireteams.items)[ownProps.tag.id],
    color: tagColorsByTagId(state.tags.items, state.artifacts.items, state.fireteams.items)[ownProps.tag.id]
});

export default connect(mapStateToProps)(TagRow);
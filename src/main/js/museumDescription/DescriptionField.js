import React from 'react'
import {PropTypes} from 'prop-types'
import PanelWithTitle from "../common/components/PanelWithTitle";

class DescriptionField extends React.Component {

    static propTypes = {
        title: PropTypes.string.isRequired,
        onChange: PropTypes.func,
        value: PropTypes.string
    };

    static defaultProps = {
        onChange: () => {},
        value: ""
    };

    state = {
        editMode: false,
        editValue: ""
    };

    render = () => <PanelWithTitle title={this.props.title}>
        {this.state.editMode ? this.renderEditMode() : this.renderViewMode()}
    </PanelWithTitle>;

    renderEditMode = () => <div>
        <textarea
            className="form-control"
            value={this.state.editValue}
            onChange={(e) => this.setState({editValue: e.target.value})}
        />
        <a className="btn btn-success" onClick={this.onSave}>
            Zapisz
        </a>
    </div>;

    renderViewMode = () => <div>
        {this.props.value}
        <a onClick={this.onEdit}>
            (zmień)
        </a>
    </div>;

    onEdit = () => {
        this.setState({
            editMode: true,
            editValue: this.props.value
        })
    };

    onSave = () => {
        this.props.onChange(this.state.editValue);
        this.setState({
            editMode: false
        })
    };

}

export default DescriptionField;
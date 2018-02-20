import React from 'react'
import {PropTypes} from 'prop-types'
import PanelWithTitle from "../common/components/PanelWithTitle";

class DescriptionField extends React.Component {

    static propTypes = {
        title: PropTypes.string.isRequired,
        onChange: PropTypes.func,
        value: PropTypes.string,
        readOnly: PropTypes.bool
    };

    static defaultProps = {
        onChange: () => {
        },
        value: "",
        readOnly: false
    };

    state = {
        editMode: false,
        editValue: ""
    };

    render = () => <div {...this.props}>
        <PanelWithTitle title={this.props.title}>
            {this.state.editMode ? this.renderEditMode() : this.renderViewMode()}
        </PanelWithTitle>
    </div>;

    renderEditMode = () => <div
        style={{minHeight: 200, display: "flex", flexDirection: "column"}}
    >
        <textarea
            style={{flexGrow: 1}}
            className="form-control"
            value={this.state.editValue}
            onChange={(e) => this.setState({editValue: e.target.value})}
        />
        <div style={{marginTop: 5}}>
            <a className="btn btn-success" onClick={this.onSave}>
                Zapisz
            </a>
        </div>
    </div>;

    renderViewMode = () => <div
        style={{minHeight: 200, display: "flex", flexDirection: "column"}}
    >
        <div style={{flexGrow: 1}}>
            <pre style={{
                border: 0,
                backgroundColor: "transparent",
                fontFamily: '"Helvetica Neue",Helvetica,Arial,sans-serif',
                fontSize: 14
            }}>
                {this.props.value}
            </pre>
        </div>
        {this.props.readOnly ? <div/> :
            <div>
                <a onClick={this.onEdit} style={{cursor: "pointer"}}>
                    zmień
                </a>
            </div>
        }
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
import React, {Component, PropTypes} from 'react'

const TextAreaEditor = React.createClass({
    getDefaultProps: function () {
        return {
            onChange: () => {
            },
            editLinkText: "",
            required: false,
            placeholder: ""
        }
    },

    getInitialState: function () {
        return {
            startingValue: this.props.value,
            currentValue: "",
            editMode: false
        }
    },

    render: function () {
        this.element = null;

        if (!this.state.editMode) {
            return <span>
                {this.props.children}
                <a style={{cursor: "pointer"}} onClick={this.onEnterEditMode}>
                    <span>{this.props.editLinkText}</span>
                    <span style={{marginLeft: "6px"}} className="glyphicon glyphicon-pencil"/>
                </a>
            </span>
        } else {
            let myPlaceholder = this.props.placeholder + (this.props.required ? " (required)" : "");


            return <div className="form-group">
                <textarea
                    className="form-control"
                    ref={r => this.element = r}
                    value={this.state.currentValue}
                    placeholder={myPlaceholder}
                    onBlur={this.onBlur}
                    onChange={this.onChange}
                />
                <div className="editorButtons">
                    <a className="btn btn-xs btn-success glyphicon glyphicon-ok" onClick={this.onSave}
                       disabled={this.isSaveDisabled()} alt="save"/>
                    <a className="btn btn-xs btn-danger glyphicon glyphicon-remove" onClick={this.onCancel}
                       alt="cancel"/>
                </div>

            </div>
        }
    },

    isSaveDisabled: function () {
        return this.props.required && this.state.currentValue.trim() == ""
    },

    onChange: function (e) {
        this.setState({currentValue: e.target.value});
    },

    onEnterEditMode: function () {
        this.setState({editMode: true, currentValue: this.state.startingValue});
        setTimeout(() => {
            this.element.focus();
            this.element.setSelectionRange(0, this.state.currentValue.length);
        })
    },

    leaveEditMode: function () {
        this.setState({editMode: false});
    },

    onBlur: function () {
        // to fajnie wygląda, ale wcale nie jest takie wygodne w użytkowaniu
        //setTimeout(() => {this.setState({editMode: false})}, 200);
    },

    onCancel: function () {
        this.leaveEditMode();
    },

    onSave: function () {
        if (this.isSaveDisabled()) {
            return;
        }
        if (this.state.currentValue != this.state.startingValue) {
            this.props.onChange(this.state.currentValue);
        }
        this.leaveEditMode();
    }
});

TextAreaEditor.propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func
};

export default TextAreaEditor
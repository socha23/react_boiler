import React from 'react'
import PropTypes from 'prop-types'

const InputTextEditor = React.createClass({
    getDefaultProps: function () {
        return {
            onChange: () => {
            },
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
            return <span className="inputTextEditor inputTextEditorDisabled">
                {this.props.children}
                <a className="glyphicon glyphicon-pencil" onClick={this.onEnterEditMode}/>
            </span>
        } else {
            let myPlaceholder = this.props.placeholder + (this.props.required ? " (required)" : "");


            return <form onSubmit={this.onSave} className="form-inline">
                <input
                    style={{width: 400}}
                    className="form-control"
                    ref={r => this.element = r}
                    value={this.state.currentValue}
                    placeholder={myPlaceholder}
                    onBlur={this.onBlur}
                    onChange={this.onChange}
                />

                <span className="editorButtons" style={{marginLeft: 10}}>
                    <a className="btn btn-xs btn-success glyphicon glyphicon-ok" onClick={this.onSave}
                       disabled={this.isSaveDisabled()} alt="save"/>
                    <a className="btn btn-xs btn-danger glyphicon glyphicon-remove" onClick={this.onCancel}
                       alt="cancel"/>
                </span>
            </form>
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

    onBlur: function () {
        // to fajnie wygląda, ale wcale nie jest takie wygodne w użytkowaniu
        //setTimeout(() => {this.setState({editMode: false})}, 200);
    },

    onCancel: function () {
        this.setState({editMode: false});
    },

    onSave: function () {
        if (this.isSaveDisabled()) {
            return;
        }
        if (this.state.currentValue != this.state.startingValue) {
            this.props.onChange(this.state.currentValue);
        }
        this.setState({editMode: false});
    }
});

InputTextEditor.propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func
};

export default InputTextEditor
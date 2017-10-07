import React, {Component} from 'react'
import PropTypes from 'prop-types'

class ArtifactForm extends React.Component {

    state = {
        isSubmitting: false,
        item: {weight: '' + this.props.item.weight, ...this.props.item}
    };

    changeField = fld => {
        return e => {
            var newItem = {...this.state.item};
            newItem[fld] = e.target.value;
            this.setState({item: newItem})
        }
    };

    render() {
        return <form onSubmit={this.onSubmit.bind(this)}>
            <div className="form-group">
                <label htmlFor="artifactName">Name</label>
                <input
                    type="text"
                    value={this.state.item.name}
                    onChange={this.changeField("name")}
                    className="form-control"
                    id="artifactName"
                    placeholder="Please enter artifact name"/>
            </div>

            <div className="form-group">
                <label htmlFor="artifactWeight">Weight</label>
                <input
                    type="number"
                    value={this.state.item.weight}
                    onChange={this.changeField("weight")}
                    className="form-control"
                    id="artifactWeight"
                    placeholder="Please enter weight (kg)"
                />
            </div>

            <button type="submit"
                    className="btn btn-lg btn-primary"
                    disabled={!this.canSubmit()}
            >{this.props.submitText}</button>
        </form>
    }


    canSubmit() {
        return !this.props.isSubmitting
    }

    onSubmit(e) {
        e.preventDefault();

        var item = {...this.state.item, weight: parseFloat(this.state.item.weight)};

        if (this.props.onSubmit) {
            console.log(item);
            this.props.onSubmit(item);
        }
    }
}

ArtifactForm.propTypes = {
    isSubmitting: PropTypes.bool,
    item: PropTypes.object,
    submitText: PropTypes.string,
    onSubmit: PropTypes.func
};

ArtifactForm.defaultProps = {
    isSubmitting: false,
    item: {name: '', weight: ''},
    submitText: "Submit",
    onSubmit: () => {
    }
};


export default ArtifactForm
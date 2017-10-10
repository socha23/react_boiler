import React from 'react'
import PropTypes from 'prop-types'

export default class SearchInput extends React.Component {

    state = {
        value: this.props.value,
        currentSearch: this.props.value
    };

    canSearch = () => this.state.value != this.state.currentSearch;

    onChange = (e) => {
        this.setState({value: e.target.value});
    };

    onKeyDown = (e) => {
        if (e.keyCode == 13) {
            e.preventDefault();
            this.onSearch();
        }
    };

    onSearch = () => {
        if (this.canSearch()) {
            this.state.currentSearch = this.state.value;
            this.props.onSearch(this.state.currentSearch);
        }
    };

    render() {
        return <div className="input-group">
            <input
                type="text"
                className="form-control"
                value={this.state.value}
                placeholder={this.props.placeholder}
                onBlur={this.onSearch}
                onChange={this.onChange}
                onKeyDown={this.onKeyDown}
            />
            <div className="input-group-addon" onClick={this.onSearch} style={{cursor: "pointer"}}>
                <i className="glyphicon glyphicon-search"/>
            </div>
        </div>
    }

}

SearchInput.propTypes = {
    onSearch: PropTypes.func,
    placeholder: PropTypes.string,
    value: PropTypes.string
};

SearchInput.defaultProps = {
    onSearch: () => {},
    placeholder: "Search",
    value: ""
};

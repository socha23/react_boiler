import React, {Component, PropTypes} from 'react'

const SearchInput = React.createClass({

    getDefaultProps: function () {
        return {
            onSearch: () => {},
            value: ""
        }
    },

    getInitialState: function () {
        return {
            value: this.props.value,
            currentSearch: this.props.value
        }
    },

    render: function () {
        return <div className="input-group">
            <input
                    type="text"
                    className="form-control"
                    value={this.state.value}
                    placeholder="Search"
                    onBlur={this.onSearch}
                    onChange={this.onChange}
                    onKeyDown={this.onKeyDown}
                />
                <div className="input-group-addon" onClick={this.onSearch} style={{cursor: "pointer"}}>
                    <i className="glyphicon glyphicon-search"/>
                </div>
            </div>


    },

    canSearch: function() {
        return this.state.value != this.state.currentSearch;
    },

    onSearch: function() {
        if (this.canSearch()) {
            this.state.currentSearch = this.state.value;
            this.props.onSearch(this.state.currentSearch);
            console.log("SEARCH! ", this.state.currentSearch);

        }
    },

    onKeyDown: function(e) {
        if (e.keyCode == 13) {
            e.preventDefault();
            this.onSearch();
        }
    },

    onChange: function (e) {
        this.setState({value: e.target.value});
    }
});

SearchInput.propTypes = {
    onSearch: PropTypes.func,
    value: PropTypes.string
};

export default SearchInput
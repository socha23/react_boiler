import React from 'react'
import ToggleButtons from './ToggleButtons'
import PropTypes from 'prop-types'

export class EnumFilter extends React.Component {

    state = {
        filter: this.props.filter || this.props.field
    };

    componentWillReceiveProps(nextProps) {
        this.setState({...this.state, filter: nextProps.filter});
    };

    onSelectionChange = (selection) => {
        var newFilter = {...this.state.filter};

        if (Object.keys(selection).length == 0) {
            delete newFilter[this.props.field]
        } else {
            newFilter[this.props.field] = selection;
        }
        this.setState({...this.state, filter: newFilter});
        if (this.props.onFilterChange) {
            this.props.onFilterChange(newFilter);
        }
    };

    render() {
        return <div>
            <ToggleButtons
                items={this.props.items}
                selected={this.state.filter[this.props.field]}
                onSelectionChange={this.onSelectionChange}
            />
        </div>
    }
}

EnumFilter.propTypes = {
    items: PropTypes.array,
    filter: PropTypes.object,
    field: PropTypes.string,
    onFilterChange: PropTypes.func
};
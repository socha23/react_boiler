import React from 'react'
import {PropTypes} from 'prop-types'
import {crudList, crudActions} from '../common/crud/crudContainers'
import {LocatorsList} from './LocatorsList'
import {Panel, PanelWithTitle} from '../common/components/Panel'

const BrowseLocatorsPage = ({items, filter, onFilterChange, selected, onSelect}) =>
    <div className="container-fluid">
        <div className="row">
            <div className="col-sm-5 colWithSmallerGutter">
                <Panel>
                    <LocatorsList selected={selected} items={items} onSelect={onSelect}/>
                </Panel>
            </div>
        </div>
    </div>;


class BrowseLocatorsPageContainer extends React.Component {
    state = {
        filter: {}
    };

    onFilterChange = (filter) => {
        this.setState({filter: filter});
    };

    onSelectLocator = (item) => {
        this.context.router.history.push("/tags/locators/" + item.id);
    };

    filterItems = (items) => {
        let currentFilter = this.state.filter;
        return items.filter(i => {
            return true;
        });
    };

    render() {
        return <BrowseLocatorsPage
            {...this.props}
            items={this.filterItems(this.props.items)}
            selected={this.props.items.find(i => i.id == this.props.match.params.id)}
            onSelect={this.onSelectLocator}
            filter={this.state.filter}
            onFilterChange={this.onFilterChange}
        />
    }
}

BrowseLocatorsPageContainer.contextTypes = {
    router: PropTypes.shape({
        history: PropTypes.object.isRequired
    })
};

export default crudList("locators", BrowseLocatorsPageContainer)
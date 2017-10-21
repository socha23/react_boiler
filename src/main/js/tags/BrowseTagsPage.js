import React from 'react'
import {PropTypes} from 'prop-types'
import {crudList, crudActions} from '../common/crud/crudContainers'
import {TagsList} from './TagsList'
import {Panel, PanelWithTitle} from '../common/components/Panel'

const BrowseTagsPage = ({items, filter, onFilterChange, selected, onSelectItem}) =>
    <div className="container-fluid">
        <div className="row">
            <div className="col-sm-5 colWithSmallerGutter">
                <Panel>
                    <TagsList selected={selected} items={items} onSelectItem={onSelectItem}/>
                </Panel>
            </div>
        </div>
    </div>;


class BrowseTagsPageContainer extends React.Component {
    state = {
        filter: {}
    };

    onFilterChange = (filter) => {
        this.setState({filter: filter});
    };

    onSelectTag = (item) => {
        this.context.router.history.push("/tags/" + item.id);
    };

    filterItems = (items) => {
        let currentFilter = this.state.filter;
        return items.filter(i => {
            return true;
        });
    };

    render() {
        return <BrowseTagsPage
            {...this.props}
            items={this.filterItems(this.props.items)}
            selected={this.props.items.find(i => i.id == this.props.match.params.id)}
            onSelect={this.onSelectTag}
            filter={this.state.filter}
            onFilterChange={this.onFilterChange}
        />
    }
}

BrowseTagsPageContainer.contextTypes = {
    router: PropTypes.shape({
        history: PropTypes.object.isRequired
    })
};

export default crudList("tags", BrowseTagsPageContainer)
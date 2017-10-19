import React from 'react'
import {PropTypes} from 'prop-types'
import {crudList, crudActions} from '../common/crud/crudContainers'
import {MapList} from './MapList'
import FloorPlan from './FloorPlan'
import {Panel, PanelWithTitle} from '../common/components/Panel'

const BrowseMapsPage = ({items, filter, onFilterChange, selected, onSelectItem}) =>
    <div className="container-fluid">
        <div className="row">
            <div className="col-sm-6 colWithSmallerGutter">
                <Panel>
                    <MapList selected={selected} items={items} onSelectItem={onSelectItem}/>
                </Panel>
            </div>
            <div className="col-sm-6 colWithSmallerGutter">
                { selected ?
                    <Panel>
                        <FloorPlan map={selected}/>
                    </Panel>
                    : <span/>
                }
            </div>
        </div>
    </div>;


class BrowseMapsPageContainer extends React.Component {
    state = {
        filter: {}
    };

    onFilterChange = (filter) => {
        this.setState({filter: filter});
    };

    onSelectItem = (item) => {
        this.context.router.history.push("/maps/" + item.id);
    };

    filterItems = (items) => {
        let currentFilter = this.state.filter;
        return items.filter(i => {
            return true;
        });
    };

    render() {
        return <BrowseMapsPage
            {...this.props}
            items={this.filterItems(this.props.items)}
            selected={this.props.items.find(i => i.id == this.props.match.params.id)}
            onSelectItem={this.onSelectItem}
            filter={this.state.filter}
            onFilterChange={this.onFilterChange}
        />
    }
}

BrowseMapsPageContainer.contextTypes = {
    router: PropTypes.shape({
        history: PropTypes.object.isRequired
    })
};

export default crudList({resource: "maps", onlyOnce: true}, BrowseMapsPageContainer)
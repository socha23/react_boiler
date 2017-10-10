import React from 'react'
import {crudList} from '../common/crud/crudContainers'
import {ArtifactsList, ArtifactTypeFilter, ArtifactPriorityFilter} from './ArtifactsList'
import {Panel, PanelWithTitle} from '../common/components/Panel'
import ArtifactForm from './ArtifactForm'
import {EnumFilter} from '../common/components/filters'
import {Priority, Type} from './ArtifactVocs'

const ArtifactsPage = ({filter, items, onFilterChange}) =>
    <div className="container-fluid">
        <div className="row">
            <div className="col-sm-2 colWithSmallerGutter">
                <Panel>
                    <p><b>Typ muzealiów</b></p>
                    <ArtifactTypeFilter
                        filter={filter}
                        onFilterChange={onFilterChange}
                    />
                </Panel>
                <Panel>
                    <p><b>Priorytet</b></p>
                    <ArtifactPriorityFilter
                        filter={filter}
                        onFilterChange={onFilterChange}
                    />
                </Panel>
            </div>
            <div className="col-sm-5 colWithSmallerGutter">
                <Panel>
                    <ArtifactsList items={items}/>
                </Panel>
            </div>
            <div className="col-sm-5 colWithSmallerGutter">
                <Panel>
                    <ArtifactForm item={{}} submitText="Zapisz"/>
                </Panel>
            </div>
        </div>
    </div>;


class ArtifactsPageContainer extends React.Component {
    state = {
        filter: {}
    };

    onFilterChange = (filter) => {
        this.setState({filter: filter});
    };

    filterItems = (items) => {
        let currentFilter = this.state.filter;
        return items.filter(i => {
            if (currentFilter.type && !(currentFilter.type[i.type])) {
                return false;
            } else if (currentFilter.priority && !currentFilter.priority[i.priority]) {
                return false;
            }
            return true;
        });
    };

    render() {
        return <ArtifactsPage
            items={this.filterItems(this.props.items)}
            filter={this.state.filter}
            onFilterChange={this.onFilterChange}
        />
    }
}

export default crudList("artifacts", ArtifactsPageContainer)
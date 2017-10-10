import React from 'react'
import {crudList} from '../common/crud/crudContainers'
import ArtifactsList from './ArtifactsList'
import {Panel, PanelWithTitle} from '../common/components/Panel'
import ArtifactForm from './ArtifactForm'
import {EnumFilter} from '../common/components/filters'
import {Priority, Type} from './ArtifactVocs'


class ArtifactsPage extends React.Component {
    state = {
        items: this.props.items || [],
        filter: {}
    };

    componentWillReceiveProps(nextProps) {
        let newItems = this.filterItems(nextProps.items, this.state.filter);
        this.setState({...this.state, items: newItems});
    };

    onFilterChange = (filter) => {
        let newItems = this.filterItems(this.props.items, filter);
        let newState = {...this.state, filter: filter, items: newItems};
        this.setState(newState);

    };

    filterItems = (items, currentFilter) => {
        return items.filter( i => {

            if (currentFilter.type && !(currentFilter.type[i.type])) {
                return false;
            } else if (currentFilter.priority && !currentFilter.priority[i.priority]) {
                return false;
            }

            return true;
        });

    };



    render() {
        return <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-2 colWithSmallerGutter">
                        <Panel>
                            <p><b>Typ muzealiów</b></p>
                            <EnumFilter
                                items={Type}
                                field="type"
                                filter={this.state.filter}
                                onFilterChange={this.onFilterChange}
                            />
                        </Panel>
                        <Panel>
                            <p><b>Priorytet</b></p>
                            <EnumFilter
                                items={Priority}
                                field="priority"
                                filter={this.state.filter}
                                onFilterChange={this.onFilterChange}
                            />
                        </Panel>
                    </div>
                    <div className="col-sm-5 colWithSmallerGutter">
                        <Panel>
                            <ArtifactsList items={this.state.items}/>
                        </Panel>
                    </div>
                    <div className="col-sm-5 colWithSmallerGutter">
                        <Panel>
                            <ArtifactForm item={{}} submitText="Zapisz"/>
                        </Panel>
                    </div>
                </div>
        </div>;
    }
}

export default crudList("artifacts", ArtifactsPage)
import React from 'react'
import {PropTypes} from 'prop-types'
import {connect} from 'react-redux'

import {crudActions} from '../common/crud/crudContainers'
import Panel from '../common/components/Panel'
import {SearchFilter} from '../common/components/filters'
import * as Responsive from '../common/components/responsive'

import {
    ArtifactPriorityFilter,
    ArtifactsList,
    ArtifactTypeFilter,
    PopupArtifactPriorityFilter,
    PopupArtifactTypeFilter
} from './ArtifactsList'
import {ArtifactLocationFilter, PopupArtifactLocationFilter} from './ArtifactLocationFilter'
import ArtifactCard from './ArtifactCard'

import {getSortedArtifacts} from './selectors'

const NewArtifactButton = ({onClick}) => <a className="btn btn-large btn-primary btn-block iconWithName" onClick={onClick}>
    <i className="glyphicon glyphicon-plus"/>
    Dodaj nowy obiekt
</a>;


const NarrowBrowseArtifactsPage = ({items, filter, onFilterChange, selected, onSelectItem, onDelete, onUpdate, createMode, onCreate, onNewItem}) =>
    <div className="container-fluid">
        <div className="row">
            <div className="col-sm-6 colWithSmallerGutter">
                <div className="row">
                    <div className="col-sm-12 colWithSmallerGutter">
                        <Panel>
                            <NewArtifactButton onClick={onNewItem}/>
                        </Panel>
                    </div>
                    <div className="col-sm-6 colWithSmallerGutter">
                        <Panel>
                            <PopupArtifactLocationFilter filter={filter} onFilterChange={onFilterChange}/>
                        </Panel>
                    </div>
                    <div className="col-sm-6 colWithSmallerGutter">
                        <Panel>
                            <PopupArtifactTypeFilter filter={filter} onFilterChange={onFilterChange}/>
                        </Panel>
                    </div>
                    <div className="col-sm-6 colWithSmallerGutter">
                        <Panel>
                            <PopupArtifactPriorityFilter filter={filter} onFilterChange={onFilterChange}/>
                        </Panel>
                    </div>
                </div>
                <Panel>
                    <ArtifactsList selected={selected} items={items} onSelectItem={onSelectItem}/>
                </Panel>
            </div>
            <div className="col-sm-6 colWithSmallerGutter">
                {
                    (selected || createMode) ?
                        <Panel>
                            <ArtifactCard
                                item={selected}
                                onDelete={onDelete}
                                createMode={createMode}
                                onSubmit={createMode ? (i, s, e) => {onCreate(i, onSelectItem, e)} : onUpdate}
                            />
                        </Panel>
                        :
                        <div></div>

                }
            </div>
        </div>
    </div>;


const WideBrowseArtifactsPage = ({items, filter, onFilterChange, selected, onSelectItem, onDelete, onUpdate, createMode, onCreate, onNewItem}) =>
    <div className="container-fluid">
        <div className="row">
            <div className="col-sm-2 colWithSmallerGutter">
                <Panel style={{marginBottom: 10}}>
                    <NewArtifactButton onClick={onNewItem}/>
                </Panel>
                <Panel style={{marginBottom: 10}}>
                    <SearchFilter placeholder="Szukaj" filter={filter} onFilterChange={onFilterChange}/>
                </Panel>
                <Panel style={{marginBottom: 10}}>
                    <p><b>Położenie</b></p>
                    <ArtifactLocationFilter filter={filter} onFilterChange={onFilterChange}/>
                </Panel>
                <Panel style={{marginBottom: 10}}>
                    <p><b>Typ muzealiów</b></p>
                    <ArtifactTypeFilter filter={filter} onFilterChange={onFilterChange}/>
                </Panel>
                <Panel>
                    <p><b>Priorytet</b></p>
                    <ArtifactPriorityFilter filter={filter} onFilterChange={onFilterChange}/>
                </Panel>
            </div>
            <div className="col-sm-5 colWithSmallerGutter">
                <Panel>
                    <ArtifactsList selected={selected} items={items} onSelectItem={onSelectItem}/>
                </Panel>
            </div>
            <div className="col-sm-5 colWithSmallerGutter">
                {
                    (selected || createMode) ?
                        <Panel>
                            <ArtifactCard
                                item={selected}
                                onDelete={onDelete}
                                createMode={createMode}
                                onSubmit={createMode ? (i, s, e) => {onCreate(i, onSelectItem, e)} : onUpdate}
                            />
                        </Panel>
                        :
                        <div></div>

                }
            </div>
        </div>
    </div>;


const BrowseArtifactsPage = (props) =>
    <div>
        <Responsive.Below1024>
            <NarrowBrowseArtifactsPage {...props}/>
        </Responsive.Below1024>
        <Responsive.Above1024>
            <WideBrowseArtifactsPage {...props}/>
        </Responsive.Above1024>
    </div>;


class ArtifactsPageContainer extends React.Component {
    state = {
        filter: {}
    };

    onFilterChange = (filter) => {
        this.setState({filter: filter});
    };

    onSelectItem = (item) => {
        this.context.router.history.push("/artifacts/" + item.id);
    };

    onNewItem = (item) => {
        this.context.router.history.push("/artifacts/new");
    };

    filterItems = (items) => {
        let currentFilter = this.state.filter;
        return items.filter(i => {
            if (currentFilter.type && !(currentFilter.type[i.type])) {
                return false;
            } else if (currentFilter.priority && !currentFilter.priority[i.priority]) {
                return false;
            } else if (currentFilter.search && !i.name.toLowerCase().includes(currentFilter.search.toLowerCase())) {
                return false;
            } else if (currentFilter.locationArtifactIds && !currentFilter.locationArtifactIds[i.id]) {
                return false;
            }
            return true;
        });
    };

    render() {
        return <BrowseArtifactsPage
            {...this.props}
            items={this.filterItems(this.props.items)}
            selected={this.props.items.find(i => i.id == this.props.match.params.id)}
            createMode={this.props.match.params.id == "new"}
            onSelectItem={this.onSelectItem}
            filter={this.state.filter}
            onFilterChange={this.onFilterChange}
            onNewItem={this.onNewItem}
        />
    }
}

ArtifactsPageContainer.contextTypes = {
    router: PropTypes.shape({
        history: PropTypes.object.isRequired
    })
};

export default crudActions("artifacts", connect((state) => ({
    items: getSortedArtifacts(state)
}))(ArtifactsPageContainer))
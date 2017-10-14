import React from 'react'
import {PropTypes} from 'prop-types'
import {crudList, crudActions} from '../common/crud/crudContainers'
import {ArtifactsList, ArtifactTypeFilter, ArtifactPriorityFilter} from './ArtifactsList'
import {Panel, PanelWithTitle} from '../common/components/Panel'
import ArtifactCard from './ArtifactCard'
import {SearchFilter} from '../common/components/filters'
import fadeOnItemChange from '../common/components/fadeOnItemChange'

const FadingArtifactCard = fadeOnItemChange(ArtifactCard);

const BrowseArtifactsPage = ({items, filter, onFilterChange, selected, onSelectItem, onDelete}) =>
    <div className="container-fluid">
        <div className="row">
            <div className="col-sm-2 colWithSmallerGutter">
                <Panel>
                    <SearchFilter placeholder="Szukaj" filter={filter} onFilterChange={onFilterChange}/>
                </Panel>
                <Panel>
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
                    selected ?
                        <Panel>
                            <FadingArtifactCard item={selected} animationTime={150} onDelete={onDelete}/>
                        </Panel>
                        :
                        <div></div>

                }
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

    onSelectItem = (item) => {
        this.context.router.history.push("/artifacts/" + item.id);
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
            }
            return true;
        });
    };

    render() {
        return <BrowseArtifactsPage
            {...this.props}
            items={this.filterItems(this.props.items)}
            selected={this.props.items.find(i => i.id == this.props.match.params.id)}
            onSelectItem={this.onSelectItem}
            filter={this.state.filter}
            onFilterChange={this.onFilterChange}
        />
    }
}

ArtifactsPageContainer.contextTypes = {
    router: PropTypes.shape({
        history: PropTypes.object.isRequired
    })
};

export default crudActions("artifacts", crudList("artifacts", ArtifactsPageContainer))
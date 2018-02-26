import React from 'react'
import PropTypes from 'prop-types'

import VocIcon from './VocIcon'

const TYPE_DEFAULT = "default";
const TYPE_MAP_BUTTON = "mapButton";

class ToggleButtons extends React.Component {

    state = {
        selected: this.props.selected || {}
    };

    componentWillReceiveProps(nextProps) {
        this.setState({selected: nextProps.selected || {}});
    };


    onToggle = (item) => {
        var newState = {...this.state, selected: {...this.state.selected}};
        const id = item.id;
        if (this.state.selected[id]) {
            delete newState.selected[id];
        } else {
            newState.selected[id] = true;
        }
        this.setState(newState);
        if (this.props.onSelectionChange) {
            this.props.onSelectionChange(newState.selected)
        }

    };


    render() {
        switch (this.props.type) {
            case TYPE_MAP_BUTTON:
                return this.renderMapButton();
            default:
                return this.renderDefault();
        }


    }

    renderDefault() {
        return <div className="toggleButtons">
            {this.props.items.map(item =>
                <a key={item.id}
                   className={"iconWithName btn btn-default " + ((this.state.selected[item.id]) ? "active" : "")}
                   onClick={() => this.onToggle(item)}>
                    <span className="pull-left">
                        <VocIcon value={item}/>
                        {item.name}
                    </span>
                    {item.number ? <span className="pull-right">{item.number}</span> : ""}
                </a>
            )}
        </div>
    }

    renderMapButton = () =>
        <div className="btn-group-vertical">
            {this.props.items.map(item =>
                <a key={item.id}
                   className={"btn btn-default btn-lg " + ((this.state.selected[item.id]) ? "active" : "")}
                   onClick={() => this.onToggle(item)}>
                    <VocIcon value={item}/>
                </a>
            )}
        </div>


}


ToggleButtons.propTypes = {
    items: PropTypes.array,
    selected: PropTypes.object,
    onSelectionChange: PropTypes.func,
    type: PropTypes.string
};

ToggleButtons.defaultProps = {
    type: TYPE_DEFAULT
};

export default ToggleButtons
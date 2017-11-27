import React from 'react'
import PropTypes from 'prop-types'

class ToggleButtons extends React.Component {

    state =  {
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
        return <div className="toggleButtons">
            {this.props.items.map(item =>
                <a key={item.id} className={"iconWithName btn btn-default " + ((this.state.selected[item.id]) ? "active" : "")} onClick={() => this.onToggle(item)}>
                    {item.iconClass ? <i className={item.iconClass}/> : ""}
                    {item.iconText ? <span className="badge">{item.iconText}</span> : ""}
                    {item.name}
                    {item.number ? <span style={{marginLeft: 30}}>{item.number}</span> : ""}
                </a>
            )}
        </div>
    }
}


ToggleButtons.propTypes = {
    items: PropTypes.array,
    selected: PropTypes.object,
    onSelectionChange: PropTypes.func
};

export default ToggleButtons
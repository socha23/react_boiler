import React from 'react'
import PropTypes from 'prop-types'

import HeightExpander from './HeightExpander'

const tabStyle = {
    display: "inline-block",
    padding: "5px 10px 2px 10px",
    position: "relative",
    cursor: "pointer",
    top: 1
};

const activeTabStyle = {
    backgroundColor: "white",
    border: "1px solid #ddd",
    borderBottom: "1px solid white",
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4
};


/* tabs ex
 [{label: 'tab one', body: <div>Tab one</div>}, {label: 'tab two', body: <div>Tab two</div>}]

  */

class TabPanel extends React.Component {

    static propTypes = {
        tabs: PropTypes.array.isRequired,
        onTabChange: PropTypes.func,
        padding: PropTypes.number,
        heightExpander: PropTypes.bool
    };

    static defaultProps = {
        onTabChange: () => {},
        padding: 15,
        heightExpander: false

    };

    state = {
        selected: 0
    };

    onTabClick = (idx) => {
        if (this.state.selected == idx) {
            return;
        }
        this.setState({selected: idx});
        this.props.onTabChange(idx);
    };

    render = () => {
        let body = this.state.selected < this.props.tabs.length ?
                                this.props.tabs[this.state.selected].body
                                : <span/>;

        return <div>
            <nav>
                <ul style={{listStyleType: "none", marginBottom: 0, paddingLeft: 15}}>
                    {
                        this.props.tabs.map( (tab, idx) => {
                            let style = (idx == this.state.selected) ? {...tabStyle, ...activeTabStyle} : tabStyle;
                            return <li
                                key={idx}
                                style={style}
                                onClick={() => this.onTabClick(idx)}
                            >
                                <a>{tab.label}</a>
                            </li>
                        })
                    }
                </ul>
            </nav>
            <div className="panel panel-default">
                <div className="panel-body" style={{padding: this.props.padding}}>
                    {
                        this.props.heightExpander ?
                            <HeightExpander>
                                {body}
                            </HeightExpander>
                            : body
                    }
                </div>
            </div>
        </div>
    }
}

export default TabPanel

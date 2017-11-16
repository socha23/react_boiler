import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'

const LocatorValue = ({locator, link, history}) => locator ? <span>
            { link ?
                <a
                    style={{cursor: "pointer"}}
                    onClick={e => {e.stopPropagation(); history.push("/maps/outside/" + locator.id)}}
                >
                    {locator.name}</a>
            : locator.name
            }
    </span> :
    <span>nie wybrano</span>
    ;

const mapStateToProps = (state, ownProps) => {
    if (ownProps.locator) {
        return {locator: ownProps.locator}
    } else if (ownProps.locatorId) {
        return {locator: (state.locators.items || []).find(t => t.id == ownProps.locatorId)}
    } else {
        return {locator: null};
    }
};

export default withRouter(connect(mapStateToProps)(LocatorValue));

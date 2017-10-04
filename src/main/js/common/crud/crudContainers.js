import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import crudActions from './crudActions'

function crudList(resource, component) {

    const actions = crudActions(resource);

    function wrap(clazz) {
        if (clazz.render) {
            return class Wrapper extends clazz {
                componentDidMount() {
                    this.props.onMount();
                    super.componentDidMount();
                }
            }
        } else {
            return class Wrapper extends React.Component {
                componentDidMount() {
                    this.props.onMount();
                }

                render() {
                    return clazz(this.props)
                }
            }
        }
    }

    const mapStateToProps = (state) =>({
        items: state[resource].items || []
    });


    const mapDispatchToProps = (dispatch) => ({
        onMount: () => dispatch(actions.fetchItemsIfNeeded()),
        reloadItems: () => dispatch(actions.fetchItemsIfNeeded())
    });

    return connect(mapStateToProps, mapDispatchToProps)(wrap(component));
}

module.exports = {
    crudList: crudList
};
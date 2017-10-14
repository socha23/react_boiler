import React from 'react'
import PropTypes from 'prop-types'


function nonEmpty(obj) {
    return obj && Object.keys(obj).length > 0;
}

function empty(obj) {
    return !nonEmpty(obj);
}

export default function fadeOnItemChange(Component, animationTime = 150) {
    return class extends React.Component {

        state = {
            item: this.props.item
        };

        componentWillReceiveProps = (nextProps) => {
            let setNewItem = (i) => {
                return () => {
                    this.setState({item: i});
                }
            };

            if (empty(this.props.item) && nonEmpty(nextProps.item)) {
                // make visible
                setNewItem(nextProps.item)();
                $(this.content).fadeIn(animationTime);
            } else if (nonEmpty(this.props.item) && empty(nextProps.item)) {
                // make invisible
                $(this.content).fadeOut(animationTime, setNewItem(nextProps.item));

            } else if (empty(this.props.item) && empty(nextProps.item)) {
                // set invisible
                $(this.content).hide();
                setNewItem(nextProps.item)();
            } else if (nonEmpty(this.props.item) && nonEmpty(nextProps.item) && this.props.item != nextProps.item) {
                // change
                $(this.content).fadeOut(animationTime, () => {
                    $(this.content).fadeIn(animationTime);
                    setNewItem(nextProps.item)();
                });
            }
        };

        render() {
            return <div ref={(content) => { this.content = content; }}>
                <Component {...this.props} item={this.state.item}/>
            </div>;
        }

    }

}


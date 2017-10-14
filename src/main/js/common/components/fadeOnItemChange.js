import React from 'react'
import PropTypes from 'prop-types'


export default function fadeOnItemChange(Component, animationTime = 100) {
    return class extends React.Component {

        componentWillReceiveProps = (nextProps) => {

            if (!this.props.item && nextProps.item) {
                // make visible
                $(this.content).fadeIn(animationTime );
            } else if (this.props.item && !nextProps.item) {
                // make invisible
                $(this.content).fadeOut(animationTime );
            } else if (!this.props.item && !nextProps.item) {
                // set invisible
                $(this.content).hide();
            } else if (this.props.item && nextProps.item && this.props.item != nextProps.item) {
                // change
                $(this.content).fadeOut(animationTime , () => {$(this.content).fadeIn(animationTime )});
            }
        };

        render() {
            return <div ref={(content) => { this.content = content; }}>
                <Component {...this.props}/>
            </div>;
        }

    }

}


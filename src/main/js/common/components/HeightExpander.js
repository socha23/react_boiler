import React from 'react'

const MARGIN = 30;
const EXPECTED_TOP = 80;

class HeightExpander extends React.Component {

    guessHeight = () => {
        if (!this.elem) {
            return $(window).height() - EXPECTED_TOP - MARGIN;
        } else {
            return $(window).height() - $(this.elem).offset().top - MARGIN;
        }
    };

    render = () => {
        return <div
            ref={e => this.elem = e}
            style={{...(this.props.style || {}), height: this.guessHeight()}}
        >
            {this.props.children}
        </div>
    };
}

export default HeightExpander;

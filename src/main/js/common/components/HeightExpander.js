import React from 'react'

const MARGIN = 15;
const EXPECTED_TOP = 80;

class HeightExpander extends React.Component {

    static defaultProps = {
        additionalMargin: 0
    };


    guessHeight = () => {
        if (!global.$) {
            return 0;
        }

        if (!this.elem) {
            return $(window).height() - EXPECTED_TOP - MARGIN - this.props.additionalMargin;
        } else {
            return $(window).height() - $(this.elem).offset().top - MARGIN - this.props.additionalMargin;
        }
    };

    render = () => {
        return <div
            ref={e => this.elem = e}
            style={{...(this.props.style || {}), overflowY: "auto", height: this.guessHeight()}}
        >
            {this.props.children}
        </div>
    };
}

export default HeightExpander;

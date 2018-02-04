import React from 'react'
import $ from 'jquery'

class Fullscreen extends React.Component {

    setFullscreen = (elem) => {
        elem.css("height", "100%");
        elem.css("width", "100%");
        elem.parents().css("height", "100%");
    };

    render = () => <div {...this.props} ref={e => {this.setFullscreen($(e))}}>
        {this.props.children}
    </div>
}

export default Fullscreen

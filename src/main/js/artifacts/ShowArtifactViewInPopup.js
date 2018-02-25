import React from 'react'
import PropTypes from 'prop-types'
import {ArtifactDetailsAndImage, ArtifactIconAndName} from "./ArtifactView";
import Popup from '../common/components/Popup'

class ShowArtifactViewInPopup extends React.Component {

    static propTypes = {
        artifact: PropTypes.object.isRequired,
    };

    render = () => <div>
        <Popup
            labelPopupTitle={<ArtifactIconAndName item={this.props.artifact}/>}
            ref={r => {this.popup = r}}>
            <div>
                <ArtifactDetailsAndImage item={this.props.artifact}/>
            </div>
        </Popup>

        <a  style={{fontSize: 24, color:"#aaa"}}
            onClick={e => {this.popup.openModal()}}>
            <i className={"glyphicon glyphicon-eye-open"}/>
        </a>
    </div>;
}

export default ShowArtifactViewInPopup;
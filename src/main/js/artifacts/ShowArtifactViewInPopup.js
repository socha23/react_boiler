import React from 'react'
import PropTypes from 'prop-types'
import ArtifactView from './ArtifactView'

class ShowArtifactViewInPopup extends React.Component {

    static propTypes = {
        artifact: PropTypes.object.isRequired,
    };

    render = () => <div>
        <Popup
            labelPopupTitle={artifact.name}
            ref={r => {this.popup = r}}>
            <div>
                <ArtifactView value={this.props.artifact}/>
            </div>
        </Popup>

        <a  style={{fontSize: 18}}
            onClick={e => {this.popup.openModal()}}>
            Opis obiektu
        </a>
    </div>;
}

export default ShowArtifactViewInPopup;
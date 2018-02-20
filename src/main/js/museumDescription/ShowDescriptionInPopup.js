import React from 'react'
import {PropTypes} from 'prop-types'
import Popup from "../common/components/Popup";
import MuseumDescription from "./ReadOnlyMuseumDescription"

class ShowDescriptionInPopup extends React.Component {

    static propTypes = {
        value: PropTypes.object.isRequired,
    };

    render = () => <div>
        <Popup
            labelPopupTitle="Opis obiektu"
            ref={r => {this.popup = r}}>
            <div>
                <MuseumDescription value={this.props.value}/>
            </div>
        </Popup>

        <a  style={{fontSize: 18}}
            onClick={e => {this.popup.openModal()}}>
            Opis obiektu
        </a>
    </div>;
}

export default ShowDescriptionInPopup;
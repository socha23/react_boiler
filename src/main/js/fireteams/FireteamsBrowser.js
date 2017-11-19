import React from 'react'
import {PropTypes} from 'prop-types'
import FireteamsList from './FireteamsList'

const EmptyFireteamsList = () => <div>
    <b>Nie zdefiniowano jeszcze żadnej roty</b>
</div>;

class FireteamsBrowser extends React.Component {

    static propTypes = {
        items: PropTypes.array.isRequired
    };

    render = () => (<div>
            {this.props.items.length > 0 ?
                <FireteamsList items={this.props.items}/>
                : <EmptyFireteamsList/>
            }

        </div>
    )
}

export default FireteamsBrowser
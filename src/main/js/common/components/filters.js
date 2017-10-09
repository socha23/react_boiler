import React from 'react'
import ToggleButtons from './ToggleButtons'


export class EnumFilter extends React.Component {

    render() {
        return <div>
            <ToggleButtons items={this.props.items}/>
        </div>
    }
}


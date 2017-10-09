import React from 'react'

class ToggleButtons extends React.Component {



    render() {
        return <div className="toggleButtons">
            {this.props.items.map(item =>
                <a key={item.id} className="btn btn-default">
                    {item.iconClass ? <i className={item.iconClass}/> : ""}
                    {item.iconText ? <span className="badge">{item.iconText}</span> : ""}
                    {item.name}
                </a>
            )}
        </div>
    }
}

export default ToggleButtons
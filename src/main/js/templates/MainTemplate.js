import React, {Component} from 'react'
import { NavLink } from 'react-router-dom'

const Template = ({navBar, content}) => <div>
    <nav className="navbar navbar-inverse navbar-fixed-top">
        <div className="container">
            <div className="navbar-header">
                <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar"
                        aria-expanded="false" aria-controls="navbar">
                    <span className="sr-only">Toggle navigation</span>
                    <span className="icon-bar"/>
                    <span className="icon-bar"/>
                    <span className="icon-bar"/>
                </button>
                <NavLink className="navbar-brand" to="/">{window.application.applicationName}</NavLink>
            </div>
            <div id="navbar" className="collapse navbar-collapse">
                {navBar}
            </div>
        </div>
    </nav>

    <div className="container">
        {content}
    </div>
</div>;

export default Template
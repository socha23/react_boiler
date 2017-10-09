import React, {Component} from 'react'
import { NavLink } from 'react-router-dom'

const Template = ({navBar, content}) => <div>
    <nav className="responsibleNav">
        {navBar}
    </nav>
    <div className="contents">
        {content}
    </div>
</div>;

export default Template
import React, {Component} from 'react'

const PageTemplate = ({pageNav, content}) => <div>
    <div className="pageNavContainer">
        <nav className="pageNav">
            {pageNav}
        </nav>
    </div>
    <div className="pageWithNavBody">
        {content}
    </div>
</div>;

export default PageTemplate
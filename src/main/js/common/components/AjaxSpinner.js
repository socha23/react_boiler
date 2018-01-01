import React from 'react'

import contextPath from '../contextPath'

const AjaxSpinner = () => (
        <div className="ajaxSpinner">
            <div className="ajaxSpinnerInner">
                <img src={contextPath() + "/gears.svg"} alt="Please wait..."/>
            </div>

        </div>
);

export default AjaxSpinner
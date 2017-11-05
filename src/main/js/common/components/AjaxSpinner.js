import React from 'react'

const AjaxSpinner = () => (
        <div className="ajaxSpinner">
            <div className="ajaxSpinnerInner">
                <img src={CONTEXT_PATH + "/gears.svg"} alt="Please wait..."/>
            </div>

        </div>
);

export default AjaxSpinner
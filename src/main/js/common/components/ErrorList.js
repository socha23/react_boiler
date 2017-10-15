import React from 'react'

const ErrorList = ({errors, children}) => {
    if (errors.length == 0) {
        return <div></div>
    } else {
        return <div className="alert alert-danger">
            {children}
            <ul>
                {errors.map(e =>
                    <li key="e">{e}</li>
                )}
            </ul>
        </div>
    }
};

export default ErrorList
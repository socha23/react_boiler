import React from 'react'

const ProgressBar = ({current, total}) => {
    let percent = total == 0 ? 0 : 100 * current / total;

    return <div className="progress">
        <div className="progress-bar progress-bar-striped active" role="progressbar" aria-valuenow={percent} aria-valuemin="0" aria-valuemax="100"
             style={{width: percent + "%"}}>
        </div>
    </div>
};


export default ProgressBar;
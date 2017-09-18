import React, {Component, PropTypes} from 'react'
import moment from 'moment'

export const DateAndTime = ({date}) => {
    return <span>{moment(date).format("YYYY.MM.DD HH:mm:ss")}</span>
};

DateAndTime.propTypes = {
    date: PropTypes.string.isRequired
};


export const Date = ({date}) => {
    return <span>{moment(date).format("YYYY.MM.DD")}</span>
};

Date.propTypes = {
    date: PropTypes.string.isRequired
};


export const FromNow = ({date}) => {
    return <span>{moment(date).fromNow()}</span>
};

FromNow.propTypes = {
    date: PropTypes.string.isRequired
};


export const TimeDuration = ({seconds}) => {
    let mySeconds = seconds % 60;
    seconds = seconds / 60;
    let minutes = Math.floor(seconds % 60);
    let hours = Math.floor(seconds / 60);

    return <span>
        {hours > 0 ? hours + "h " : ""}
        {hours > 0 || minutes > 0 ? minutes + "min " : ""}
        {mySeconds + "s"}
    </span>
};

TimeDuration.propTypes = {
    seconds: PropTypes.number.isRequired
};

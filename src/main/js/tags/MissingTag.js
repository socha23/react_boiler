import React from 'react'

const MissingTag = ({tag}) => {
    let name = tag ? tag.name + " (zagubiony)" : "nie znaleziono";
    return <span className="text-danger">{name}</span>
};

export default MissingTag;

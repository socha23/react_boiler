import * as vocFunctions from '../common/vocFunctions'

export const TypeFireteam = {
    id: "fireteam",
    name: "Roty",
    color: "#d9534f",
    iconClass: "glyphicon glyphicon-fire"
};

export const TypeArtifact = {
    id: "artifact",
    name: "Muzealia",
    color: "#337ab7",
    iconClass: "glyphicon glyphicon-gift"
};

export const TypeNavigation = {
    id: "navigation",
    name: "Punkty nawigacyjne",
    color: "#5bc0de",
    iconClass: "glyphicon glyphicon-remove-circle"
};



export const TagTypes = [
    TypeFireteam, TypeArtifact, TypeNavigation
];

export const tagType = function(id) {
    return vocFunctions.find(TagTypes, id);
};


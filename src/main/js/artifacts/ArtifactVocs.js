import * as vocFunctions from '../common/vocFunctions'

// user request żeby na wysokim priorytecie była jedynka, a na niskim trójka.
// Zostawiam jednak po staremu IDki żeby nie trzeba było robić migracji bazy danych.

export const Priority = [
    {
        id: "P3_HIGH",
        name: "Wysoki",
        iconText: "1",
        color: "#d9534f"
    },
    {
        id: "P2_MEDIUM",
        name: "Średni",
        iconText: "2",
        color: "#f0ad4e"
    },
    {
        id: "P1_LOW",
        name: "Niski",
        iconText: "3",
        color: "#5cb85c"
    }
];

export const priority = function(id) {
    return vocFunctions.find(Priority, id);
};


export const priorityName = function(id) {
    let vocVal = priority(id);
    if (vocVal) {
        return vocVal.name;
    } else {
        return "";
    }
};

export const Type = [
    {
        id: "PAINTING",
        name: "Obraz",
        iconClass: "glyphicon glyphicon-picture"
    },
    {
        id: "SCULPTURE",
        name: "Rzeźba",
        iconClass: "glyphicon glyphicon-user"
    },
    {
        id: "POTTERY",
        name: "Ceramika",
        iconClass: "glyphicon glyphicon-piggy-bank"
    },
    {
        id: "DOCUMENT",
        name: "Dokument",
        iconClass: "glyphicon glyphicon-book"
    },
    {
        id: "OTHER",
        name: "Inne",
        iconClass: "glyphicon glyphicon-gift"
    }
];

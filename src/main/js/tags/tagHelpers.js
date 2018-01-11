export function artifactsByTagId(artifacts) {
    if (!artifacts) {
        return {};
    }
    let result = {};
    artifacts.forEach(a => {
        if (a.tagId) {
            result[a.tagId] = a;
        }
    });
    return result;
}

export function availableTags(itemLists, tags, forItem) {
    if (!itemLists || !tags) {
        return [];
    }
    let usedTagIds = {};
    itemLists.forEach ( list => {
        list.forEach(a => {
            if (a.tagId && (!forItem || a.id != forItem.id)) {
                usedTagIds[a.tagId] = a.tagId;
            }
        });
    });
    return tags.filter(t => !usedTagIds[t.id]);
}

export function getTagById(tags, id) {
    if (!tags || !id) {
        return null;
    }
    for (let i = 0; i < tags.length; i++) {
        if (tags[i].id == id) {
            return tags[i];
        }
    }
    return null;
}

export function artifactTag(tags, artifact) {
    return getTagById(tags, artifact.tagId);
}

export function tagDescriptionsByTagId(tags=[], artifacts=[], fireteams=[]) {
    let result = {};
    tags.forEach(t => {result[t.id] = t.name});
    artifacts.forEach(a => {result[a.tagId] = a.name});
    fireteams.forEach(f => {result[f.tagId] = f.name});
    return result;
}

export function tagColorsByTagId(tags=[], artifacts=[], fireteams=[]) {
    let result = {};
    tags.forEach(t => {result[t.id] = "#5bc0de"});
    artifacts.forEach(a => {result[a.tagId] = "#337ab7"});
    fireteams.forEach(f => {result[f.tagId] = "#d9534f"});
    return result;
}

export function tagTypeByTagId(tags=[], artifacts=[], fireteams=[]) {
    let result = {};
    tags.forEach(t => {result[t.id] = "navigation"});
    artifacts.forEach(a => {result[a.tagId] = "artifact"});
    fireteams.forEach(f => {result[f.tagId] = "fireteam"});
    return result;
}

export const TAG_STATES = {
    INSIDE: "INSIDE",
    MISSING: "MISSING",
    IN_CONTAINER: "IN_CONTAINER"
};

export function isMissing(tag) {
    return tag && tag.state == TAG_STATES.MISSING
}

export function isInside(tag) {
    return tag && tag.state == TAG_STATES.INSIDE
}

export function isInContainer(tag) {
    return tag && tag.state == TAG_STATES.IN_CONTAINER
}

export function isInCoordinateSystem(tag, coordinateSystemId) {
    return tag && isInside(tag) && tag.coordinateSystemId == coordinateSystemId
}

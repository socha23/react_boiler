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

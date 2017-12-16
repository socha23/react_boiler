function artifactsByTagId(artifacts) {
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

function availableTags(itemLists, tags, forItem) {
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

function getTagById(tags, id) {
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

function artifactTag(tags, artifact) {
    return getTagById(tags, artifact.tagId);
}

function tagDescriptionsByTagId(tags=[], artifacts=[], fireteams=[]) {
    let result = {};
    tags.forEach(t => {result[t.id] = t.name});
    artifacts.forEach(a => {result[a.tagId] = a.name});
    fireteams.forEach(f => {result[f.tagId] = f.name});
    return result;
}

module.exports = {
    artifactsByTagId,
    availableTags,
    getTagById,
    artifactTag,
    tagDescriptionsByTagId
};
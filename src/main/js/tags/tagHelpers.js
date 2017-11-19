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


module.exports = {
    artifactsByTagId:artifactsByTagId,
    availableTags: availableTags
};
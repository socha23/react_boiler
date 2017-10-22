function tagsByArtifactId(artifacts, tags) {
    if (!artifacts || !tags) {
        return {};
    }
    let tagsById = {};
    tags.forEach(t => tagsById[t.id] = t);
    let result = {};
    artifacts.forEach(a => {
        if (a.tagId) {
            result[a.id] = tagsById[a.tagId];
        }
    });
    return result;
}

function availableTags(artifacts, tags, forArtifact) {
    if (!artifacts || !tags) {
        return [];
    }
    let usedTagIds = {};
    artifacts.forEach(a => {
        if (a.tagId && (!forArtifact || a.id != forArtifact.id)) {
            usedTagIds[a.tagId] = a.tagId;
        }
    });
    return tags.filter(t => !usedTagIds[t.id]);
}


module.exports = {
    tagsByArtifactId: tagsByArtifactId,
    availableTags: availableTags
};
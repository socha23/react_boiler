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
    artifactsByTagId:artifactsByTagId,
    availableTags: availableTags
};
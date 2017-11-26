import store from '../store'

let TAGS_BY_ID = null;


store.subscribe(() => {
    TAGS_BY_ID = {};
    store.getState().tags.items.forEach(i => TAGS_BY_ID[i.id] = i);
});

function getTagById(id) {
    if (!TAGS_BY_ID || !id) {
        return null;
    }
    return TAGS_BY_ID[id];
}

function artifactTag(artifact) {
    return getTagById(artifact.tagId);
}

module.exports = {
    artifactTag: artifactTag,
    getTagById: getTagById
};
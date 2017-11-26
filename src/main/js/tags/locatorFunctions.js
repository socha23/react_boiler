import store from '../store'

let LOCATORS_BY_ID = null;


store.subscribe(() => {
    LOCATORS_BY_ID = {};
    store.getState().locators.items.forEach(i => LOCATORS_BY_ID[i.id] = i);
});

function getLocatorById(id) {
    if (!LOCATORS_BY_ID || !id) {
        return null;
    }
    return LOCATORS_BY_ID[id];
}

function artifactLocator(artifact) {
    return getLocatorById(artifact.currentLocatorId);
}

module.exports = {
    artifactLocator: artifactLocator,
    getLocatorById: getLocatorById
};
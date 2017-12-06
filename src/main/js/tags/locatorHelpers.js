function artifactsByCrateId(artifacts) {
    if (!artifacts) {
        return {};
    }
    let result = {};
    artifacts.forEach(a => {
        if (a.crateId) {
            result[a.crateId] = a;
        }
    });
    return result;
}

function availableCrates(artifacts, locators, forArtifact) {
    if (!artifacts || !locators) {
        return [];
    }
    let usedCrateIds = {};
    artifacts
        .forEach(a => {
            if (a.crateId && (!forArtifact || a.id != forArtifact.id)) {
                usedCrateIds[a.crateId] = a.crateId;
            }
        });
    return locators
        .filter(t => t.type == "CRATE")
        .filter(t => !usedCrateIds[t.id]);
}

function getLocatorById(locators, id) {
    if (!locators || !id) {
        return null;
    }
    for (let i = 0; i < locators.length; i++) {
        if (locators[i].id == id) {
            return locators[i];
        }
    }
    return null;
}

function artifactLocator(locators, artifact) {
    return locators.find(loc =>
        (loc.nearbyDevices || []).find(dev => dev.id == artifact.id)
    );
}


module.exports = {
    artifactsByCrateId,
    availableCrates,
    getLocatorById,
    artifactLocator
};
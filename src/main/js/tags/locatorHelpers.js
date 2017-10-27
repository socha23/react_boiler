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


module.exports = {
    artifactsByCrateId:artifactsByCrateId,
    availableCrates: availableCrates
};
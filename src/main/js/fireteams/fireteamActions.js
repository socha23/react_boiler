import restActions from '../common/crud/crudActions'

const fireteamCrudActions = restActions("fireteams");

export function setFireteamTargetTag(fireteam, targetTag) {
    let updatedFireteam = {...fireteam, targetTagId: targetTag ? targetTag.id : null};
    return fireteamCrudActions.updateItem(updatedFireteam);
}

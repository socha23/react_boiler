export function indexById(items = []) {
    return indexBy(items, "id");
}

export function indexBy(items = [], field = "id") {
    let result = {};
    items.forEach(i => {
       result[i[field]] = i;
    });
    return result;
}


export function groupBy(items = [], fld = "id") {
    let result = {};
    items.forEach(i => {
        let key = i[fld];
        if (!result[key]) {
            result[key] = [i]
        } else {
            result[key].push(i)
        }
    });
    return result;
}

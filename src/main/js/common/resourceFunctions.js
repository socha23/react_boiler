function indexById(items = []) {
    let result = {};
    items.forEach(i => {
       result[i.id] = i;
    });
    return result;
}

module.exports = {
    indexById
};
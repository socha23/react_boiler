module.exports = {

    find: (voc, id) => {
        for (let i = 0; i < voc.length; i++) {
            if (voc[i].id == id) {
                return voc[i]
            }
        }
        return null;
    }

};


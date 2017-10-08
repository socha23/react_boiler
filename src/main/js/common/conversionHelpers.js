module.exports = {

    stringToFloat: s => s == null || s == "" ? null : parseFloat(s),
    floatToString: f => f == null ? "" : "" + f

};


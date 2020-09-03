var CONNECTED_TOKENS = {};

module.exports.CONNECTED_TOKENS = CONNECTED_TOKENS;

module.exports.ADD_TOKEN = function (userId, token) {
    if (!CONNECTED_TOKENS[userId]) {
        CONNECTED_TOKENS[userId] = {};
    }
    CONNECTED_TOKENS[userId].token = {};
    CONNECTED_TOKENS[userId].token = token;
}

module.exports.DELETE_TOKEN = function (userId) {
    if (CONNECTED_TOKENS[userId]) {
        delete CONNECTED_TOKENS[userId];
    }
}
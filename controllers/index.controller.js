const axios = require('axios').default;
const TOKENS = require('../tokens');

module.exports.index = async function (req, res) {
    res.render('pages/index');
}
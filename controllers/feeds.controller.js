const axios = require('axios').default;
const TOKENS = require('../tokens');

module.exports.feeds = async function (req, res) {
    var feeds = null;

    try {
        feeds = await getFeeds(req.session.user._id);
    } catch (error) {
        feeds = error.message;
    }

    res.render('pages/feeds', {
        user: req.session.user,
        feeds: feeds
    });
}

module.exports.createFeed = async function (req, res) {
    var feeds = null;

    try {
        feeds = await getFeeds(req.session.user._id);
    } catch (error) {
        feeds = error.message;
    }

    try {
        const response = await axios.post(process.env.API_URL + '/feed/createFeed', {
            feedName: req.body.feedName
        }, {
            headers: {
                'auth-token': TOKENS.CONNECTED_TOKENS[req.session.user._id].token
            }
        });
        if (!response.data.success) {
            res.render('pages/feeds', {
                errorMessage: response.data.errorMessage,
                feeds: feeds
            });
        }
        else {
            res.redirect('/feeds');
        }
    } catch (error) {
        res.render('pages/feeds', {
            errorMessage: typeof error.response.data.errorMessage != 'undefined' ? error.response.data.errorMessage : error.message,
            feeds: feeds
        });
    }
}

async function getFeeds(id) {
    try {
        var feeds = null;
        const response = await axios.get(process.env.API_URL + '/feed/feeds', {
            headers: {
                'auth-token': TOKENS.CONNECTED_TOKENS[id].token
            }
        });
        if (!response.data.success) {
            feeds = response.data.errorMessage;
        }
        else {
            feeds = response.data.message;
        }
        return feeds;
    } catch (error) {
        throw error;
    }
}
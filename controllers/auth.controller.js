const axios = require('axios').default;
const TOKENS = require('../tokens');

module.exports.signup = async function (req, res) {
    try {
        const response = await axios.post(process.env.API_URL + '/auth/signup', {
            name: req.body.name,
            surname: req.body.surname,
            email: req.body.email,
            password: req.body.password
        });
        if (!response.data.success) {
            res.render('pages/signup', {
                errorMessage: response.data.errorMessage
            });
        }
        else {
            res.redirect('/auth/signin');
        }
    } catch (error) {
        res.render('pages/signup', {
            errorMessage: typeof error.response.data.errorMessage != 'undefined' ? error.response.data.errorMessage : error.message
        });
    }
}

module.exports.signin = async function (req, res) {
    try {
        const response = await axios.post(process.env.API_URL + '/auth/signin', {
            email: req.body.email,
            password: req.body.password
        });
        if (!response.data.success) {
            res.render('pages/signin', {
                errorMessage: response.data.errorMessage
            });
        }
        else {
            req.session.user = response.data.user;
            req.session.isLogged = true;
            TOKENS.ADD_TOKEN(response.data.user._id, response.data.token);
            res.redirect('/');
        }
    } catch (error) {
        res.render('pages/signin', {
            errorMessage: typeof error.response.data.errorMessage != 'undefined' ? error.response.data.errorMessage : error.message
        });
    }
}

module.exports.logout = function (req, res) {
    TOKENS.DELETE_TOKEN(req.session.user._id);
    req.session.destroy();
    res.redirect('/auth/signin');
}
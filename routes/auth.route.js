const router = require('express').Router();
const AuthController = require('../controllers/auth.controller');
const axios = require('axios').default;
const checkLog = require('./checkLog');

router.get('/signup', (req, res) => {
    if (req.session.isLogged) {
        if (req.session.user) {
            res.redirect('/');
        }
        else {
            res.render('pages/signup');
        }
    }
    else {
        res.render('pages/signup');
    }
});
router.post('/signup', AuthController.signup);

router.get('/signin', (req, res) => {
    if (req.session.isLogged) {
        if (req.session.user) {
            res.redirect('/');
        }
        else {
            res.render('pages/signin');
        }
    }
    else {
        res.render('pages/signin');
    }
});

router.post('/signin', AuthController.signin);

router.get('/logout', checkLog, AuthController.logout);

module.exports = router;
module.exports = function (req, res, next) {
    if (req.session.isLogged) {
        if (req.session.user) {
            next();
        }
        else {
            return res.redirect('/auth/signin');
        }
    }
    else {
        return res.redirect('/auth/signin');
    }
}
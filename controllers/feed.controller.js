module.exports.feed = async function (req, res) {
    res.render('pages/feed', {
        feedName: req.params.feedName
    });
}
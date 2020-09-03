const express = require('express');
const app = express();
const http = require('http').createServer(app);
const dotenv = require('dotenv');
const createError = require('http-errors');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const session = require('express-session');


dotenv.config();
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));
app.use(cookieParser());

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}));

app.set('view engine', 'ejs');
app.use('/public', express.static(path.join(__dirname, 'public')));

app.use(cors());




// Route ları ekliyoruz
const AuthRoute = require('./routes/auth.route');
const IndexRoute = require('./routes/index.route');
const FeedsRoute = require('./routes/feeds.route');
const FeedRoute = require('./routes/feed.route');

// Gelen istekleri ilgili Router a yönlendiriyoruz
app.use('/', IndexRoute);
app.use('/auth', AuthRoute);
app.use('/feeds', FeedsRoute);
app.use('/feed', FeedRoute);







// 404 ü yakalayıp error handler a yönlendiriyoruz
app.use((req, res, next) => {
    next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
    // set locals, only providing error in development
    var errorStatus = req.app.get("env") === "development" ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('pages/error', {
        message: err.message,
        status: errorStatus,
    });
});

const PORT = process.env.PORT || 5000;
http.listen(PORT, () => {
    console.log('Listening on *:' + PORT);
});
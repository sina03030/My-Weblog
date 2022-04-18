const path = require('path');

const debug = require('debug')('app.js');
const express = require('express');
const dotEnv = require('dotenv');
const morgan = require('morgan');
const expressLayoutes = require('express-ejs-layouts');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const MongoStore = require('connect-mongo');

const connectDB = require('./config/db');
const auth = require('./middlewares/auth');
const winston = require('./config/winstone');

// setting config.env files to system environemt variables
dotEnv.config({ path: "./config/config.env" });
debug('dot-env configed');

// database connection 
connectDB();

//* pass config
require('./config/passport');
debug('passport configed');

const app = express();

//* body parser
app.use(express.urlencoded({ extended: false }));
debug('body parser configed');

// logging
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('combined', { stream: winston.stream }));
    debug('morgan logger configed for developement')
}


//* view engine
app.use(expressLayoutes);
app.set('view engine', 'ejs');
app.set('layout', './layouts/mainLayout.ejs');
app.set('views', 'views');
debug('views & layouts set');

//* session
app.use(session({
    secret: 'should be env var',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URL }),
}));
debug('session set');

//* Passport
app.use(passport.initialize());
app.use(passport.session());
debug('session initialized');

//* flash
app.use(flash());
debug('flash set');

//* statics
app.use(express.static(path.join(__dirname, 'public')));
debug('public statics set');

//* routes
app.use(require('./routes/blog'));
app.use('/dashboard', auth.authenticated, require('./routes/dashboard'));
app.use('/users', require('./routes/users'));
debug('routes set');

//* 404
app.use((req, res) => {
    res.render('404', { pageTitle: 'page not found', path: '/404' });
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    debug(`server is up and running on port ${PORT}`);
});
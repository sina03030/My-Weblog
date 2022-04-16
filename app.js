const path = require('path');

const express = require('express');
const dotEnv = require('dotenv');
const morgan = require('morgan');
const expressLayoutes = require('express-ejs-layouts');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');

const connectDB = require('./config/db');

// setting config.env files to system environemt variables
dotEnv.config({ path: "./config/config.env" });

// database connection 
connectDB();

//* pass config
require('./config/passport');

const app = express();

//* body parser
app.use(express.urlencoded({ extended: false }));

// logging
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}


//* view engine
app.use(expressLayoutes);
app.set('view engine', 'ejs');
app.set('layout', './layouts/mainLayout.ejs');
app.set('views', 'views');

//* session
app.use(session({
    secret: 'should be env var',
    cookie: {maxAge: 60000},
    resave: false,
    saveUninitialized: false,
}));

//* Passport
app.use(passport.initialize());
app.use(passport.session());

//* flash
app.use(flash());

//* statics
app.use(express.static(path.join(__dirname, 'public')));

//* routes
app.use(require('./routes/blog'));
app.use('/dashboard', require('./routes/dashboard'));
app.use('/users', require('./routes/users'));

//* 404
app.use((req, res) => {
    res.render('404',{pageTitle: 'page not found',path: '/404'});
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`server is up and runnig in ${process.env.NODE_ENV} on port ${PORT}`));
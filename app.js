const path = require('path');

const express = require('express');
const dotEnv = require('dotenv');
const morgan = require('morgan');
const expressLayoutes = require('express-ejs-layouts');

const blogRoutes = require('./routes/blog');
const dashRoutes = require('./routes/dashboard');
const connectDB = require('./config/db');

// setting config.env files to system environemt variables
dotEnv.config({ path: "./config/config.env" });

// database connection 
connectDB();

const app = express();

//* custom middleware
// logging
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}


//* view engine
app.use(expressLayoutes);
app.set('view engine', 'ejs');
app.set('layout', './layouts/mainLayout.ejs');
app.set('views', 'views');

//* statics
app.use(express.static(path.join(__dirname, 'public')));

//* routes
app.use(blogRoutes);
app.use('/dashboard', dashRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`server is up and runnig in ${process.env.NODE_ENV} on port ${PORT}`));
const path = require('path');

const express = require('express');
const dotEnv = require('dotenv');
const morgan = require('morgan');

const indexRoutes = require('./routes');

// setting config.env files to system environemt variables
dotEnv.config({ path: "./config/config.env" });

const app = express();

//* custom middleware
// logging
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}


//* view engine
app.set('view engine', 'ejs');
app.set('views', 'views');

//* statics
app.use(express.static(path.join(__dirname, 'public')));

//* routes
app.use(indexRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`server is up and runnig in ${process.env.NODE_ENV} on port ${PORT}`));
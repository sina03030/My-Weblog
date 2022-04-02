const path = require('path');

const express = require('express');

const indexRoutes = require('./routes');

const app = express();

//* view engine
app.set('view engine', 'ejs');
app.set('views', 'views');
//* statics
app.use(express.static(path.join(__dirname, 'public')));

//* routes
app.use(indexRoutes)

const PORT = 3000;
app.listen(PORT,()=> console.log(`server is up and runnig on port ${PORT}`));
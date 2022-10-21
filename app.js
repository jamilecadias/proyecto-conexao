const express = require('express');
const app = express();
const path = require('path');
const mainRoutes = require('./routes/mainRoutes');
const methodOverride =  require('method-override');
const session = require('express-session');
const publicPath= path.resolve(__dirname, './public')
const apiRouter = require('./routes/apiRouter');
const userLoggedMiddleware = require("./middlewares/userLoggedMiddleware");


app.use(methodOverride('_method'));

app.use(express.static('public'));

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use(session({
    secret: "secreto",
    resave: false,
    saveUninitialized: false,
})); 

app.use(userLoggedMiddleware);


app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public'))); 

app.set('views', path.join(__dirname, '/views')); 

app.use('/', mainRoutes);

app.use('/api', apiRouter);

app.listen(3000, () => {
    console.log('Servidor levantado en el puerto 3000');
  })


const express = require('express');

const app = express();

const path = require('path');

const mainRoutes = require('./routes/mainRoutes');

const methodOverride =  require('method-override');

const publicPath= path.resolve(__dirname, './public')

app.use(methodOverride('_method'));

app.use(express.static('public'));

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public'))); 

/* app.use(express.static(publicPath)); */

app.set('views', path.join(__dirname, '/views')); 

app.use('/', mainRoutes);

app.listen(3000, () => {
    console.log('Servidor levantado en el puerto 3000');
  })

  

 

/* app.get('/', (req,res)=>{
    res.sendFile(__dirname + '/views/home.html');
});

app.get('/login', (req,res)=>{
    res.sendFile(__dirname + '/views/login.html');
});

app.get('/register', (req,res)=>{
    res.sendFile(__dirname + '/views/register.html');
});

app.get('/dashboard', (req,res)=>{
    res.sendFile(__dirname + '/views/dashboard.html');
});

app.get('/edit-user', (req,res)=>{
    res.sendFile(__dirname + '/views/edit-user.html');
}); */
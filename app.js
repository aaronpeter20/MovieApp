const express = require('express');
const app = new express(); 

const morgan = require('morgan');
app.use(morgan('dev'))

app.set('view engine', 'ejs');
app.set('views',__dirname+'/views');
app.use(express.static('public'));

const nav=[
    {link:'/movies/home',
      name:'Home'},
    {link:'/movies/addmovies',
     name:'Add Movies'}
    ]

const movieRoutes = require('./routes/movieRoutes')(nav);
app.use('/movies', movieRoutes);
require('dotenv').config();
require('./db/connection');



app.listen(process.env.PORT,()=>{
    console.log(`Server is running on http://localhost:${process.env.PORT}/movies/home`);
}
);



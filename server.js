const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const authorRoutes = require('./routes/authors');
const postRoutes = require('./routes/posts');
const commentRoutes = require('./routes/comments');
require('dotenv').config();


//Middlewares
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


//DB config
mongoose.connect(process.env.DATABASE_URL, {
   useNewUrlParser: true,
   useUnifiedTopology: true,
   useCreateIndex: true,
   useFindAndModify: false
})
const db = mongoose.connection
db.once('open', () => {
   console.log('Connected to database...')
})
db.on('error', error => {
   console.error('Error')
})

//Set up 
app.use('/authors', authorRoutes);
app.use('/posts', postRoutes);
app.use('/comments', commentRoutes);

//Error Handling
app.use((req, res, next) => {
   const error = new Error('Not found!')
   error.status = 404
   next(error)
})

app.use((error, req, res, next) => {
   res.status(error.status || 500)
   res.json({
       error: {
           message: error.message
       }
   })
})

//Port config
PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
   console.log(`Server running on port ${PORT}`)
})
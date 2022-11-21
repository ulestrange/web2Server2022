require('dotenv').config();
// note this required a .env file which is not in github

const express = require('express');
const passport = require('passport');
const cors = require('cors');
const {User} = require('./models/users');



// own  modules
const db = require('./database');
const books = require('./routes/books');
const home = require('./routes/home');
const auth = require('./routes/auth');
const users = require('./routes/users');

const app = express()
const port = process.env.PORT || 3001




// Passport Config
passport.use(User.createStrategy());
app.use(passport.initialize());




app.use(express.json());

//app.use(cors());

var corsOptions = {
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }


app.use('/books',  cors(corsOptions), books);


app.use('/',  home); 

 app.use('/books',   books);
 app.use('/users', users);
 app.use('/auth', auth)









app.listen(port, () => console.log(`Example app listening on port ${port}!`))

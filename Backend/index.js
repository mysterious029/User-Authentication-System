const express = require('express');
const { Sequelize } = require('sequelize');
const session = require('express-session');
const passport = require('passport');
const route = require('./Routes/routes');
const sync = require('./Sync/sync');
const path = require('path');

require('dotenv').config();


const app = express();

sync()
  .then(() => {
    console.log('Database and User Table created!');
  })
  .catch((error) => {
    console.error('Unable to sync database:', error);
  });


app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


// Serve static files from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// Optional: Serve favicon.ico explicitly
app.get('/favicon.ico', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'favicon.ico'));
});

// Parse JSON bodies
app.use(express.json());

// Express session middleware
const sessionSecret = process.env.SECRET_KEY || 'fallbackSecretKey';

app.use(session({
  secret: sessionSecret,
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: process.env.NODE_ENV === 'production', 
    httpOnly: true,
    sameSite: 'strict'
  }
}));

const morgan = require('morgan');
const createLogger = require('./logger');

const logger = createLogger();

// Morgan setup to log HTTP requests
app.use(morgan('combined', {
  stream: { write: (message) => logger.info(message.trim()) }
}));

// Error handling middleware
app.use((err, req, res, next) => {
  logger.error(err.stack); 
  res.status(500).send('Something broke!');
});

app.use('/uploads',express.static('uploads'));

// Initialize Passport and session handling
app.use(passport.initialize());
app.use(passport.session());

// Use routes
app.use('/', route);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

/**
 * Module dependencies.
 */
const express = require('express');
const errorHandler = require('errorhandler');
const compression = require('compression')
const logger = require('morgan');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const expressValidator = require('express-validator');
const bodyParser = require('body-parser');


/**
 * Load environment variables from .env file
 */
dotenv.load({ path: '.env' });

/**
 * Controllers (route handlers).
 */
const birdController = require('./controllers/birdController');


/**
 * Create Express server.
 */
const app = express();

/**
 * Connect to MongoDB.
 */
mongoose.connect(process.env.MONGODB_URI || process.env.MONGOLAB_URI);
mongoose.connection.on('error', () => {
  console.error('MongoDB Connection Error. Please make sure that MongoDB is running.');
  process.exit(1);
});


/**
 * Express configuration.
 */
app.set('port', process.env.PORT || 3000);
app.use(compression());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());


/**
 * Primary app routes.
 */
app.get('/birds', birdController.getBirds);
app.get('/birds/:id', birdController.getBird);
app.post('/birds', birdController.postBird);
app.delete('/birds/:id', birdController.deleteBird)


/**
 * Error Handler.
 */
app.use(errorHandler());

/**
 * Start Express server.
 */
app.listen(app.get('port'), () => {
  console.log('Express server listening on port %d in %s mode', app.get('port'), app.get('env'));
});

module.exports = app;
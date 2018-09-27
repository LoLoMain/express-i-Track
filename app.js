const express               = require('express');
const path                  = require('path');
const logger                = require('morgan');
const cookieParser          = require('cookie-parser');
const bodyParser            = require('body-parser');
const mongoose              = require('mongoose');
const session               = require('express-session');
const createError           = require('http-errors');
const passport              = require('passport');
const cors                  = require('cors');
const sassMiddleware        = require('node-sass-middleware');

//Connect to Local DB
mongoose.connect('mongodb://localhost/i-Track');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Midddlewares
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: true, // true = .sass and false = .scss
  sourceMap: true
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use(passport.initialize());
app.use(passport.session);

app.use(cors({
  credentials: true,
  origin: ['http://localhost:4200']

}));

//Create 'Current User' Var
app.use((req, res, next) =>{
  if(req.user) {
    res.locals.currentUser = req.user;
  }
  next();
});
// End Middlewares


// Routes
// Landing page
const index = (require('./routes/index'));
app.use('/', index);

const authorization = (require('./routes/authorization-routes'));
app.use('/', authorizationRoutes);
// End Routes


// Catch 404 and forward to error handler
app.use((req, res, next)=> {
  next(createError(404));
});

// error handler
app.use((err, req, res, next)=> {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

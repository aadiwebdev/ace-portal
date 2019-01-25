const express =require('express');
const app =express();
const path =require('path');
var mongoose = require('mongoose');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
const bodyParser =require('body-parser');
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
const router = require('./routes/router');
app.set('view engine','ejs');
app.set('views','views');
app.use(express.static(path.join(__dirname,'public'),{extended:false}));
const options = {
  useNewUrlParser: true,
  autoIndex: false, // Don't build indexes
  reconnectTries: 100, // Never stop trying to reconnect
  reconnectInterval: 500, // Reconnect every 500ms
  poolSize: 10, // Maintain up to 10 socket connections
  // If not connected, return errors immediately rather than waiting for reconnect
  bufferMaxEntries: 0
};
mongoose.connect('mongodb://aditya:password8@ds211275.mlab.com:11275/ace-portal',options).then(
()=>{
  console.log("connected to mongoDB")},
(err)=>{
   console.log("err",err);
});
//connect to MongoDB
//mongoose.Promise = global.Promise;
var db = mongoose.connection;
//handle mongo error
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function () {
//   // we're connected!
// });

//use sessions for tracking logins
app.use(session({
  secret: 'work hard',
  resave: true,
  saveUninitialized: false,
  store: new MongoStore({
    mongooseConnection: db
  })
}));
app.use(router);
// catch 404 and forward to error handler
// app.use(function (req, res, next) {
//     var err = new Error('File Not Found');
//     err.status = 404;
//     next(err);
//   });
  
//   // error handler
//   // define as the last app.use callback
//   app.use(function (err, req, res, next) {
//     res.status(err.status || 500);
//     res.send(err.message);
//   });
app.listen(3000,()=>{
    console.log("HI welcome to express Js\n");
});
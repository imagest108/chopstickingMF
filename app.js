
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var Spacebrew = require('./sb-1.2.0');

// the ExpressJS App
var app = express();

/*var server = "sandbox.spacebrew.cc";
var name = "chopsticking web server";
var description = "JS";

var sb = new Spacebrew.Spacebrew.Client(server, name, description);

sb.addSubscribe("value","range");
sb.onRangeMessage = onRangeMessage;

var serialValue;

function onRangeMessage( name, value ){
 
  if(value != 0){
    
    serialValue = value;
    //console.log(serialValue);

  }
}
*/
// configuration of port, templates (/views), static files (/public)
// and other expressjs settings for the web server.
app.configure(function(){

  // server port number
  app.set('port', process.env.PORT || 9000);

  //  templates directory to 'views'
  app.set('views', __dirname + '/views');

  // setup template engine - we're using Hogan-Express
  app.set('view engine', 'html');
  app.set('layout','layout');
  app.engine('html', require('hogan-express')); // https://github.com/vol4ok/hogan-express

  app.use(express.favicon());
  // app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
  
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

/* 
SKIPPING FOR FUTURE CLASSES
SESSIONS w/ MongoDB (store sessions across multiple dynos)
COOKIEHASH in your .env file (also share with heroku) 
*/
// app.use(express.cookieParser(process.env.COOKIEHASH));
// app.use(express.session({ 
//     store: new mongoStore({url:process.env.MONGOLAB_URI, maxAge: 300000})
//     , secret: process.env.COOKIEHASH
//   })
// );

// ROUTES

var routes = require('./routes/index.js');

app.get('/', routes.index);
app.get('/learn', routes.learn);
app.get('/play', routes.play);
app.post('/play',routes.scorecheck);
app.get('/about', routes.about);
app.get('/contact',routes.contact);
app.get('/press',routes.press);
app.get('/photo',routes.photo);
//app.get('/start', routes.count);

// create NodeJS HTTP server using 'app'
http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});


//sb.connect();











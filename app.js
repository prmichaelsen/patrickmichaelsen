
/**
 * Module dependencies.
 */

var express = require('express')
	, bodyParser = require('body-parser')
	, mongoClient = require('mongodb').MongoClient
	, marked = require('marked')
	, favicon = require('serve-favicon')
  , routes = require('./routes');


//CONFIGURE MARKDOWN
marked.setOptions({
	highlight: (code)=>{
		return require('highlight.js').highlightAuto(code).value;
	}
});

var app = module.exports = express.createServer();

app.use(express.static(__dirname + '/public'));
app.use(express.favicon(__dirname+'/public/images/pm-icon-32.ico'));

const MONGO_USER = process.env.PATRICKMICHAELSEN_MONGO_USER;
const MONGO_PASSWORD = process.env.PATRICKMICHAELSEN_MONGO_PASSWORD;
const MONGO_HOST = process.env.PATRICKMICHAELSEN_MONGO_HOST;
const mongodbUri = 'mongodb://'+MONGO_USER+':'+MONGO_PASSWORD+'@'+MONGO_HOST;

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
	app.use(express.favicon(__dirname+'/public/images/pm-icon-32.ico'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes

app.get('/', routes.index);
app.get('/blog', routes.blog);
app.get('/actor/journal', routes.actorJournalList);
app.get('/blog/:blogPost', routes.blogPost);
app.get('/developer', routes.developer);
app.get('*', routes.redirectHome); //must be last route

mongoClient.connect(
		mongodbUri,
		(err,database)=>{
			db = database;		

			app.listen(8443, function(){
				console.log(
					"Express server listening on port %d in %s mode", 
					app.address().port, app.settings.env);
			});
		});


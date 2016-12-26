var express = require('express'); //引入express框架
var path = require('path');
var mongoose = require('mongoose');
var logger = require('morgan');
var port = process.env.PORT || 3000;
var app = express();
var bodyParser = require('body-parser');
var dbUrl = 'mongodb://localhost/lejuUDE';
mongoose.connect(dbUrl);

app.set('views','./app/views/pages');
app.set('views engine','jade');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname,'public')));
app.use(require('connect-multiparty')());
app.locals.moment = require('moment')
app.use(session({
	secret: 'lejuUDE',
	store: new mongoStore({
		url: dbUrl,
		collection: 'sessions'
	})
}));

if ('development' === app.get('env')) {
	app.set('showStackError',true)
	app.use(logger(':method :url :status'))
	app.locals.pretty = true
	mongoose.set('debug',true)
}

require('./config/routers')(app)
app.listen(port)


console.log('started')

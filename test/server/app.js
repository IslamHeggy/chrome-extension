var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var filesRouter = require('./routes/files');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.post('/update', function (request, response) {
	try {
		console.log('Received  URL update Request \n ');
	}
	catch (e) {
		console.log("Exception in processing Request");
		console.log(e);
	}
	response.sendStatus(200);
})


/* Upload. */
app.post('/upload', function(req, res, next) {
    console.log(JSON.stringify(req.headers));
    console.log(JSON.stringify(req.body));
	res.status(201);
	res.send("Uploaded");
});


/* Download. */
app.get('/download', function(req, res, next) {
    res.download('./sample.pdf', 'sample-dirty-pdf.pdf')
});

app.listen(8080, function () {
	console.log('Server listening on port 80 \n');
})


module.exports = app;

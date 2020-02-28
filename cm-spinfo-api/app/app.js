var express    = require('express');
var createError= require('http-errors');
var app        = express();
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

var log4js = require('log4js');

log4js.configure({
  appenders: {
      console: {
        type: 'console'
      },
      logfile: {
        type: 'dateFile',
        filename: './logs/express.log',
        pattern: '.yyyy-MM-dd',
        keepFileExt: true,
        maxLogSize: 10485760
      },
      errorlog: {
        type: 'dateFile',
        filename: './logs/express_error.log',
        pattern: '.yyyy-MM-dd',
        keepFileExt: true,
        maxLogSize: 10485760,
        level :'error'
      },
      justErrors: {
        type: 'logLevelFilter',
        appender: 'errorlog',
        level: 'error'
      }
  },
  categories: {
      default: {appenders:['console','logfile','justErrors'], level: 'debug'},
  }
});

var logger = log4js.getLogger();

// CORSを許可する
app.use(function(req, res, next) {
  //res.header("Access-Control-Allow-Origin", "*");
  //res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Expose-Headers", "Access-Control-*")
  res.header("Access-Control-Allow-Headers", "Access-Control-*, Origin, X-Requested-With, Content-Type, Accept")
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, HEAD')
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Allow', 'GET, POST, PUT, DELETE, OPTIONS, HEAD');
  next();
});

// app.use(log4js.connectLogger(logger));
app.use(function(req, res, next){
  logger.info([
    getip(req),
    new Date().toLocaleString(),
    req.method,
    req.url,
    res.statusCode,
    req.headers.referer || '-',
    req.headers['user-agent'] || '-'
    ].join('\t')
    );
    next();
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride('_method'))

var router = require('./routes/v1/');
app.use('/api/v1/', router);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  if (err.status === 404) {
    logger.error(err.message);
  } else {
    logger.error(err);
  }
  res.status(err.status || 500);
  res.json({
    err: {
      message: err.message,
    },
  });
});

function getip(req) {
  var headerip = req.headers ? getheaderip(req) : 'unknown'
  if (headerip.length > 15) {headerip = headerip.match(/\d+\.\d+\.\d+\.\d/g)[0]}
  return headerip
  function getheaderip(req) {
    return req.headers['x-forwarded-for']
    ? req.headers['x-forwarded-for']
    : (req.connection && req.connection.remoteAddress)
    ? req.connection.remoteAddress
    : (req.connection.socket && req.connection.socket.remoteAddress)
    ? req.connection.socket.remoteAddress
    : (req.socket && req.socket.remoteAddress)
    ? req.socket.remoteAddress
    : '0.0.0.0';
  }
}

module.exports = app;

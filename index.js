var http = require("http");
var connect = require("connect");
var favicon = require('serve-favicon');
var confMain = require("./conf/main");
var map = require("./lib/map")(confMain);

var app = connect();
app.use(favicon(__dirname + '/images/favicon.ico'));

map.forEach(function(m){
    app.use(m.path,m.process);
});

app.use(function(req,res,next){
    res.statusCode = 200;
    res.write("kskks\n");
    console.log(req.url);
    next();
}).use(function(req,res){
    res.end('Hello from fronendServer!\n');
});
console.log(app.stack)
http.createServer(app).listen(8080);


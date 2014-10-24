var http = require("http");
var url  = require("url");
var connect = require("connect");
var favicon = require('serve-favicon');
var confMain = require("./conf/main");
var map = require("./lib/map")(confMain);

var app = connect();

//处理favicon
app.use(favicon(__dirname + '/images/favicon.ico'));

//暴力修正，请求目录等于请求index.html
app.use(function(req,res,next){
    var info = url.parse(req.url);
    if(info.pathname.indexOf("/",info.pathname.length-1) !== -1){
        req.url = info.pathname+"index.html"+info.search;
    }
    next();
});

//路由到各个处理器
map.forEach(function(m){
    app.use(m.path,m.process);
});

app.use(function(req,res,next){
    console.log(res.statusCode)
    console.log(req.url);
    next();
}).use(function(req,res){
    res.end();
});
console.log(app.stack)
http.createServer(app).listen(8080);


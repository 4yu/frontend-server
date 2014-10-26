//cgi合并处理,
//支持两种post格式，application/json，application/x-www-form-urlencoded
var http  = require("http");
var url  = require("url");
var dot = require("dot");
var async = require("async");
module.exports = function(conf){
    var retTemp = "{{{=result}}}",dataSource = [];
    conf = conf || {};
    if(conf.retTemp){
        retTemp = conf.retTemp;
    }
    if(conf.dataSource){
        dataSource = conf.dataSource;
    }
    function process(req,res,next){
        console.log('i am combo');
        var info = url.parse(req.url,true);

        //同时发出请求，其中一个报错可能会有问题
        async.map(dataSource,function(data,callback){
            var cgi = url.parse(data.url),
                path = cgi.path,
                paramTmplFn = dot.template(data.param),
                targetUrl;
            targetUrl = path+"?"+paramTmplFn(info.query);
            var options = {
                hostname: cgi.hostname,
                path: targetUrl,
                method: 'get'
            };
            var body = "";
            var cgiRequest = http.request(options, function(res) {
                console.log(res.headers);
                console.log(res.statusCode);
                res.setEncoding('utf8');
                res.on('data', function (chunk) {
                   // console.log('BODY: ' + chunk);
                    body = body + chunk;
                });
                res.on('end',function(){
                    if(res.statusCode == 200 && body){
                        callback(null,data.name +":"+body);
                    }
                    else{
                        callback(res.statusCode);
                    }
                });
            });
            cgiRequest.on('error', function(e) {
            });
           // cgiRequest._headers = req.headers;

            cgiRequest.setHeader("referer", req.headers.referer);
            cgiRequest.setHeader("cookie", req.headers.cookie);
             cgiRequest.end();
        },function(error,results){
            if(error){
                res.statusCode = error;
                console.log(error);
            }
            else{
                //console.log("results:"+results[0]);
                var tempData = "{";
                results.forEach(function(ressult){
                    tempData = tempData + ressult+",";
                });
                tempData =  tempData.substr(0,tempData.length-1);
                tempData = tempData+"}";
                res.setHeader("content-type","application/json");
                res.write(tempData);
            }
            next();
        });
    }
    return process;
}
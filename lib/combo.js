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

        async.map(dataSource,function(data,callback){
            var cgi = url.parse(data.url),
                path = cgi.path,
                paramTmplFn = dot.template(data.param),
                targetUrl;
            targetUrl = path+"?"+paramTmplFn(info.query);
            var options = {
                hostname: cgi.hostname,
                path: url,
                method: 'get'
            };
            console.log(options)

            var cgiRequest = http.request(options, function(res) {
                console.log('STATUS: ' + res.statusCode);
                console.log('HEADERS: ' + JSON.stringify(res.headers));
                res.setEncoding('utf8');
                res.on('data', function (chunk) {
                    console.log('BODY: ' + chunk);
                });
                res.on('end',function(){
                    console.log('end:'+data.url);
                    callback(null,"ssss");
                });
            });

            cgiRequest.on('error', function(e) {
                console.log(e);
                callback("error");
            });

            cgiRequest.setHeader("Cookie","RK=CGNTtLHE2M; pgv_flv=11.9 r900; pgv_pvi=2444897280; ts_refer=imgcache.qq.com/qqshow/v5/fashion/html/index/index_f.html; o_cookie=445671; qs_tk=39; session=1; pt2gguin=o0000445671; uin=o0000445671; skey=@iHDkY5NN8; ptisp=ctc; ptcz=4d3db36b0e983f58827c3a036578c634b24c8157ac9351bf0d2730859fdbe3bf; ptui_loginuin=445671; ts_last=show.qq.com/; ts_uid=8591369875; pgv_info=ssid=s4811615687; pgv_pvid=5565957998");
            cgiRequest.end();
        },function(error,results){
            console.log("error");
        });

        next();
    }
    return process;
}
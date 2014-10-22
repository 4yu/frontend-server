//路由映射
var process = {
    combo : require("./combo"),
    bigpipe : require("./bigpipe"),
    proxy : require("./proxy"),
    static : require("./static"),
    straight : require("./straight")
};


module.exports = function(conf){
    //return [{path:"/",process:fn},...]
    var map = [];
    if(conf){
        var paths = conf.paths;
        var subs,item,processFn;
        for( p in paths){
            item = null;
            processFn = process[paths[p].process];
            if(paths[p].type == 1){
                subs = conf[p];
                if(subs){
                    for(sp in subs){
                        item = {};
                        item.process = processFn(subs[sp]);
                        item.path = p +sp;
                    }
                }
            }
            else{
                item = {};
                item.process = processFn();
                item.path = p;
            }
            if(item){
                map.push(item);
            }
        }
    }
    return map;

};
//反向代理处理
module.exports = function(conf){
    function process(rep,res,next){
        next();
    }
    return process;
}
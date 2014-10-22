//静态文件处理器
module.exports = function(conf){
    function process(rep,res,next){
        console.log('i am static');
        next();
    }
    return process;
}
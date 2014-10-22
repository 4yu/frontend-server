//cgi合并处理
module.exports = function(conf){
    function process(rep,res,next){
        console.log('i am combo');
        next();
    }
    return process;
}
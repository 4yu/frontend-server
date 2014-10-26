//配置文件
module.exports = {
    paths: {
        "/index.html": {enable: true, type: 0,process:"straight"},//首页,type,0表示页面，1表示目录（目录必须有子页面配置，且目录名称不能是paths，如下combo示例）
        "/combo": {enable: true, type: 1,process:"combo"},//合并
        "/proxy": {enable: true, type: 1,process:"proxy"},//代理
        "/html": {enable: true, type: 1,process:"bigpipe"}//其他html文件，bigpipe？
    },
    "/combo": {//这里的参数名称，要求与传入的名称一样，参数模板格式，dot
        "/health1": {dataTmpl:"{{{=it.data}}}",dataSource:[
            {name: "userData",method:"post",url:"http://client.show.qq.com/cgi-bin/qqshow_client_historyshow_get",
                param:"g_tk={{=it.g_tk}}&omode={{=it.omode}}&dstuin={{=it.dstuin}}&pno={{=it.pno}}&pnum={{=it.pnum}}&status={{=it.status}}&styleType={{=it.styleType}}&queryType={{=it.queryType}}"}
            ,{name:"getUser",url:"http://client.show.qq.com/cgi-bin/qqshow_client_historyshow_get",
                param:"g_tk={{=it.g_tk}}&omode={{=it.omode}}&dstuin={{=it.dstuin}}&pno={{=it.pno}}&pnum={{=it.pnum}}&status={{=it.status}}&styleType={{=it.styleType}}&queryType={{=it.queryType}}"}
        ]}
    }
};
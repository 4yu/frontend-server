//配置文件
module.exports = {
    paths: {
        "/index.html": {enable: true, type: 0,process:"straight"},//首页,type,0表示页面，1表示目录（目录必须有子页面配置，且目录名称不能是paths，如下combo示例）
        "/combo": {enable: true, type: 1,process:"combo"},//合并
        "/proxy": {enable: true, type: 1,process:"proxy"},//代理
        "/html": {enable: true, type: 1,process:"bigpipe"}//其他html文件，bigpipe？
    },
    "/combo": {//这里的参数名称，要求与传入的名称一样，参数模板格式，dot
        "/health1": {dataSource:[
            {name: "userData", url: "http://show.qq.com/cgi-bin/getUser", method: "post",
                param: "omode=3&uin={{=it.uin}}"},
            {name: "profileData",url: "http://show.qq.com/cgi-bin/getProfile", method: "post",
                param: "omode=3&uin={{=it.uin}}"},
            {name:"getUser",url:"http://client.show.qq.com/cgi-bin/qqshow_client_showinfo?g_tk=1683581383&omode=4&uin=445671&touin=445671&cmd=10413",
            param:""}
        ]}
    }
};
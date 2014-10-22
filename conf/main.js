//配置文件
module.exports = {
    paths: {
        "/index.html": {enable: true, type: 0,process:"static"},//首页,type,0表示页面，1表示目录
        "/combo": {enable: true, type: 1,process:"combo"},//合并
        "/proxy": {enable: true, type: 1,process:"proxy"},//代理
        "/html": {enable: true, type: 1,process:"bigpipe"}//其他html文件，bigpipe？
    },
    "/combo": {//这里的参数名称，要求与传入的名称一样，参数模板格式，dot
        "/health1": [
            {name: "userData", url: "http://show.qq.com/cgi-bin/getUser", method: "post",
                param: "omode=3&uin={{uin}}"},
            {"profileData": "http://show.qq.com/cgi-bin/getProfile"}
        ]
    }
};
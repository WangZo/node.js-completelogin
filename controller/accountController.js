/**
 * Created by j on 2017/6/24.
 */
//在contoller中主要用来完成业务逻辑
//对数据库进行操作
const dbhelp=require('../tools/dbhelp.js');
const fs=require('fs');
const path=require('path');
//引用验证码
const captchapng = require('captchapng');


//登录 通过登录获取到用户传递过来的数据 登录的api
exports.getlogin=(req,res)=>{
    //console.log(req.query);
    //在这里就是处理登录功能
    //req.query.username
    //req.query.pwd
    //检测你的用户名和密码是否符合要求 如果可以即可登录
    dbhelp.findOne("account",{"username":req.query.username,"pwd":req.query.pwd},(err,data)=>{
        if(data){
            console.log('有一个用户:'+req.query.username);
            res.send('有一个用户:'+req.query.username)
        }else{
            console.log('用户名不存在或者密码错误');
            res.send('用户名不存在或者密码错误')
        }

    })

};

//post登录
exports.postlogin=(req,res)=>{
    //console.log(req.query);
    //在这里就是处理登录功能
    //req.query.username
    //req.query.pwd
    //检测你的用户名和密码是否符合要求 如果可以即可登录
   // req.body.vcode
    if(req.body.vcode==req.session.vcode){
        dbhelp.findOne("account",{"username":req.body.username,"pwd":req.body.pwd},(err,data)=>{
            if(data){
                //console.log('有一个用户:'+req.query.username);
                res.send('有一个用户:'+req.body.username)
            }else{
                console.log('用户名不存在或者密码错误');
                res.send('用户名不存在或者密码错误')
            }

        })
    }else{
        res.send("验证码错误")
    }


};

//登录页面
exports.getloginpage=(req,res)=>{
    fs.readFile(path.join(__dirname,'../view/login.html'),(error,data)=>{
        //读取到页面
        console.log(data);
        //通知浏览器将数据转换成html格式文件
        res.setHeader('content-type','text/html;charset=utf-8')
        res.send(data)
    })
};

//验证码
exports.vcode=(req,res)=>{
    //通过session存储随机数
    req.session.vcode=parseInt(Math.random()*9000+1000);
    //随机数
    let p = new captchapng(80,30,req.session.vcode); // width,height,numeric captcha
    p.color(0, 0, 0, 0);  // First color: background (red, green, blue, alpha)
    p.color(80, 80, 80, 255); // Second color: paint (red, green, blue, alpha)

    let img = p.getBase64();
    //imgbase64 生成的图片
    let imgbase64 = new Buffer(img,'base64');
    //设置请求头
    res.setHeader("Content-Type", "image/png");
    res.end(imgbase64);
};

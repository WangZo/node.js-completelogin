//创建路由
const router=require('express').Router();
const accountController=require('../controller/accountController.js')

//登录api
//router.get('/login',accountController.getlogin);
//post登录api接口
router.post('/logindata',accountController.postlogin);

//html js css img  get post put delete

//登录页面get请求
router.get('/login',accountController.getloginpage);

//验证码请求
router.get('/vcode',accountController.vcode);


//让外部能够访问
module.exports=router;
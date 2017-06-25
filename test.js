/**
 * Created by j on 2017/6/24.
 */
const dbhelp=require('./tools/dbhelp.js');

//插入
// dbhelp.findOne("account",{"username":"zhangsan","pwd":"123456"},(err,data)=>{
//     console.log(data);
// });
//查询
dbhelp.findOne("user",{"name":"10086"},(err,data)=>{
   // console.log(data);
});
dbhelp.findOne("account",{"username":"zhangsan","pwd":"123456"},(err,data)=>{
    console.log(data);
})

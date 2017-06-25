//写链接数据库的帮助模块
const MongoClient = require('mongodb').MongoClient;
let url = 'mongodb://localhost:27017/itcast';

//链接数据库的方法
//每一个crud都需要链接数据库
function getDB(callback) {
    MongoClient.connect(url, function(err, db) {
        console.log(err);
        //有错误先返回错误
       if(err){
            callback(err);
        }else{
            //如果没有错误则将db返回出去
            callback(null,db);
        }
        db.close();
    });
}

//查找一条数据
//collectionName 集合名称
//select 查询条件
//callback 查询后的回调函数的结果
exports.findOne=(collectionName,select,callback)=>{
    //调用连接
    console.log('1');
    getDB((err,db)=>{
        console.log(2);
        if(err) {
            callback(err);
        }else{
            console.log('3');
            //查询数据库中的数据并且只返回一条数据
            db.collection(collectionName).findOne(select,(error,docs)=>{
                console.log(docs);
                if(error){
                    callback(err);
                } else{
                    callback(null,docs)
                }

            })
        }
        db.close();
    })
};
//select 查询条件
//callback 查询后的回调函数的结果
exports.insertOne=(collectionName,data,callback)=>{
    //调用连接
    getDB((err,db)=>{
        if(err) {
            callback(err);
        }else{
            //查询数据库中的数据并且只返回一条数据
            db.collection(collectionName).insertOne(data,(error,docs)=>{
                if(error){
                    callback(err);
                } else{
                    callback(null,docs)
                }

            })
        }
    })
};
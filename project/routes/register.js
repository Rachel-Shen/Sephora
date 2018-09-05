var express = require('express');
var router = express.Router();

let mongodb = require('mongodb');//mongodb == 对象
const MongoClient = require('mongodb').MongoClient; //链接对象
let url='mongodb://localhost:27017';

router.get('/', function (req, res, next) {
  MongoClient.connect(url, function (err, client) {
    //err == 错误   client= 链接体
    if (err) console.log(err);
    const db = client.db('sephora');//db==库 
    const user = db.collection('user');
    let username=req.query.username;
    let password=req.query.password;
    //查询
    user.find({username:username}).toArray((err, data) => {
        if (err) {
            res.send({"error":1,"msg":"库操作错误","data":null})
        } else if(data.length>0){ 
            res.send({"error":1,"msg":"用户名已被注册，请更改或直接登录","data":data})
        }else{
            next();
        }
    })
    client.close();//关闭连接
  });
});

router.get('/', function (req, res, next) {
  MongoClient.connect(url, function (err, client) {
    //err == 错误   client= 链接体
    if (err) console.log(err);
    const db = client.db('sephora');//db==库 
    const user = db.collection('user');
    let username=req.query.username;
    let password=req.query.password;
    //增加
    user.insertOne({username:username,password:password,data:[]},(err,data)=>{
        if (err) {
            res.send({"error":1,"msg":"库操作错误","data":null})
        } else{
            res.send({"error":0,"msg":"注册成功","data":null})
        }
    })
    client.close();//关闭连接
  });

});

module.exports = router;
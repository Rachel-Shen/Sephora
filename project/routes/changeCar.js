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
    //查询
    let type=req.query.type;
    let use=req.query.user;
    let num=+req.query.num;
    let goodsId=req.query.goodsId;
    user.find({username:use}).toArray((err, data) => {
        let arr=data[0].car
        if (type==1) {
            for (var i=0;i<arr.length;i++) {
                if (arr[i].goodsId==goodsId) {
                    if(num==0){
                        arr.splice(arr.indexOf(arr[i].goodsId),1)
                    } else {
                        arr[i].num=num                   
                    }
                }
            }       
        } else if(type==0){
            arr.splice(0,arr.length);
        }
        res.data=arr
        next()
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
    let use=req.query.user;
    //修改
    user.update({username:use},{$set:{car:res.data}})
    client.close();//关闭连接
  });
});

module.exports = router;
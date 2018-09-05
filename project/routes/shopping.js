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
    let use=req.query.user;
    user.find({username:use}).toArray((err, data) => {
        res.data=data[0].car
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
    const user = db.collection('goods');
    //查询
    let dataArr=[]
    user.find({}).toArray((err, data) => {
        for (var i=0;i<data.length;i++) {
            for (var j=0;j<res.data.length;j++) {
                if (data[i].goodsID==res.data[j].goodsId) {
                    data[i].num=res.data[j].num
                    dataArr.push(data[i])
                }
            }
        }
        res.send(dataArr)
    })
    client.close();//关闭连接
  });
});

module.exports = router;
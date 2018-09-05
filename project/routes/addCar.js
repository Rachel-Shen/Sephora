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
    let goodsId=req.query.id;
    let num=+req.query.num;
    user.find({username:use}).toArray((err, data) => {
        let dataArr=data[0].car
        var onOff=true
        for (var i=0;i<dataArr.length;i++) {
            if(dataArr[i].goodsId==goodsId){
                dataArr[i].num+=num
                onOff=false
            }
        }
        if(onOff){             
            dataArr.push({"goodsId":goodsId,"num":num})
        }
        res.data=dataArr
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
    console.log(res.data)
    user.update({username:use},{$set:{car:res.data}})
    client.close();//关闭连接
  });
});

module.exports = router;
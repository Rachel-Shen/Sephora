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

    const user = db.collection('goods');

    //查询
    user.find({}).toArray((err, data) => {
        res.send(data);
    })

    client.close();//关闭连接

  });

});

module.exports = router;

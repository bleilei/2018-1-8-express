var mysql = require('mysql');
var db = require('../config/db');
var indexSql = require('../config/sqlMap/indexSql');
var util = require('../util/util');

//定义pool池
var pool = mysql.createPool(db.mysql);

module.exports = {
    login : function (req,res,callback,next) {
        pool.getConnection(function (err,connection) {
            if (err) console.log(err);
            var params =  req.query;
            connection.query(indexSql.queryByUserName,[params.username],function (err,result) {
                if(err) console.log(err);
                if(result){
                    callback(result);
                }
                connection.release();
            })
        });
    },
    regist:function(req,res,next){
        returnJson = {};
        pool.getConnection(function (err,connection) {
            if (err) console.log(err);
            var params =  req.body;
            var password = util.encrypt(params.password,'secret');
            var date = util.formatDate(new Date());
            connection.query(indexSql.queryByMail,[params.mail],function(err,resultMail){
                if(err) console.log(err);
                if(resultMail.length !== 0){
                    returnJson.msg = 'error';
                    returnJson.data = '邮箱已注册，请更换邮箱或者直接登陆';
                    res.send(returnJson);
                }else{
                    connection.query(indexSql.insert,[params.username,password,params.mail,date],function (err,result) {
                        if(err) console.log(err);
                        if(result){
                            returnJson.msg = 'success';
                            returnJson.data = '注册成功';
                        }else{
                            returnJson.msg = 'error';
                            returnJson.data = '注册失败';
                        }
                        res.send(returnJson);
                    });
                }
                connection.release();
            });

        });
    },
    mail:function(req,res,callback,next){
        pool.getConnection(function (err,connection) {
            var params = req.query;
            if (err) console.log(err);
            connection.query(indexSql.queryByMail,[params.to],function (err,result) {
                if(err) console.log(err);
                if(result){
                    callback(result);
                }
                connection.release();
            })
        });
    },
    updateUser:function(req,res,callback,next){
        pool.getConnection(function (err,connection) {
            if (err) console.log(err);
            var params = req.body;
            var password = util.encrypt(params.password,'secret');
            var date = util.formatDate(new Date());
            connection.query(indexSql.userQueryByMail,[password,date,params.mail],function (err,result) {
                if(err) console.log(err);
                if(result){
                    callback(result);
                }
                connection.release();
            })
        });
    },
    updateUserInfo:function(req,res,callback,next){
        pool.getConnection(function (err,connection) {
            if (err) console.log(err);
            var params = req.body;
            var date = util.formatDate(new Date());
            var userid = req.session.user.id;
            connection.query(indexSql.queryByUserid,[params.nickname,params.tel,params.email,date,userid],function (err,result) {
                if(err) console.log(err);
                if(result){
                    callback(result);
                }
                connection.release();
            })
        });
    },
    getList:function(req,res,callback,next){
        pool.getConnection(function (err,connection) {
            if (err) console.log(err);
            connection.query(indexSql.getLists,[],function (err,result) {
                if(err) console.log(err);
                if(result){
                    callback(result);
                }
                connection.release();
            })
        });
    },
    add:function(req,res,next){
        var returnJson = {};
        pool.getConnection(function (err,connection) {
            if (err) console.log(err);
            var params =  req.query || req.params || req.body;
            var time = util.formatDate(new Date());
            connection.query(indexSql.newsadd,[params.title,params.content,params.author,time],function (err,result) {
                if(err) console.log(err);
                if(result){
                    returnJson.msg = 'success';
                    returnJson.data = '发布成功'
                }else{
                    returnJson.msg = 'error';
                    returnJson.data = '发布失败'
                }
                // util.responseJONS(res,returnJson);
                res.json(returnJson);
                //释放连接
                connection.release();
            })
        });
    },
    del:function(req,res,callback,next){
        pool.getConnection(function (err,connection) {
            if (err) console.log(err);
            var params =  req.body;
            var json = JSON.parse(params.json);
            connection.query(indexSql.adel,[json],function (err,result) {
                if(err) console.log(err);
                if(result){
                    callback(result)
                }
                connection.release();
            })
        });
    },
    insertReco:function(req,res,callback,next){
        pool.getConnection(function (err,connection) {
            if (err) console.log(err);
            var params =  req.body;
            var json = JSON.parse(params.json);
            connection.query(indexSql.recoInsert,[json],function (err,result) {
                if(err) console.log(err);
                if(result){
                    callback(result)
                }
                connection.release();
            })
        });
    },
    updateReco:function(req,res,callback,next){
        pool.getConnection(function (err,connection) {
            if (err) console.log(err);
            var params =  req.body;
            var json = JSON.parse(params.json);
            var changeTime = util.formatDate(new Date());
            connection.query(indexSql.reco,[changeTime,json],function (err,result) {
                if(err) console.log(err);
                if(result){
                    callback(result)
                }
                connection.release();
            })
        });
    },
    updateArt:function(req,res,callback,next){
        pool.getConnection(function (err,connection) {
            if (err) console.log(err);
            var params =  req.body;
            var changeTime = util.formatDate(new Date());
            connection.query(indexSql.articleUpdate,[params.title,params.content,params.author,changeTime,params.check,params.id],function (err,result) {
                if(err) console.log(err);
                if(result){
                    callback(result)
                }
                connection.release();
            })
        });
    },
    updateCanReco:function(req,res,callback,next){
        pool.getConnection(function (err,connection) {
            if (err) console.log(err);
            var params =  req.query;
            var changeTime = util.formatDate(new Date());
            connection.query(indexSql.recocan,[changeTime,params.id],function (err,result) {
                if(err) console.log(err);
                if(result){
                    callback(result)
                }
                connection.release();
            })
        });
    },
    getData:function(req,res,callback,next){
        pool.getConnection(function (err,connection) {
            if (err) console.log(err);
            connection.query(indexSql.queryAllusers,[],function (err,result) {
                if(err) console.log(err);
                if(result){
                    callback(result);
                }
                connection.release();
            })
        });
    },
    getUserInfo:function(req,res,callback,next){
        pool.getConnection(function (err,connection) {
            if (err) console.log(err);
            var userId = req.session.user.id;
            connection.query(indexSql.queryUserinfoById,[userId],function (err,result) {
                if(err) console.log(err);
                if(result){
                    callback(result);
                }
                connection.release();
            })
        });
    },
    uploadImg:function(req,res,callback,next){
        pool.getConnection(function (err,connection) {
            if (err) console.log(err);
            var userId = req.session.user.id;
            var img = req.dataurl;
            connection.query(indexSql.updateById,[img,userId],function (err,result) {
                if(err) console.log(err);
                if(result){
                    callback(result);
                }
                connection.release();
            })
        });
    },
    addArt:function(req,res,callback,next){
        pool.getConnection(function (err,connection) {
            if (err) console.log(err);
            var params = req.body;
            var time = util.formatDate(new Date());
            connection.query(indexSql.insertArt,[params.title,params.author,params.content,params.reco,time],function (err,result) {
                if(err) console.log(err);
                if(result){
                    callback(result);
                }
                connection.release();
            })
        });
    },
    getNav:function(req,res,callback,next){
        pool.getConnection(function (err,connection) {
            if (err) console.log(err);
            connection.query(indexSql.nav,[],function (err,result) {
                if(err) console.log(err);
                if(result){
                    callback(result);
                }
                connection.release();
            })
        });
    },
    upNav:function(req,res,callback,next){
        pool.getConnection(function (err,connection) {
            if (err) console.log(err);
            var time = util.formatDate();
            connection.query(indexSql.insertNav,[req.dec,req.dataurl,time],function (err,result) {
                if(err) console.log(err);
                if(result){
                    callback(result);
                }
                connection.release();
            })
        });
    },
    scrollDel:function(req,res,callback,next){
        pool.getConnection(function (err,connection) {
            if (err) console.log(err);
            var params = req.query;
            connection.query(indexSql.delNav,[params.id],function (err,result) {
                if(err) console.log(err);
                if(result){
                    callback(result);
                }
                connection.release();
            })
        });
    },
    resetPass:function(req,res,callback,next){
        pool.getConnection(function (err,connection) {
            if (err) console.log(err);
            var params = req.query;
            var password = util.encrypt('123456','secret');
            connection.query(indexSql.resetPassword,[password,params.id],function (err,result) {
                if(err) console.log(err);
                if(result){
                    callback(result);
                }
                connection.release();
            })
        });
    }
};
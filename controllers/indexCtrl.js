var indexDao = require('../dao/indexDao');
var util = require('../util/util');
var fn = require('../util/mail');
var uploadCtrl = require("./uploadCtrl");
var delCtrl = require("./delCtrl");
var indexCtrl = {
    loginAction:function(req,res,next){
        var returnJson = {};
        indexDao.login(req,res,function (result) {
            var params = req.query;
            var password = util.decrypt(result[0].password,'secret');
            if(result.length === 0){
                returnJson.msg = 'error';
                returnJson.data = '登陆名不存在'
            }else if(password !== params.password){
                returnJson.msg = 'error';
                returnJson.data = '登陆密码不正确'
            }else{
                //存储session
                req.session.user = result[0];
                returnJson.msg = 'success';
                returnJson.data = '登陆成功'
            }
            res.send(returnJson);
        },next)
    },
    sendVercode:function(req,res,next){
        var returnJson = {};
        indexDao.mail(req,res,function (result) {
            var mail = req.query.to;
            if(result.length === 0){
                returnJson.msg = 'error';
                returnJson.data = '邮箱未绑定或者邮箱不存在';
                res.send(returnJson);
            }else if(mail === result[0].mail){
                fn.send(req,function(err,success){
                    if (err) {
                        returnJson.msg = 'error';
                        returnJson.data = '发送失败，请稍后再试';
                        res.send(returnJson);
                    }else{
                        returnJson.msg = 'success';
                        returnJson.data = '发送成功,请注意查收';
                        res.send(returnJson);
                    }
                })
            }
        },next);
    },
    forget:function(req,res,next){
        if(req.body.code !== req.session.vercode){
            res.send("验证码不正确");
            return;
        }
        var returnJson = {};
        indexDao.updateUser(req,res,function(result){
            if(result){
                returnJson.msg = 'success';
                returnJson.data = '修改成功'
            }else{
                returnJson.msg = 'error';
                returnJson.data = '修改失败'
            }
            res.send(returnJson);
        },next);
    },
    getData:function(req,res,next){
        var returnJson = {};
        indexDao.getData(req,res,function(result){
            if(result.length === 0){
                returnJson.msg = 'error';
                returnJson.data = '暂时没有注册用户'
            }else{
                returnJson.msg = 'success';
                returnJson.data = result
            }
            res.send(returnJson);
        },next);
    },
    regist:function(req,res,next){
        indexDao.regist(req,res,next);
    },
    artList:function(req,res,next){
        var returnJson = {};
        indexDao.getList(req,res,function(result){
            if(result){
                returnJson.msg = 'success';
                returnJson.data = result
            }else{
                returnJson.msg = 'error';
                returnJson.data = '获取失败'
            }
            res.send(returnJson);
        },next)
    },
    artDel:function(req,res,next){
        var returnJson = {};
        indexDao.del(req,res,function(result){
            if(result){
                returnJson.msg = 'success';
                returnJson.data = '删除成功'
            }else{
                returnJson.msg = 'error';
                returnJson.data = '删除失败'
            }
            res.send(returnJson);
        },next)
    },
    recoIn:function(req,res,next){
        var returnJson = {};
        indexDao.insertReco(req,res,function(result){
            if(result){
                returnJson.msg = 'success';
                returnJson.data = '推荐成功'
            }else{
                returnJson.msg = 'error';
                returnJson.data = '推荐失败'
            }
            res.send(returnJson);
        },next)
    },
    recoup:function(req,res,next){
        var returnJson = {};
        indexDao.updateReco(req,res,function(result){
            if(result){
                returnJson.msg = 'success';
                returnJson.data = '推荐成功'
            }else{
                returnJson.msg = 'error';
                returnJson.data = '推荐失败'
            }
            res.send(returnJson);
        },next)
    },
    artEdit:function(req,res,next){
        var returnJson = {};
        indexDao.updateArt(req,res,function(result){
            if(result){
                returnJson.msg = 'success';
                returnJson.data = '修改成功'
            }else{
                returnJson.msg = 'error';
                returnJson.data = '修改失败'
            }
            res.send(returnJson);
        },next)
    },
    recoCan:function(req,res,next){
        var returnJson = {};
        indexDao.updateCanReco(req,res,function(result){
            if(result){
                returnJson.msg = 'success';
                returnJson.data = '取消推荐成功'
            }else{
                returnJson.msg = 'error';
                returnJson.data = '取消推荐失败'
            }
            res.send(returnJson);
        },next)
    },
    artAdd:function(req,res,next){
        var returnJson = {};
        indexDao.addArt(req,res,function(result){
            if(result){
                returnJson.msg = 'success';
                returnJson.data = '发布成功'
            }else{
                returnJson.msg = 'error';
                returnJson.data = '发布失败'
            }
            res.send(returnJson);
        },next)
    },
    userInfoUpdate:function(req,res,next){
        var returnJson = {};
        indexDao.updateUserInfo(req,res,function(result){
            if(result){
                returnJson.msg = 'success';
                returnJson.data = '提交成功'
            }else{
                returnJson.msg = 'error';
                returnJson.data = '提交失败'
            }
            res.send(returnJson);
        },next)
    },
    getuserInfo:function(req,res,next){
        var returnJson = {};
        indexDao.getUserInfo(req,res,function(result){
            if(result){
                returnJson.msg = 'success';
                returnJson.data = result
            }else{
                returnJson.msg = 'error';
                returnJson.data = '获取个人信息失败'
            }
            res.send(returnJson);
        },next)
    },
    indexNav:function(req,res,next){
        var returnJson = {};
        indexDao.getNav(req,res,function(result){
            if(result){
                returnJson.msg = 'success';
                returnJson.data = result
            }else{
                returnJson.msg = 'error';
                returnJson.data = '操作失败'
            }
            return res.send(returnJson);
        },next)
    },
    submitNav:function(req,res,next){
        req.flag = 2;
        uploadCtrl.upload(req,res,function(url,data){
            req.dataurl = url;
            req.dec = data.dec;
            console.log(url);
            console.log(data);
            var returnJson = {};
            indexDao.upNav(req,res,function(result){
                if(result){
                    returnJson.msg = 'success';
                    returnJson.data = '操作成功'
                }else{
                    returnJson.msg = 'error';
                    returnJson.data = '操作失败'
                }
                return res.send(returnJson);
            },next)
        })
    },
    headUpdate:function(req,res,next){
        req.flag = 1;
        uploadCtrl.upload(req,res,function(result){
            req.dataurl = result;
            var returnJson = {};
            indexDao.uploadImg(req,res,function(result){
                if(result){
                    returnJson.msg = 'success';
                    returnJson.data = '头像上传成功'
                }else{
                    returnJson.msg = 'error';
                    returnJson.data = '头像上传失败'
                }
                return res.send(returnJson);
            },next)
        })
    },
    scrolldel:function(req,res,next){
        var returnJson = {};
        delCtrl.del(req,res,function(result){
            if(result === 'success'){
                indexDao.scrollDel(req,res,function(result){
                    if(result){
                        returnJson.msg = 'success';
                        returnJson.data = '删除成功'
                    }else{
                        returnJson.msg = 'error';
                        returnJson.data = '删除失败'
                    }
                    return res.send(returnJson);
                },next)
            }else{
                returnJson.msg = 'error';
                returnJson.data = '未知错误'
            }
        })
    },
    changePass:function(req,res,next) {
        var returnJson = {};
        indexDao.resetPass(req, res, function (result) {
            if (result) {
                returnJson.msg = 'success';
                returnJson.data = '重置成功'
            } else {
                returnJson.msg = 'error';
                returnJson.data = '重置失败'
            }
            return res.send(returnJson);
        }, next)
    }
};
module.exports = indexCtrl;
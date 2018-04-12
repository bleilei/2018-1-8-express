var express = require('express');
var router = express.Router();
var indexCtrl = require('../controllers/indexCtrl');
// var uploadCtrl = require('../controllers/uploadCtrl');
//
// var indexDao = require("../dao/indexDao");


//多图上传
// var multer = require('multer');
/* GET home page. */
router.get('/home', function(req, res, next) {
    var user = req.session.user;
    res.render('home', { title: 'Home' ,user:user,index:1});
});
router.get('/',function(req,res,next){
    //根据session跳转页面
    var user = req.session.user;
    if(user){
        res.redirect('/home');
    }else{
        res.render('index', {title:'登陆'})
    }
});
router.get('/regist',function(req,res,next){
    res.render('regist', { title: 'regist' })
});
router.get('/user',function(req,res,next){
    var user = req.session.user;
    res.render('user', { title: '用户列表' ,user:user ,index:2});
});
router.get('/article',function(req,res,next){
    var user = req.session.user;
    res.render('article', { title: '文章列表' ,user:user ,index:3});
});
router.get('/reco',function(req,res,next){
    var user = req.session.user;
    res.render('reco', { title: '推荐列表' ,user:user,index:4 });
});
router.get('/scrollPage',function(req,res,next){
    var user = req.session.user;
    res.render('scrollPage', { title: '轮播图管理' ,user:user ,index:5});
});
router.get('/resetMan',function(req,res,next){
    var user = req.session.user;
    res.render('resetMan', { title: '重置管理' ,user:user ,index:6});
});
router.get('/editUserInfo',function(req,res,next){
    var user = req.session.user;
    res.render('editUserInfo', { title: '我的资料' ,user:user,index:1});
});
router.get('/artAdd',function(req,res,next){
    var user = req.session.user;
    res.render('articleAdd', { title: '添加文章' ,user:user,index:3});
});
router.get('/uploadNav',function(req,res,next){
    var user = req.session.user;
    res.render('uploadNav', { title: '添加nav' ,user:user,index:5});
});




//测试
router.get('/more',function(req,res,next){
    res.render('more', { title: '多图上传' ,index:1});
});




//退出
router.get('/layout',function(req,res,next){
    delete req.session.user;
    res.redirect('/');
});
//图片上传
router.post('/imgUpdate',indexCtrl.headUpdate);

//其他接口调用
//登陆
router.get('/getDataLogin',indexCtrl.loginAction);
//注册
router.post('/getDataRegist',indexCtrl.regist);
//获取文章列表
router.get('/getArticle',indexCtrl.artList);
//添加文章
router.post('/add',indexCtrl.artAdd);
//获取注册用户
router.get('/getUseRegist',indexCtrl.getData);
//删除文章
router.post('/delArticle',indexCtrl.artDel);
//推荐
router.post('/inReco',indexCtrl.recoIn);
router.post('/rreco',indexCtrl.recoup);
//编辑文章
router.post('/edit',indexCtrl.artEdit);
//取消推荐
router.get('/canReco',indexCtrl.recoCan);
//获取邮箱验证码
router.get('/code',indexCtrl.sendVercode);
//忘记密码
router.post('/forgetPassword',indexCtrl.forget);
//更新用户信息
router.post('/userInfo',indexCtrl.userInfoUpdate);
//获取用户信息
router.get('/getInfo',indexCtrl.getuserInfo);
//获取首页轮播图
router.get('/getindexNav',indexCtrl.indexNav);
//删除轮播图
router.get('/delScroll',indexCtrl.scrolldel);
//重置密码
router.get('/changePassword',indexCtrl.changePass);
//nav上传（文字+图片）
router.post('/submitIndexNav',indexCtrl.submitNav);



//多图上传
// var storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, './publics/upload')
//     },
//     filename: function (req, file, cb) {
//         var str = file.originalname.split('.');
//         cb(null, Date.now()+'.'+str[1]);
//     }
// });
// var upload = multer({ storage: storage });
// router.post("/uploadImgs",upload.array("file",20),function(req,res,next){
//     var imgArr = [];
//     for(var i in req.files){
//         imgArr.push(req.files[i].path);
//     }
//     // res.json({
//     //     code:200,
//     //     data:arr
//     // })
//
//     indexCtrl.submitNav(imgArr,res,next)
// });





module.exports = router;

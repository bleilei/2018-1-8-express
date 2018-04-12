//当成公共上传图片方法
var cacheFolder = 'publics/upload';
var formidable = require('formidable');
var fs = require('fs');
var delCtrl = require('./delCtrl');
var uploadCtrl = {
    upload:function(req, res,callback, next) {
        var currentUser = req.session.user;
        var userDirPath;
        if(req.flag === 1){
            userDirPath = cacheFolder + currentUser.id;
            delCtrl.del(req,res,function(result){
                if(result === 'success'){
                    console.log('删除成功')
                }
            },next)
        }else{
            userDirPath = cacheFolder;
        }
        if (!fs.existsSync(userDirPath)) {
            fs.mkdirSync(userDirPath);
        }
        var form = new formidable.IncomingForm(); //创建上传表单
        form.encoding = 'utf-8'; //设置编辑
        form.uploadDir = userDirPath; //设置上传目录
        form.keepExtensions = true; //保留后缀
        form.maxFieldsSize = 2 * 1024 * 1024; //文件大小
        form.type = true;
        var displayUrl,data;
        form.parse(req, function(err, fields, files) {
            console.log(files.upload.type);
            if (err) {
                res.send(err);
                return;
            }
            var extName = ''; //后缀名
            switch (files.upload.type) {
                case 'image/pjpeg':
                    extName = 'jpg';
                    break;
                case 'image/jpeg':
                    extName = 'jpg';
                    break;
                case 'image/png':
                    extName = 'png';
                    break;
                case 'image/x-png':
                    extName = 'png';
                    break;
            }
            if (extName.length === 0) {
                // res.render = {
                //     code: 202,
                //     msg: '只支持png和jpg格式图片'
                // };
                // return;
            } else {
                var avatarName = '/' + Date.now() + '.' + extName;
                var newPath = form.uploadDir + avatarName;
                data = fields;
                if(req.flag === 1){
                    displayUrl = 'upload' + currentUser.id + avatarName;
                }else{
                    displayUrl = 'upload' + avatarName;
                }
                fs.renameSync(files.upload.path, newPath); //重命名
                if(data){
                    callback(displayUrl,data);
                }else{
                    req.user.head = displayUrl;
                    callback(displayUrl);
                }

            }
        });
    }
};
module.exports = uploadCtrl;


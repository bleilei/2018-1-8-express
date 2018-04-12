//当成公共删除图片方法
//要删除的文件夹 url
var rootFile;
var fs = require('fs');
var delCtrl = {
    del: function (req, res,callback, next) {
        var flag = req.query.delFlag || req.flag;
        if (flag === 1) {
            var currentUser = req.session.user;
            rootFile = 'publics/upload' + currentUser.id;
        } else {
            var delUrl = req.query.url;
            var delurl = delUrl.substring(7, delUrl.length);
            var delUrlsub = delUrl.substring(delUrl.indexOf('/') + 1, delUrl.indexOf('.'));
            rootFile = 'publics/upload';
        }
        var files = fs.readdirSync(rootFile);
        files.forEach(function (file) {
            if(flag === 1){
                fs.unlink(rootFile + '/' + file, function (err) {
                    if (err) return console.log(err);
                    callback('success')
                });
            }else{
                var newfile = file.substring(0, file.indexOf('.'));
                if (newfile === delUrlsub) {
                    fs.unlink(rootFile + '/' + delurl, function (err) {
                        if (err) return console.log(err);
                        callback('success')
                    });
                }
            }
        });
    }
};
module.exports = delCtrl;


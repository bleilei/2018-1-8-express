var nodemailer = require('nodemailer');
var mailer = {};
mailer.send = function (req,callback){
    var code = '';
    function getRandom(){
        return Math.floor(Math.random()*10);
    }
    for(var i = 0;i <= 5 ; i++){
        if(getRandom() === 0){
            code += getRandom()
        }else{
            code += getRandom().toString();
        }
    }
    req.session.vercode = code;
    var transporter = nodemailer.createTransport({
        service: 'qq',
        auth: {
            user: '379837340@qq.com',
            pass: 'fmngfgczcdcibgfh'
        }
    });
    var mailOptions = {
        from: '379837340@qq.com', // 发送者
        to: req.query.to, // 接受者,可以同时发送多个,以逗号隔开
        subject: '优优验证码', // 标题
        text: '【哈哈】欢迎使用邮件改密码服务，验证码'+code+'。此消息官方发送，请放心填写，为了安全，请勿告知他人。' // 文本
    };
    transporter.sendMail(mailOptions, function (err, info) {
        if (err) {
            callback(err,null);
            return;
        }
        callback(null,info);
    });
};
module.exports = mailer;
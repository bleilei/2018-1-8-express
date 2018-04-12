var crypto = require('crypto');
var util = {
    /**
     * 向客户端返回json数据
     * @param response
     * @param result
     */
    responseJONS : function (response,result) {
        if(typeof result === 'undefined'){
            response.json({
                code : '-200',
                msg : '操作失败！'
            })
        }else{
            response.json(result);
        } 
    },
    //加密
    encrypt:function(str, secret){
        var cipher = crypto.createCipher('aes192', secret);
        var enc = cipher.update(str, 'utf8', 'hex');
        enc += cipher.final('hex');
        return enc;
    },
    //解密
    decrypt:function(str, secret) {
        var decipher = crypto.createDecipher('aes192', secret);
        var dec = decipher.update(str, 'hex', 'utf8');
        dec += decipher.final('utf8');
        return dec;
    },
    //格式化时间
    formatDate : function () {
        var date = new Date();
        var year = date.getFullYear();
        var month = (date.getMonth() + 1) > 9 ? (date.getMonth() + 1) :  ('0'+ (date.getMonth() + 1));
        var day = date.getDate() > 9 ? date.getDate() :  ('0'+ date.getDate());
        var hour = date.getHours() > 9 ? date.getHours() :  ('0'+ date.getHours());
        var minutes = date.getMinutes() > 9 ? date.getMinutes() :  ('0'+ date.getMinutes());
        var seconds = date.getSeconds() > 9 ? date.getSeconds() :  ('0'+ date.getSeconds());
        return year + "-" + month + "-" + day + " " + hour + ":" + minutes + ":" + seconds;
    },
    formatDateWith:function(dateObj){
        var date = new Date(dateObj);
        var d = date.toLocaleDateString();
        var t = date.toLocaleTimeString();
        return d + ' ' + t
    }

}
module.exports = util;
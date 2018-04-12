var index = {
    queryByUserName : 'select * from users where username = ?',
    insert:'insert into users(userName,password,mail,date) values(?,?,?,?)',
    getLists:'select * from news order by id desc',
    newsadd:'insert into news(title,content,author,time) values(?,?,?,?)',
    queryByMail:'select * from users where mail = ?',
    userQueryByMail:'update users set password = ?,changeDate = ? where mail = ?',
    recocan:'update news set changeTime = ?,reco = 0 where id = ?',
    articleUpdate:'update news set title = ?,content = ?,author = ?,changeTime = ?,reco = ? where id = ?',
    recoInsert:'insert into reco(title,content,author,time) values ? ',
    reco:'update news set changeTime = ?,reco = 1 where id in (?) ',
    adel:'delete from news where id in (?)',
    queryAllusers:'select * from users',
    queryByUserid:'update users set nickname = ?,tel = ?,mail = ?,changeDate = ? where id = ?',
    queryUserinfoById:'select * from users where id = ?',
    updateById:'update users set head = ? where id = ?',
    insertArt:'insert into news(title,author,content,reco,time) values (?,?,?,?,?)',
    nav:'select * from nav order by id desc',
    insertNav:'insert into nav(description,src,upTime) values(?,?,?)',
    delNav:'delete from nav where id = ?',
    resetPassword:'update users set password = ?  where id = ?'
};
module.exports = index;
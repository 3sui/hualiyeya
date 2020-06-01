/*
 * @Author: your name
 * @Date: 2020-05-08 09:46:57
 * @LastEditTime: 2020-05-11 15:49:34
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \server\mysql\mysql.js
 */
module.exports = app => {
    const mysql = require('mysql')

    let options = {
        host: '58.216.47.104',
        port: '3309',
        user: 'root',
        password: 'htyw2019',
        database: 'drms'
    }
    let connection = mysql.createConnection(options)

    var cnt = 0;
    var conn = function () {
        connection.query('SELECT * FROM Device'); //查询MySQL中数据库
        cnt++;
        console.log("Mysql重连接成功! 次数:" + cnt);
    }

    setInterval(conn, 100 * 10000); //循环执行

    return connection
}
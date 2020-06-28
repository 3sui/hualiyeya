/*
 * @Author: your name
 * @Date: 2020-05-08 09:46:57
 * @LastEditTime: 2020-06-27 17:46:56
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
        password: 'fL2!76KuRr4$md#87zf2hkWnPrDD359p',
        database: 'hlyy',
        dateStrings: true
    }
    let connection = mysql.createPool(options)

    let query = function (sql, values) {
        // 返回一个 Promise
        return new Promise((resolve, reject) => {
            connection.getConnection(function (err, connection) {
                if (err) {
                    reject(err)
                } else {
                    connection.query(sql, values, (err, rows) => {
                        if (err) {
                            reject(err)
                        } else {
                            resolve(rows)
                        }
                        // 结束会话
                        // connection.release()
                        connection.destroy()
                    })
                }
            })
        })
    }


    var cnt = 0;
    var conn = function () {
        query('SELECT * FROM device'); //查询MySQL中数据库
        cnt++;
        console.log("Mysql重连接成功! 次数:" + cnt);
    }

    setInterval(conn, 50 * 10000); //循环执行

    return query
}
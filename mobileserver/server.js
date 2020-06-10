/*
 * @Author: your name
 * @Date: 2020-05-08 09:03:27
 * @LastEditTime: 2020-05-09 10:27:51
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \server\server.js
 */
const express = require('express')
const app = express()
const cors = require('cors')
app.use(express.json())
app.use(cors())

//连接服务器
require('./mysql/mysql.js')(app)

require('./route/login/index')(app)
app.get('/abc', (res, req) => {
    console.log(123);

    req.send('123')
})


app.listen(8085, (err) => {
    if (err) {
        console.log(err);

    } else {
        console.log('服务器已连接,端口号8085');

    }
})
/*
 * @Author: your name
 * @Date: 2020-05-08 09:03:27
 * @LastEditTime: 2020-07-02 15:01:11
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \server\server.js
 */
const express = require('express')
const app = express()
const cors = require('cors')
app.use(express.json())
app.use(cors())


//开放uploads文件夹
app.use('/uploads', express.static(__dirname + '/uploads'))
//开放nodeserver文件夹
app.use('/nodeserver', express.static(__dirname + '/nodeserver'))
app.use('/nodeServer', express.static(__dirname + '/nodeServer/uploads'))

//连接服务器
require('./mysql/mysql.js')(app)
// require('./route/admin/productProfile/index')(app)
require('./route/map/index.js')(app)
require('./route/deviceRecord/index.js')(app)
require('./route/login/index.js')(app)
require('./route/admin/productProfile/index')(app)
require('./route/dataSettings/index')(app)
require('./route/analysis/index')(app)
require('./route/product/repair')(app)
require('./route/maintain/index')(app)
// require('./route/monitor/index')(app)
require('./route/home/index')(app)

require('./route/upload/index')(app)


require('./route/mobile/index')(app)

app.set('secret', 'password')


app.get('/abc', (res, req) => {
    console.log(123);

    req.send('123')
})
app.use((err, req, res, next) => {
    // console.log(123)
    res.status(err.statusCode || 500).send({
        message: err.message
    })
})

// app.listen(8085, (err) => {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log('服务器已连接,端口号8085');
//     }
// })

app.listen(8890, (err) => {
    if (err) {
        console.log(err);

    } else {
        console.log('服务器已连接,端口号8890');
    }
})
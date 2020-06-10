/*
 * @Author: your name
 * @Date: 2020-05-08 14:36:20
 * @LastEditTime: 2020-05-12 15:13:59
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \server\route\admin\productProfile\index.js
 */
module.exports = app => {
    const axios = require('../../plugins/axios')()
    const connection = require('../../mysql/mysql')()
    const express = require('express')
    const router = express.Router()

    router.post('/mobilelogin', async (req, res) => {
        let username = req.body.username;
        let password=req.body.password;
        let sql = `select * from user_info where username='${username}' and password='${password}'`
        let results = await connection(sql)
        console.log(results);      
        res.send(results)
    })

    //获取企业表信息
    // router.get('/Enterprise', authMiddle, async (req, res) => {
    //     // assert(req.user.role === 1, 403, '您无权访问')

    //     let sql = `select enterprise.*,industry.industry_name from enterprise,industry where (enterprise.is_deleted = 0)and (enterprise.industry_id=industry.id) order by enterprise.created_time Desc`
    //     let results = await connection(sql)
    //     res.send(results)
    // })



    app.use('/', router)
}
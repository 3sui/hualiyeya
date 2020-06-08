/*
 * @Author: your name
 * @Date: 2020-06-02 14:22:53
 * @LastEditTime: 2020-06-04 16:03:32
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \server\route\login\index.js
 */
module.exports = app => {
    const connection = require('../../mysql/mysql')()
    const express = require('express')
    const router = express.Router()
    const jwt = require('jsonwebtoken')
    const assert = require('http-assert')

    router.post('/', async (req, res) => {
        const {
            password,
            username
        } = req.body
        let sql = "select password,id,nickname from user_info where username = ?"
        let row = await connection(sql, username)
        assert(row.length, 422, '用户不存在')
        assert(row[0].password === password, 422, '密码不正确')
        let result = {}
        result.token = jwt.sign({
            id: row[0].id
        }, app.get('secret'))
        result.ms_username = row[0].nickname
        result.success = true
        let result2 = await connection(`select * from user_role where user_id = ${row[0].id}`)
        result.role = result2[0].role_id
        res.send(result)
    })



    app.use('/api/login', router)

}
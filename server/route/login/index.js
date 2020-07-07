/*
 * @Author: your name
 * @Date: 2020-06-02 14:22:53
 * @LastEditTime: 2020-07-03 15:36:18
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
    const authMiddle = require('../../middleware/auth')()

    router.post('/', async (req, res) => {
        const {
            password,
            username
        } = req.body
        console.log(password)
        let sql = "select password,id,nickname,avatar,phone,username from user_info where username = ? and is_deleted = 0"
        let row = await connection(sql, username)
        assert(row.length, 422, '用户不存在')
        assert(row[0].password === password, 422, '密码不正确')
        let result = {}
        result.token = jwt.sign({
            id: row[0].id
        }, app.get('secret'))
        result.ms_username = row[0].nickname
        result.username = row[0].username
        result.success = true
        result.avatar = row[0].avatar
        result.phone = row[0].phone
        let result2 = await connection(`select * from user_role where user_id = ${row[0].id}`)
        result.role = result2[0].role_id
        res.send(result)
    })

    router.post('/changePass', authMiddle, async (req, res) => {
        console.log(req.body)
        console.log(req.user);

        let {
            oldPass,
            newPass,
            checkPass
        } = req.body
        let sql

        let results = {}
        if (oldPass == req.user.password) {
            if (newPass == req.user.password) {
                results.success = false
                results.message = '没有更新密码'
            } else {
                results.success = true
                sql = `update user_info set password = '${newPass}' where id = ${req.user.id}`
                await connection(sql)
                results.message = '密码修改成功'
            }

        } else {
            results.success = false
            results.message = '原始密码输入错误,请重试'
        }
        res.send(results)
    })



    app.use('/api/login', router)

}
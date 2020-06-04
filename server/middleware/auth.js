/*
 * @Author: your name
 * @Date: 2020-06-03 10:44:43
 * @LastEditTime: 2020-06-03 16:29:02
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \server\middleware\auth.js
 */
module.exports = option => {
    const connection = require('../mysql/mysql')()
    const jwt = require('jsonwebtoken')
    const assert = require('http-assert')

    return async (req, res, next) => {
        let token = req.headers.authorization.split(' ').pop()
        assert(token, 401, '请登录')
        const {
            id
        } = jwt.verify(token, req.app.get('secret'))
        assert(id, 401, '请登录')
        let sql = "select * from user_info where id = ?"
        req.user = await connection(sql, id)
        assert(req.user.length, 401, '请登录')
        next()
    }
}
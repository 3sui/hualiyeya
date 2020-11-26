/*
 * @Author: your name
 * @Date: 2020-06-03 10:44:43
 * @LastEditTime: 2020-06-14 17:59:39
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \server\middleware\auth.js
 */
module.exports = option => {
    const connection = require('../mysql/mysql')()
    const jwt = require('jsonwebtoken')
    const assert = require('http-assert')
    const interface = require('./interface')
        // import interface from "./interface"

    return async(req, res, next) => {


        assert(req.headers.authorization, 401, '请登录')

        let token = req.headers.authorization.split(' ').pop()
            //token不存在
        assert(token, 401, '请登录')
        const {
            id
        } = jwt.verify(token, req.app.get('secret'))
            //id不存在
        assert(id, 401, '请登录')
        let sql = "select * from user_info where id = ?"
        let result = await connection(sql, id)
        req.user = result[0]
            // req.user.abc = 123
            // console.log(req.user);

        //用户不存在
        assert(req.user, 401, '请登录')
        let result2 = await connection(`select user_role.*,role.rights,role.read,role.operation from user_role,role where user_id = ${req.user.id} and user_role.role_id=role.id`)
            // let result2 = await connection(`select * from user_role where user_id = ${req.user.id} `)
        req.user.role = result2[0].role_id
        req.user.read = result2[0].read
        req.user.operation = result2[0].operation
        let rights = result2[0].rights.split(',') || []
        let reqpath = req.route.path
        console.log(reqpath);
        // console.log(interface);
        let interfacenow = interface.filter(item => {

                if (item.interfacepath.indexOf(reqpath) > -1) {
                    return item
                }
            })
            // let interfacenow = interface.filter(item => {
            //     item.interfacepath.indexOf(reqpath) > -1
            // })


        console.log(interfacenow);
        assert(interfacenow[0].public || rights.includes(interfacenow[0].path), 403, '无访问权限')
            // console.log(result2);

        console.log(req);

        next()
    }
}
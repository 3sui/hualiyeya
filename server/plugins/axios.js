/*
 * @Author: your name
 * @Date: 2020-05-08 09:57:42
 * @LastEditTime: 2020-05-08 16:40:46
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \server\plugins\axios.js
 */
module.exports = app => {
    const axios = require('axios')
    const instance = axios.create({
        baseURL: 'http://ds.casicloud.com/api/',
        timeout: 1000,
        headers: {
            contentType: "application/json"
        }
    });
    return instance
}
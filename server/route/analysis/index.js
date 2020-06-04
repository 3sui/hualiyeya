module.exports = app => {
    const axios = require('../../plugins/axios')()
    const connection = require('../../mysql/mysql')()
    const express = require('express')
    const TimeFomart = require('../../time/time')
    const router = express.Router()
    const fs = require("fs"); // 读写文件的模块
    const path = require("path") // 处理路径的模块

    // 超级管理员权限
    //按照行业获取企业数、设备数
    router.get('/EnterprisesByIndustry', async (req, res) => {
        let sql = `select device.eq,enterprise.enterprise_name,industry.industry_name from device,enterprise,industry where (device.is_deleted = 0 or device.is_deleted is NULL)and (device.enterprise_id=enterprise.id) and (enterprise.industry_id=industry.id)`
        connection.query(sql, (err, results) => {
            if (err) throw err

            var resultlist = results
            // console.log(resultlist)
            var industryTotal = [];  // 存最终数据结果

            // 数据按照行业名称进行归类
            var industryContainer = {}; // 针对键行业归类的容器

            resultlist.forEach(item => {
                industryContainer[item.industry_name] = industryContainer[item.industry_name] || [];
                //当逻辑或||时，找到为true的分项就停止处理，并返回该分项的值，否则执行完，并返回最后分项的值。     
                industryContainer[item.industry_name].push(item);
            });
            //获得industryContainer对象


            //统计不同行业的企业数量
            var industryName = Object.keys(industryContainer);
            // 获取行业种类：['液压','干燥','纺织',...]

            industryName.forEach(nameItem => {

                let deviceNum = 0
                let enterpriseNum = 0

                //获得设备数
                industryContainer[nameItem].forEach(item => {
                    //设备数累加
                    deviceNum++
                })

                //获得企业数
                var enterpriseContainer = {};

                industryContainer[nameItem].forEach(item => {

                    enterpriseContainer[item.enterprise_name] = enterpriseContainer[item.enterprise_name] || [];
                    // console.log(enterpriseContainer)
                    //当逻辑或||时，找到为true的分项就停止处理，并返回该分项的值，否则执行完，并返回最后分项的值。
                    enterpriseContainer[item.enterprise_name].push(item);
                })
                // console.log(enterpriseContainer)
                var enterprise_id = Object.keys(enterpriseContainer);
                enterpriseNum = enterprise_id.length
                industryTotal.push({ 'industryname': nameItem, 'deviceNum': deviceNum, 'enterpriseNum': enterpriseNum });
            })
            //对json进行降序排序函数
            var colId = "deviceNum"
            var desc = function (x, y) {
                return (x[colId] < y[colId]) ? 1 : -1
            }
            //降序排序
            industryTotal.sort(desc);

            industryTotal.forEach((item, index) => {
                item['sort'] = index + 1
            })
            // console.log(industryTotal);
            res.send(industryTotal)
        })
    })



    //超级管理员权限
    //获取设备信息
    router.get('/DeviceByType', async (req, res) => {
        let sql = `select device.eq,device_type.typename from device,device_type where (device.is_deleted = 0 or device.is_deleted is NULL)and (device.device_type=device_type.id)  `
        connection.query(sql, (err, results) => {
            if (err) throw err
            if (results) {

                var deviceTypeTotal = [];  // 存最终数据结果
                // 数据按照设备种类进行归类
                var nameContainer = {}; // 针对键name进行归类的容器
                results.forEach(item => {
                    nameContainer[item.typename] = nameContainer[item.typename] || [];

                    //当逻辑或||时，找到为true的分项就停止处理，并返回该分项的值，否则执行完，并返回最后分项的值。

                    nameContainer[item.typename].push(item);
                });

                console.log(nameContainer);

                // 统计不同种类设备的数量
                var TypeName = Object.keys(nameContainer);
                // console.log(TypeName)
                TypeName.forEach(nameItem => {
                    let count = 0;
                    nameContainer[nameItem].forEach(item => {
                        count++
                    });
                    deviceTypeTotal.push({ 'device_type': nameItem, 'count': count });
                })


                //对json进行降序排序函数
                var colId = "count"
                var desc = function (x, y) {
                    return (x[colId] < y[colId]) ? 1 : -1
                }
                //降序排序
                deviceTypeTotal.sort(desc);

                deviceTypeTotal.forEach((item, index) => {
                    item['sort'] = index + 1
                })
                // console.log(deviceTypeTotal) 
                res.send(deviceTypeTotal)
            }else{
                console.log("数据查询为空")
            }
        })
    })





    app.use('/api', router)
}
/*
 * @Author: your name
 * @Date: 2020-05-08 14:36:20
 * @LastEditTime: 2020-06-01 11:26:07
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \server\route\admin\productProfile\index.js
 */
module.exports = app => {
    const axios = require('../../../plugins/axios')()
    const connection = require('../../../mysql/mysql')()
    const express = require('express')
    const router = express.Router()
    const fs = require("fs"); // 读写文件的模块
    const path = require("path") // 处理路径的模块

    //根据企业id已经上传数据的设备数量
    router.get('/fetchDeviceNum', async (res, req) => {
        axios({
                method: 'post',
                url: '/v1/getOrgHasDatasDevsCount.ht',
                data: {
                    orgId: '10798565'
                }
            })
            .then(res => {
                // console.log(res.data)
                let data = res.data
                req.status(200).send(data)
            })
            .catch()
    })

    //根据企业id,key获得运行数or故障数or待机数
    router.get('/fetchDeviceStatus', async (res, req) => {
        let status = ['yxs', 'gzs', 'djs']
        let results = {}
        for (let i in status) {
            console.log(i);

            await axios({
                    method: 'post',
                    url: '/getEnterpriseRealTimeDataByOrgIdAndKey.ht',
                    data: {
                        orgId: '10798565',
                        key: status[i],
                        pageSize: 1,
                        sort: -1
                    }
                })
                .then(res => {
                    console.log(res.data);

                    results[status[i]] = res.data.data[0].v
                    // console.log(results)

                })
                .catch()
        }

        await req.status(200).send(results)

    })


    //获取产品列表界面的数据
    router.get('/getProductList', async (req, res) => {
        let arr = []
        let sql = 'select * from Device'
        await connection.query(sql, async function (error, results, fields) {
            if (error) throw error;
            if (!results) {
                return
            }
            arr = results
            // res.send(arr)

            //根据企业id获取到企业的所有设备id(前三)
            let a = [] //获取到的所有设备id的数组

            await axios({
                    method: 'post',
                    url: '/getDevicesPageByOrgId.ht',
                    data: {
                        orgId: '10798565',
                        offset: '0',
                        maxrows: '3'
                    }
                })
                .then(res => {
                    console.log(res);

                    res.data.data.forEach(item => {
                        a.push(item.id)

                    })

                })
                .catch(err => {
                    console.log(err);

                })
            let end = []
            for (let i = 0; i < a.length; i++) {

                //根据设备id获取到设备实时数据
                await axios({
                        method: 'post',
                        url: '/getDevDatasByDevIdPage.ht',
                        data: {
                            devId: a[i],
                            currentPage: '1',
                            pagesize: '24'
                        }
                    })
                    .then(res => {
                        console.log(arr);

                        q = arr.find(item => {

                            return item.DeviceID == a[i]
                        })
                        // q = JSON.stringify(q)
                        q['switch'] = res.data.data.find(item => {
                            return item.k == 'A22'
                        }).v
                        q['status'] = res.data.data.find(item => {
                            return item.k == 'A21'
                        }).v
                        q['Duration'] = res.data.data.find(item => {
                            return item.k == 'A20'
                        }).v
                        // console.log(q);
                        end.push(q)
                    })
                    .catch(err => {
                        console.log(err);
                    })
            }
            res.send(end)
        });
    })

    //产品列表点击删除
    router.get('/deleteProducts', async (res, req) => {
        let body = res.query
        let a = ''
        for (let i in body.id) {
            a += '?,'
        }
        console.log(a);
        let sql = 'DELETE FROM Device WHERE DeviceID in (' + a.slice(0, -1) + ')'
        console.log(sql);
        console.log(body.id);

        await connection.query(sql, body.id, async (err, res) => {
            if (err) throw err
            console.log(res);

            req.send('数据删除成功')

        })

    })


    //产品列表点击详情显示的内容
    router.get('/getDeviceInfo', async (res, req) => {
        let id = res.query.id
        console.log(id);
        let sql = "select * from Device where DeviceID=" + id
        console.log(sql);
        await connection.query(sql, async (err, res) => {
            if (err) throw err
            if (!res) {
                return
            }
            console.log(res);
            let arr = res

            await axios({
                    method: 'post',
                    url: '/getDevDatasByDevIdPage.ht',
                    data: {
                        devId: id,
                        currentPage: '1',
                        pagesize: '24'
                    }
                })
                .then(res => {

                    let q = arr.find(item => {

                        return item.DeviceID == id
                    })
                    console.log(q);
                    q['switch'] = res.data.data.find(item => {
                        return item.k == 'A22'
                    }).v
                    q['status'] = res.data.data.find(item => {
                        return item.k == 'A21'
                    }).v
                    q['Duration'] = res.data.data.find(item => {
                        return item.k == 'A20'
                    }).v
                    req.send(q)

                })
                .catch(err => {
                    console.log(err);
                })
        })
    })


    //产品列表新增
    router.post('/addNewProduct', (res, req) => {
        let body = res.body
        let sql = "insert into Device set ?"
        connection.query(sql, body, (err, res) => {
            if (err) throw err
            console.log(113)
            req.send('数据保存成功')
        })
        console.log(body)
    })

    //获取维修记录表格的数据
    router.get('/getMaintenanceRecords', async (res, req) => {
        let sql1 = 'SELECT * from Device INNER JOIN Malfunction on Device.DeviceID = Malfunction.DeviceID'
        let arr1 = []

        await connection.query(sql1, async (error, results, fields) => {
            if (error) throw error;
            if (!results) {
                return
            }
            req.send(results)

        });
    })

    //获取维修记录表格的数据
    router.get('/getMaintenanceRecord', async (res, req) => {
        console.log('-----------------');

        let id = res.query.id
        let sql1 = 'SELECT * from Device INNER JOIN Malfunction on Device.DeviceID = Malfunction.DeviceID and Malfunction.DeviceID = ' + id
        console.log(sql1);

        await connection.query(sql1, async (error, results, fields) => {
            if (error) throw error;
            if (!results) {
                return
            }
            req.send(results)
            console.log(results);

        });
    })


    //维修列表点击删除
    router.get('/deleteMaintenance', async (res, req) => {
        let body = res.query
        let a = ''
        for (let i in body.id) {
            a += '?,'
        }
        console.log(a);
        let sql = 'DELETE FROM Malfunction WHERE DeviceID in (' + a.slice(0, -1) + ')'
        console.log(sql);
        console.log(body.id);

        await connection.query(sql, body.id, async (err, res) => {
            if (err) throw err
            console.log(res);

            req.send('数据删除成功')

        })

    })


    //维修记录新增
    router.post('/addNewMaintenance', (res, req) => {
        let body = res.body
        let sql = "insert into Malfunction set ?"
        connection.query(sql, body, (err, res) => {
            if (err) throw err
            console.log(113)
            req.send('数据保存成功')
        })
        console.log(body)
    })


    //根据id获取维修记录表格的数据
    router.get('/getMaintenanceInfo', async (res, req) => {
        let id = res.query
        console.log(id);

        let sql1 = 'SELECT * from Device INNER JOIN Malfunction on Device.DeviceID = Malfunction.DeviceID'

        await connection.query(sql1, async (error, results, fields) => {
            if (error) throw error;
            if (!results) {
                return
            }
            req.send(results)

        });
    })

    //获取远程监控列表数据
    router.get('/fetchEquipment', async (res, req) => {
        let sql = "select * from Device"
        await connection.query(sql, async (err, results) => {
            if (err) throw err
            let arr = []
            let end = []
            for (let i in results) {
                arr.push(results[i].DeviceID)
            }
            console.log(arr)
            axios({
                    method: 'post',
                    url: '/v1/getLastDatasByDevId.ht',
                    data: {
                        devIds: arr
                    }
                })
                .then(res => {
                    for (let i in results) {
                        let id = results[i].DeviceID
                        // console.log(res.data[id]);
                        let body = res.data[id]

                        results[i]['Engin'] = (body.find(item => item.k == 'A0')).v
                        results[i]['WaterTank'] = (body.find(item => item.k == 'A1')).v
                        results[i]['Enter'] = (body.find(item => item.k == 'A2')).v
                        results[i]['Export'] = (body.find(item => item.k == 'A3')).v
                        results[i]['Pressure'] = (body.find(item => item.k == 'A4')).v
                        results[i]['DiffPressure'] = (body.find(item => item.k == 'A5')).v
                        results[i]['RotatingSpeed'] = (body.find(item => item.k == 'A6')).v
                        results[i]['Current'] = (body.find(item => item.k == 'A7')).v
                        results[i]['Level'] = (body.find(item => item.k == 'A8')).v
                        results[i]['Temperature'] = (body.find(item => item.k == 'A9')).v
                        results[i]['TemperatureFeedLine'] = (body.find(item => item.k == 'A10')).v
                        results[i]['EmergencyDiffPressure'] = (body.find(item => item.k == 'A11')).v
                        results[i]['BinocularsDiffPressure'] = (body.find(item => item.k == 'A13')).v
                        results[i]['FuelTankLevel'] = (body.find(item => item.k == 'A13')).v
                        results[i]['ControlOilPressure'] = (body.find(item => item.k == 'A14')).v
                        results[i]['LubricatingOilOutletPressure'] = (body.find(item => item.k == 'A15')).v
                        results[i]['MotorPumpShock'] = (body.find(item => item.k == 'A16')).v
                        results[i]['MotorCurrent'] = (body.find(item => item.k == 'A17')).v
                        results[i]['MainTankOilAnalysis'] = (body.find(item => item.k == 'A18')).v
                        results[i]['ErrorCode'] = (body.find(item => item.k == 'A19')).v
                        results[i]['Duration'] = (body.find(item => item.k == 'A20')).v
                        results[i]['status'] = (body.find(item => item.k == 'A21')).v
                        results[i]['switch'] = (body.find(item => item.k == 'A22')).v



                        console.log("----------------------------------------------------------------------");

                    }
                    // console.log(res.data);
                    console.log(results);
                    req.send(results)

                })
                .catch()
            // console.log(arr);

            //

        })
    })

    //获取测点详细数据
    router.get('/fetchMeasuringPoint', async (res, req) => {

        let id = res.query.id
        let type = res.query.type
        let key = ''
        console.log(id);
        switch (type) {
            case 'Engin':
                key = 'A0'
                break;
            case 'WaterTank':
                key = 'A1'
                break;
            case 'Enter':
                key = 'A2'
                break;
            case 'Export':
                key = 'A3'
                break;
            case 'Pressure':
                key = 'A4'
                break;
            case 'DiffPressure':
                key = 'A5'
                break;
            case 'RotatingSpeed':
                key = 'A6'
                break;
            case 'Current':
                key = 'A7'
                break;
            case 'Level':
                key = 'A8'
                break;
            case 'Temperature':
                key = 'A9'
                break;
            case 'TemperatureFeedLine':
                key = 'A10'
                break;
            case 'EmergencyDiffPressure':
                key = 'A11'
                break;
            case 'BinocularsDiffPressure':
                key = 'A12'
                break;
            case 'FuelTankLevel':
                key = 'A13'
                break;
            case 'ControlOilPressure':
                key = 'A14'
                break;
            case 'LubricatingOilOutletPressure':
                key = 'A15'
                break;
            case 'MotorPumpShock':
                key = 'A16'
                break;
            case 'MotorCurrent':
                key = 'A17'
                break;
            case 'MainTankOilAnalysis':
                key = 'A18'
                break;
            case 'ErrorCode':
                key = 'A19'
                break;
            case 'Duration':
                key = 'A20'
                break;
            case 'status':
                key = 'A21'
                break;
            case 'switch':
                key = 'A22'
                break;
            default:
                break;
        }
        axios({
                method: 'post',
                url: '/getDataByDevIdKeyAndTime.ht',
                data: {
                    devId: id,
                    key: key
                }
            })
            .then(res => {
                let arr = res.data.data
                arr.shift()
                console.log(arr);
                req.send(arr)
            })

    })

    //获取报警记录
    router.get('/fetchAlarmRecord', async (req, res) => {
        let sql = 'select * from alarm'
        connection.query(sql, (err, results) => {
            if (err) throw err
            res.send(results)
        })
    })


    //获取服务手册数据
    router.get('/fetchBooklet', async (req, res) => {
        let sql = "select * from booklet"
        connection.query(sql, (err, results) => {
            if (err) throw err
            console.log(results)
            res.send(results)
        })
    })

    //添加服务手册数据
    router.post('/addNewBooklet', (req, res) => {
        let body = req.body
        console.log(body);

        let sql = "insert into booklet set ?"
        connection.query(sql, body, (err, results) => {
            if (err) throw err
            res.send(results)
        })
    })

    //删除服务手册数据
    router.get('/deleteBooklet', (req, res) => {
        let id = req.query.id
        let sql = "delete from booklet where id=" + id
        console.log(sql);

        connection.query(sql, (err, results) => {
            if (err) throw err
            res.send('数据删除成功')
        })
    })

    //修改服务手册数据
    router.post('/changeBooklet', (req, res) => {
        let body = req.body.data
        let sql = "update booklet set function = ?, reason = ? where id=" + body.id
        console.log(sql);

        connection.query(sql, [body.function, body.reason], (err, results) => {
            if (err) throw err
            res.send('数据修改成功')
        })
    })


    const multer = require('multer')
    const upload = multer({
        dest: __dirname + '/../../../uploads'
    })
    app.post('/upload', upload.single('file'), async (req, res) => {
        const file = req.file
        res.send(file)
    })
    app.post('/remove', async (req, res) => {
        const filename = req.body.file.response.filename
        console.log(filename);
        fs.unlinkSync(__dirname + '/../../../uploads/' + filename);
        res.send('删除成功')
    })
    app.use('/', router)
}
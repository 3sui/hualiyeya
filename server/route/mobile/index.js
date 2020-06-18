module.exports = app => {
    const connection = require('../../mysql/mysql')()
    const express = require('express')
    const router = express.Router()
    const fs = require("fs"); // 读写文件的模块
    const path = require("path") // 处理路径的模块
    const authMiddle = require('../../middleware/auth')()

    const assert = require('http-assert')


    //获取维修表信息
    router.get('/Repair', authMiddle, async (req, res) => {

        let sql = '';
        if (req.user.role === 4) {
            sql = `select repair.*,device.eq,device.device_name from repair,device where repair.repair_person='${req.user.nickname}'and (repair.is_deleted = 0 or repair.is_deleted is NULL) and repair.device_id= device.id  order by repair.date Desc`
        } else if (req.user.role === 2) {
            sql = `select repair.*,device.eq,device.device_name from repair,device where device.enterprise_id= ${req.user.enterprise_id} and (repair.is_deleted = 0 or repair.is_deleted is NULL) and repair.device_id= device.id order by repair.date Desc`
        } else if (req.user.role === 3) {
            sql = `select repair.*,device.eq,device.device_name from repair,device,user_device where user_device.user_id= ${req.user.id}  and (repair.is_deleted = 0 or repair.is_deleted is NULL) and repair.device_id= device.id  and user_device.device_id=device.id order by repair.date Desc`
        } else (
            sql = `select repair.*,device.eq,device.device_name from repair,device where  (repair.is_deleted = 0 or repair.is_deleted is NULL) and repair.device_id= device.id  order by repair.date Desc`
        )
        console.log(sql);

        let results = await connection(sql)
        console.log(results)
        res.send(results)
    })

    //企业获取维修表信息
    // router.get('/Repair', authMiddle, async (req, res) => {
    //     let sql = `select enterprise.enterprise_name,repair.*,device.eq,device.device_name from repair,enterprise,device where (repair.is_deleted = 0 or repair.is_deleted is NULL) and repair.device_id= device.id and  device.enterprise_id= enterprise.id and enterprise.id=${id} order by repair.date Desc`
    //     let results = await connection(sql)
    //     // console.log(results)
    //     res.send(results)
    // })


    //获取维修设备详情
    router.get('/RepairInfo', authMiddle, async (req, res) => {

        let id = req.query.id
        let sql = `select enterprise.enterprise_name,repair.*,device.eq,device.device_name,device.enterprise_id from repair,enterprise,device where repair.id=${id} and repair.device_id= device.id and device.enterprise_id = enterprise.id`
        let results = await connection(sql)


        res.send(results)
    })
    //添加维修记录表信息
    router.post('/AddRepair', authMiddle, async (req, res) => {
        // assert(req.user.role == 1 || req.user.role == 4, 403, '您无权访问')
        let query = req.body;

        console.log(query)
        let sql = "insert into repair set ? "
        console.log(sql)
        let results = await connection(sql, query)

        res.send(results)
    })

    //修改维修表信息
    router.post('/UpdateRepair', authMiddle, async (req, res) => {
        // console.log(req.body);

        let id = req.body.id;
        let query = req.body;
        let sql = "update repair set ? where id=" + id
        let results = await connection(sql, query)
        // console.log(sql)
        // console.log(results)
        res.send(results)
    })


    //单个删除维修表信息
    // router.get('/DeleteRepair', async (req, res) => {
    //     let id = req.query.id;
    //     let sql = `update repair set is_deleted=1 where id in (${id}) `
    //     connection.query(sql, (err, results) => {
    //         if (err) throw err
    //         // console.log(results)
    //         res.send(results)
    //     })
    // })
    //查询维修表信息
    // router.post('/SearchRepair', async (req, res) => {
    //     let keyword = req.body.keyword;
    //     let sql = `select enterprise.enterprise_name,repair.*,device.eq,device.device_name,device_type.typename from repair,enterprise,device,device_type where (repair.is_deleted = 0 or repair.is_deleted is NULL) and repair.device_id= device.id and device.device_type=device_type.id  and device.enterprise_id= enterprise.id and (enterprise.enterprise_name like '%${keyword}%' or device.eq like '%${keyword}%' or device.device_name like '%${keyword}%' or repair.repair_person like '%${keyword}%')order by repair.created_time Desc`
    //     connection.query(sql, (err, results) => {
    //         if (err) throw err
    //         console.log(results)
    //         res.send(results)
    //     })
    // })


    //获得故障种类选择对象
    router.get('/FaultTypeChoose', authMiddle, async (req, res) => {
        let sql = "select fault_type,fault_phenomenon from fault_type where is_deleted = 0 or is_deleted is NULL"
        let results = await connection(sql)

        if (results) {
            let faultTypelist = [];
            let typeContainer = {};
            results.forEach(element => {

                typeContainer[element.fault_type] = typeContainer[element.fault_type] || [];
                typeContainer[element.fault_type].push(element)
            });
            // console.log(typeContainer);
            var TypeName = Object.keys(typeContainer);

            TypeName.forEach(element => {
                // console.log(element);                  
                let typeItem = {}
                typeItem['types'] = element
                let phenomenonlist = []
                typeContainer[element].forEach(item => {
                    phenomenonlist.push(item.fault_phenomenon)
                })
                typeItem['phenomenons'] = phenomenonlist

                faultTypelist.push(typeItem)
            });
            // console.log(faultTypelist);           
            res.send(faultTypelist)
        }

    })

    //根据用户获取企业id
    router.get('/enterpriseByid', authMiddle, async (req, res) => {
        assert(req.user.role === 1 || req.user.role === 4, 403, '您无权访问')
        let uaername = req.query.username;
        let sql = `select enterprise_id from user_info where username = '${uaername}' and is_deleted=0`
        let results = await connection(sql, query)
        // console.log(sql)
        // console.log(results)
        res.send(results)
    })

    //根据企业id获取设备
    router.post('/Devices', authMiddle, async (req, res) => {
        let id = req.body.enterprise_id

        let sql = `select id,eq as value from device where  enterprise_id=${id} and is_deleted = 0 or is_deleted is NULL `
        let results = await connection(sql)

        if (results) {

            res.send(results)
        }
    })

    //获取华立液压的维修工姓名
    router.get('/persons', authMiddle, async (req, res) => {
        let sql = `select nickname,phone from user_info where  enterprise_id=1 and is_deleted = 0 or is_deleted is NULL `
        let results = await connection(sql)

        if (results) {

            res.send(results)
        }
    })
    //获取维修状态
    router.get('/states', authMiddle, async (req, res) => {
        let sql = `select state from repair_state order by id`
        let results = await connection(sql)

        if (results) {

            res.send(results)
        }
    })

    //企业用户获取自己企业的设备记录
    router.get('/devicelist', authMiddle, async (req, res) => {
        let sql = '';
        if (req.user.role === 2) {
            sql = `select * from (select d.*,count(l.cp_id) count from device d left join  devicedata_limit l on  d.eq=l.eq where l.is_deleted=0 group by l.eq )  b left join file_store f on b.id=f.device_id  where  b.is_deleted=0  and f.type='img' and b.enterprise_id=${req.user.enterprise_id}`
        } else if (req.user.role === 3) {
            sql = `select * from (select b.*,f.file_path from (select d.*,count(l.cp_id) count from device d left join  devicedata_limit l on  d.eq=l.eq where l.is_deleted=0 group by l.eq )  b left join file_store f on b.id=f.device_id  where  b.is_deleted=0  and f.type='img' )t,user_device u where t.id=u.device_id and u.user_id=${req.user.id}`
        }
        let results = await connection(sql)
        if (results) {
            res.send(results)
        }
    })

    //获取设备详情页设备信息
    router.get('/devicedetail', authMiddle, async (req, res) => {
        let id = req.query.id;
        let sql = `select * from device d,file_store f,device_type t where d.id=${id} and d.device_type=t.id and d.id=f.device_id and f.type='img'`
        // console.log(sql);

        let results = await connection(sql)
        // console.log(results)
        if (results) {
            res.send(results)
        }
    })

    //获取测点信息
    router.post('/devicedetailpoint', authMiddle, async (req, res) => {
        let eq = req.body.eq;
        let sql = `select * from devicedata_limit dl  where dl.is_deleted = 0 and dl.eq = '${eq}' `
        // console.log(sql);
        let results = await connection(sql)
        // console.log(results)
        if (results) {
            res.send(results)
        }
    })
    //获取最近一次的实时测点数据
    router.post('/currentpoint', authMiddle, async (req, res) => {
        let eq = req.body.eq;
        let sql = `select * from devicedata dd  where dd.eq = '${eq}' order by dd.created_time desc limit 1`
        console.log(sql);
        let results = await connection(sql)
        console.log(results)
        if (results) {
            res.send(results)
        }
    })


    //获取企业报警信息
    router.get('/AlarmRecord', authMiddle, async (req, res) => {
        let enterprise_id = req.user.enterprise_id;
        console.log(enterprise_id);

        let sql = `select a.*,d.device_name from alarm a left join device d  on a.device_eq=d.eq  where  d.enterprise_id=${enterprise_id} order by a.created_time desc`
        console.log(sql);
        let results = await connection(sql)
        console.log(results)
        if (results) {
            res.send(results)
        }
    })


    //获取某个id的报警值
    router.post('/AlarmRecordDetail', authMiddle, async (req, res) => {
        let id = req.body.id
        let sql = `select a.*,d.device_name from alarm a left join device d  on a.device_eq=d.eq  where a.id=${id} `
        console.log(sql);
        let results = await connection(sql)
        console.log(results)
        if (results) {
            res.send(results)
        }
    })

    //修改某个id的报警状态
    router.post('/UpdateAlarmRecord', authMiddle, async (req, res) => {
       
        
        let id = req.body.id;
        let state = req.body.state;
        let sql = `update alarm set is_handled='${state}' where id=${id}`
        console.log(sql);
        let results = await connection(sql)
        console.log(results)
        if (results) {
            res.send(results)
        }
    })









    app.use('/api/mobile', router)
}

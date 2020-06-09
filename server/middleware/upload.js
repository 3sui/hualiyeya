/*
 * @Author: your name
 * @Date: 2020-06-08 14:13:45
 * @LastEditTime: 2020-06-08 14:18:27
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \server\middleware\upload.js
 */
module.exports = option => {
    const multer = require('multer')
    const upload = multer({
        dest: __dirname + '../uploads'
    })

    return async (req, res) => {

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
    }
}
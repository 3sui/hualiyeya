/*
 * @Author: your name
 * @Date: 2020-06-10 19:04:15
 * @LastEditTime: 2020-06-10 19:07:47
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \远程监控平台\mobile\babel.config.js
 */ 
module.exports = {
  "presets": [
    "@vue/cli-plugin-babel/preset"
  ],
  "plugins": 
    [
      ['import', {
        libraryName: 'vant',
        libraryDirectory: 'es',
        style: true
      }, 'vant']
    ]
  
  
}

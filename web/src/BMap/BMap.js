/*
 * @Author: your name
 * @Date: 2020-04-28 17:29:42
 * @LastEditTime: 2020-04-29 10:00:25
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \远程监控平台\vue-manage-system\src\BMap\BMap.js
 */
export function MP(ak) {
    return new Promise(function (resolve, reject) {
        window.onload = function () {
            resolve(BMap)
        }
        var script = document.createElement("script");
        script.type = "text/javascript";
        script.src = "http://api.map.baidu.com/api?v=2.0&ak=" + ak + "&callback=init";
        script.onerror = reject;
        document.head.appendChild(script);

       
    })
}
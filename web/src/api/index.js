import request from '../utils/request';

module.exports = {
    apiService: {
        //获取列表
        fetchData (api)  {
            return request({
                url: api,
                method: 'get'
            });
        },

        //搜索
        searchData (api, query) {
            return request({
                url: '/api/' + api,
                method: 'post',
                data: query
            });
        },
        //删除
        deleteData(api, query) {
            return request({
                url: '/api/' + api,
                method: 'post',
                data: query
            });
        },
        //添加
        addData  (api, query) {
            return request({
                url: '/api/' + api,
                method: 'post',
                data: query
            });
        },

        //更新
        updateData (api, query) {
            return request({
                url: '/api/' + api,
                method: 'post',
                data: query
            });
        }

    }
}

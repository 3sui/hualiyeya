import request from '../utils/request';

export const fetchData = (api) => {
    return request({
        url: api,
        method: 'get' 
    });
};
export const searchData = (api,query) => {
    return request({
        url: '/api/' + api,
        method: 'post',
        data:query
    });
};

export const deleteData = (api, query) => {
    return request({
        url: '/api/' + api,
        method: 'post',
        data: query
    });
};

export const addData = (api, query) => {
    return request({
        url: '/api/' + api,
        method: 'post',
        data: query
    });
};


export const updateData = (api, query) => {
    return request({
        url: '/api/' + api,
        method: 'post',
        data: query 
    });
};
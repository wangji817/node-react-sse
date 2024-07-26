const axios = require("axios");

const axiosApi = {
    initAxios: (options = {
        baseURL: 'https://wap.cmread.com',//请求环境域名    
        timeout: 60 * 1000,//超时时间
        headers : {
            "Content-Type": "application/json",
        }
    }) => {
        return axios.create(options);
    },
    get: (axiosInstance, url, data, option) => {
        return new Promise((resolve, reject) => {
            const res = axiosInstance.get(url, data, option);
            res.then(response => {
                resolve(response)
            });
            res.catch(error => {
                // 处理请求错误
                reject({ code: -1, error })
            });
        })
    },
    post: (axiosInstance, url, data, option) => {
        return new Promise((resolve, reject) => {
            const res = axiosInstance.post(url, data, option);
            res.then(response => {
                resolve(response)
            });
            res.catch(error => {
                // 处理请求错误
                reject({ code: -1, error })
            });
        })
    }
}

module.exports = axiosApi;
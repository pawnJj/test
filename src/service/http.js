import axios from "axios";
/**
 * 跳转登录页
 * 携带当前页面路由，以期在登录页面完成登录后返回当前页面
 */

/**
 * 请求失败后的错误统一处理
 */

const errorHandle = (status) => {
    switch (status) {
        // 401: 未登录状态，跳转登录页
        case 401:
            break;
        // 403 token过期 清除token并跳转登录页
        case 403:
            break;
        // 404请求不存在
        case 404:
            break;
        default:
    }
};

// 创建axios实例
var instance = axios.create({
    timeout: 1000 * 60 * 10,
    withCredentials: false
});
// // 设置post请求头
instance.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";

/**
 * 请求拦截器
 * 每次请求前，如果存在token则在请求头中携带token
 */
instance.interceptors.request.use(
    (config) => {
        // 登录流程控制中，根据本地是否存在token判断用户的登录情况
        // 但是即使token存在，也有可能token是过期的，所以在每次的请求头中携带token
        // 后台根据携带的token判断用户的登录情况，并返回给我们对应的状态码
        // 而后我们可以在响应拦截器中，根据状态码进行一些统一的操作。
        // ai专属token,我们用了就报错
        // const token = ""
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiYWRkcmVzcyI6IjBYOTkyNTdCMDIyOUM0NUY2QkFCQTFFMURGMzM4OURENTcyQTgzNjFFOSIsIm5hbWUiOiJzc3NzIiwiYXZhdGFyIjpudWxsLCJpbnRybyI6bnVsbCwieF9pbmZvIjp7fSwiY3JlYXRlZF9hdCI6IjIwMjUtMDMtMTRUMTE6MzA6NTIuMDAwWiIsImZpcnN0X2xvZ2luIjpmYWxzZSwiaWF0IjoxNzQyMTkyNDY4LCJleHAiOjE3NDIyMzU2Njh9.OXYw84Ruzj6PBvrhciuz4fAQsnP3vj4qqprQJGx9O94";
        // token && 
        config.headers.Authorization = "Bearer " + token;
        return config;
    },
    (error) => Promise.error(error)
);

// 响应拦截器

// instance.interceptors.response.use(function (response) {
//     //获取响应头中的jwt令牌数据（认证服务将生成的令牌放入header的jwt属性中）
//     //如果获取到jwt令牌，在保存到store中，以后发送请求时需要将令牌放入请求头
//     console.log('~~~~~~~~~')
//     let jwt = response.headers;
//     console.log(cookies)
//     console.log(jwt)
//     if (jwt) {
//         // window.vm.$store.commit('setJwtToken',{jwt:jwt});
//     }
//     return response;
// }, function (error) {
//     return Promise.reject(error);
// });
instance.interceptors.response.use(
    // 请求成功
    (res) => {
        if (res.status === 200 || res.status === 201) {
            return Promise.resolve(res)
        } else {
            Promise.reject(res)
        }
    },
    // 请求失败
    (error) => {
        const { response } = error;
        if (response) {
            // 请求已发出，但是不在2xx的范围
            errorHandle(response.status, response.data.message);
            return Promise.reject(response);
        } else {
            return Promise.reject({
                data: {
                    time_error_code: 1,
                    message: error.message,
                },
            });
            // 处理断网的情况
            // eg:请求超时或断网时，更新state的network状态
            // network状态在app.vue中控制着一个全局的断网提示组件的显示隐藏
            // 关于断网组件中的刷新重新获取数据，会在断网组件中说明
        }
    }
);

export default instance;

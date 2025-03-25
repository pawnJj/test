//统一管理api
import { base_bome } from "./base"; // 导入接口域名列表
import { get, post, put } from "./tool"; // 导入http中创建的axios实例


// 登录
export const gaurLogin = (params) => post(base_bome + "/users/login", params);
// 用户信息
export const getUserInfo = () => get(base_bome + "/users/me");
// 修改用户信息
export const changeUserInfo = (params) => put(base_bome + "/users", params);
// 检查是否绑定 X
export const checkX = (params) => get(base_bome + "/users", params);
// 获取用户所持有的币
export const getUserTokens = (params) => get(base_bome + "/users/base-tokens", params);
// 获取用户所持有的 LP
export const getUserLP = (params) => get(base_bome + "/users/pair-liquidities", params);
// base-tokens列表
export const getBaseTokens = (params) => get(base_bome + "/base-tokens", params);
// tokens详情
export const getBaseDetails = (params) => get(base_bome + `/base-tokens/${params}`,);
// quote-tokens列表
export const getQuoteTokens = (params) => get(base_bome + "/quote-tokens", params);
// 交易对
export const getPairs = (params) => get(base_bome + "/pairs", params);
// 交易对详情
export const getPairsDetails = (params) => get(base_bome + `/pairs/${params}`);
// 交易对交易记录
export const getPairsTrade = (addr, params) => get(base_bome + `/pairs/${addr}/trades`, params);
// 交易对池子记录
export const getPairsLiquidities = (addr, params) => get(base_bome + `/pairs/${addr}/liquidities`, params);
// FairLaunch 列表  && 用户所创建的币
export const getFairLaunchList = (params) => get(base_bome + "/fair-launch-pools", params);
// FairLaunch详情
export const getFairLaunchDetails = (params) => get(base_bome + `/fair-launch-pools/${params}`);

// FairLaunch详情
export const getFairLaunchTrade = (addr, params) => get(base_bome + `/fair-launch-pools/${addr}/trades`, params);

// 。。。。。详情
export const getTestDeatils = () => get(base_bome + `/statistics/daily-reports`);
// k线图
export const getTardeList = (addr) => get(base_bome + `/statistics/base-tokens/${addr}/trends/1m`);


// M3M3
export const getStackDetails = (params) => get(base_bome + `/stack-pools/deploys`, params);










export default {
    gaurLogin,
    getUserInfo,
    changeUserInfo,
    checkX,
    getUserTokens,
    getUserLP,

    getBaseTokens,
    getBaseDetails,
    getQuoteTokens,
    getPairs,
    getPairsDetails,
    getPairsTrade,
    getPairsLiquidities,
    getFairLaunchList,
    getFairLaunchDetails,
    getFairLaunchTrade,
    getTestDeatils,

    getTardeList,


    getStackDetails,


};

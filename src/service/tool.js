import QS from "qs";
import axios from "./http";
// import { hex_md5 } from "./md5";
// import { baseString } from "./sort";
// import { getCookie } from "../utils";
// import store from "@/store";

export function get(url, params) {
    return new Promise((resolve, reject) => {
        axios
            .get(url, { params })
            .then((res) => {
                resolve(res.data);
            })
            .catch((err) => {
                reject(err.data);
            });
    });
}

export function post(url, params) {
    return new Promise((resolve, reject) => {
        axios
            .post(url, QS.stringify(params))
            .then((res) => {
                resolve(res.data);
            })
            .catch((err) => {
                console.log(err);
                reject(err.data);
            });
    });
}

export function put(url, params) {
    return new Promise((resolve, reject) => {
        axios
            .put(url, QS.stringify(params))
            .then((res) => {
                resolve(res.data);
            })
            .catch((err) => {
                console.log(err);
                reject(err.data);
            });
    });
}
// export function _post(url, params) {
//     const data_base = {};
//     const data = params;
//     const timestamp = Date.parse(new Date()) / 1000;
//     const nonce = hex_md5(timestamp);
//     const app_secret = process.env.NEXT_PUBLIC_APP_APP_SECRET;
//     const name = process.env.NEXT_PUBLIC_APP_API_URL;
//     let routeName = url.split(name)[1];
//     const access_secret = getCookie("login_secret") || "我的天哪噜";
//     const access_token = getCookie("login_token") || "我的天哪噜";
//     data.app_id = process.env.NEXT_PUBLIC_APP_APP_ID;
//     data.timestamp = timestamp;
//     data.access_token = access_token;
//     // data.lang = store.state.lang || "zh-CN";
//     data.nonce = nonce;

//     data_base.timestamp = timestamp;
//     data_base.nonce = nonce;

//     var baseString1 = baseString(data_base, routeName, "POST", url);
//     data.sign = hex_md5(baseString1 + app_secret + access_secret);

//     return new Promise((resolve, reject) => {
//         axios
//             .post(url, QS.stringify(data))
//             .then((res) => {
//                 resolve(res.data);
//             })
//             .catch((err) => {
//                 reject(err.data);
//             });
//     });
// }

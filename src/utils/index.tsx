// import _bigNumber from "bignumber.js";
// import { Toast } from "antd-mobile";
/**
 * 根据传入的地址字符串返回一个格式化后的地址字符串
 * 该函数主要用于在用户界面上显示地址时，对地址进行缩略显示，以保持界面的简洁性
 *
 * @param _address 地址字符串
 * @returns 返回格式化后的地址字符串，格式为“前五位...后六位”
 */
export const getAddress = function (_address: string): string {
    return _address.substring(0, 5) + "..." + _address.substring(_address.length - 6, _address.length);
};

/**
 * 将数字按指定位数移动，相当于除以10的指定次幂
 *
 * @param _number - 原始数字，可以是字符串或数字类型
 * @param _shiftLength - 移动的位数，默认为18如果未指定，将使用默认值
 * @returns 返回移动后的数字，保留小数点后位数
 *
 * 该函数主要用于数值计算场景，其中需要对数字进行精确的位移操作
 * 使用_bigNumber库进行大数计算，以确保计算的精度
 */
// export const shiftNumber = function (_number: string | number, _shiftLength: number = 18): string {
//     // 使用_bigNumber处理大数，避免精度损失
//     // 将原始数字除以10的_shiftLength次幂，然后固定小数点后位数
//     return new _bigNumber(_number).dividedBy(new _bigNumber(10).exponentiatedBy(_shiftLength).toFixed()).toFixed();
// };

/**
 * 将数字转换为字符串
 * @param num 要转换的数字
 * @returns 转换后的字符串
 * @throws 如果输入不是有效的数字或者指数格式解析失败
 *
 * 此函数用于将数字类型转换为字符串类型，特别适用于处理需要精确表示的数字
 * 它通过分析数字的指数形式来确定小数点后的位数，从而精确地进行转换
 */
export const numToString = (num: any) => {
    // 将数字转换为指数形式的字符串，并使用正则表达式匹配出整数部分和指数
    // 简化正则表达式，提高可读性
    const matchResult = num.toExponential().match(/(\d+)(?:\.\d*)?e([+-]\d+)/);
    // 从匹配结果中提取整数部分和指数
    const [integerPart, exponent] = matchResult;
    // 计算小数点后的位数，确保转换后的字符串格式正确
    const decimalPlaces = Math.max(0, integerPart.length - parseInt(exponent, 10) - 1);

    // 使用toFixed方法根据计算出的小数点后位数转换数字为字符串
    return num.toFixed(decimalPlaces);
};

// export const numToString = (num: any) => {
//     let m = num.toExponential().match(/\d(?:\.(\d*))?e([+-]\d+)/);
//     return num.toFixed(Math.max(0, (m[1] || "").length - m[2]));
// };

/**
 * 将给定的分钟数转换为相对于当前时间的Unix时间戳字符串
 * @param num 分钟数，非负整数
 * @returns 转换后的Unix时间戳字符串
 * @throws 如果输入的分钟数不是非负整数，则抛出错误
 */
export const timestamp = (num: number) => {
    // 参数校验
    if (typeof num !== "number" || num < 0) {
        throw new Error("Invalid input: num must be a non-negative number");
    }

    const currentSeconds = Math.floor(Date.now() / 1000); // 使用 Math.floor 确保整数
    const minutesInSeconds = num * 60;
    const timestampSeconds = Math.floor(currentSeconds + minutesInSeconds); // 直接转换为整数字符串

    return timestampSeconds;
};

// interface ToastOptions {
//     message: string;
//     duration?: number;
//     className?: string[]; // 支持多个 className
//     // position?: "top" | "bottom" | "center";
//     type?: "success" | "warning" | "failed"; // 更改为 type
// }

// export const myAntdMobileToast = (options: ToastOptions) => {
//     const { message, duration = 2000, className = [], type = "success" } = options;

//     // 显示 Toast
//     Toast.show({
//         content: message,
//         duration,
//     });

//     // 使用 setTimeout 确保 Toast 渲染完成后执行
//     setTimeout(() => {
//         const toastElement = document.querySelector(".adm-toast-main");
//         if (toastElement) {
//             // 应用自定义的 className
//             className.forEach((cls) => {
//                 toastElement.classList.add(cls);
//             });

//             // 应用位置类名
//             toastElement.classList.add(`my-toast-${type}`);
//         }
//     }, 100); // 延迟执行以确保 Toast 已经渲染完成
// };

// 复制
// export const copyText = (item: string, type?: boolean) => {
//     var input = document.createElement("textarea"); // js 创建一个 textarea 输入框
//     input.value = item; // 将需要复制的文本赋值到创建的 input 输入框中
//     document.body.appendChild(input); // 将输入框暂时创建到文档中
//     input.select(); // 选中输入框中的内容
//     document.execCommand("Copy"); // 执行复制操作
//     document.body.removeChild(input); // 最后删除实例中临时创建的 input 输入框，完成复制操作

//     if (!type) {
//         myAntdMobileToast({
//             type: "success",
//             message: "Copied successfully", // 替换成你实际使用的国际化方法
//             duration: 2000,
//         });
//     }
// };

// 用于格式化币种符号为大写
export const formatSymbolUpperCaseAll = (itemSymbol: any) => {
    if (typeof itemSymbol === "string") {
        return itemSymbol.toUpperCase();
    } else if (itemSymbol != null) {
        // 将非字符串且非null/undefined的值转换为字符串再处理
        return String(itemSymbol).toUpperCase();
    } else {
        return "--";
    }
};

export const getCookie = (cname: any) => {
    var aCookie = document.cookie.split("; ");
    for (var i = 0; i < aCookie.length; i++) {
        var aCrumb = aCookie[i].split("=");
        if (cname === aCrumb[0]) return aCrumb[1];
    }
    return "";
};

export const setCookie = (cname: any, cvalue: any) => {
    //cookie过期时间1年
    const Days = 365;
    const exp = new Date();
    exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
    document.cookie = cname + "=" + cvalue + ";expires=" + exp.toUTCString() + "; path=/";
};


export const isH5 = () => {
    let sUserAgent = '';
    try {
        sUserAgent = navigator.userAgent.toLowerCase();
    } catch (error) {
        console.error('Failed to get userAgent:', error);
    }

    const matches = [
        /ipad/i,
        /iphone os/i,
        /midp/i,
        /rv:1.2.3.4/i,
        /ucweb/i,
        /ucbrowser/i,
        /android/i,
        /windows ce/i,
        /windows mobile/i
    ];

    const isMatch = matches.some(regex => regex.test(sUserAgent));
    return isMatch;
};
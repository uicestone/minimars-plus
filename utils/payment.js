/*
 * @Descripttion:  通用支付
 * @version: 1.0
 * @Author: horiz0n_Z
 * @Date: 2021-07-11 17:30:46
 * @LastEditors: horiz0n_Z
 * @LastEditTime: 2021-07-11 18:13:31
 */
import axios from "./request.js";

export default function payment(params = {}, type = '') {

    return new Promise((resolve, reject) => {
        axios.postRequest('/booking' + (type ? `?paymentGateway=${type}` : ''), params).then(res => {
            const wxpayQuery = res.payments.find(e => e == "wechatpay")
            if (wxpayQuery) {
                uniwx.requestPayment({
                    ...wxpayQuery,
                    signType: 'MD5',
                    success: function (res) {
                        resolve()
                    },
                    fail: function () {
                        // fail
                        reject()
                    },
                })
            } else if (res.status === 'pending') {
                reject("订单创建失败")
            } else {
                resolve()
            }
        }).catch(msg=>{
            
        })
    });
}
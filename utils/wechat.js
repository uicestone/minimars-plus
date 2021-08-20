import config from "./config";
import request from "./request";

export function login() {
  return new Promise((resolve, reject) => {
    uni.getProvider();
    uni.login({
      success: async (loginRes) => {
        console.log("Login success:", loginRes);
        let path = "/wechat/login";
        // #ifdef MP-TOUTIAO
        path = "/byte/login";
        // #endif
        const auth = await request.postRequest(path, {
          code: loginRes.code,
        });
        console.log("Wechat login auth:", auth);
        uni.setStorageSync("token", auth.token);
        config.token = auth.token;
        resolve(auth);
      },
      fail: (err) => {
        console.error("Wechat login error:", err);
        reject(err);
      },
    });
  });
}

export function createOrder(payArgs) {
  console.log("wechat:createOrder", payArgs);
  return new Promise((resolve, reject) => {
    uni.requestPayment({
      ...payArgs,
      signType: "MD5",
      success: function (res) {
        resolve();
      },
      fail: function (err) {
        reject(err.errMsg);
      },
    });
  });
}

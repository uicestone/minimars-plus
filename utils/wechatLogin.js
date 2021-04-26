import request from "./request";

export default function wechatLogin() {
  return new Promise((resolve, reject) => {
    uni.login({
      provider: "weixin",
      success: async (loginRes) => {
        console.log("Wechat login success:", loginRes);
        const auth = await request.postRequest("/wechat/login", {
          code: loginRes.code,
        });
        console.log("Wechat login auth:", auth);
        uni.setStorageSync("token", auth.token);
        resolve(auth);
      },
      fail: (err) => {
        console.error("Wechat login error:", err);
        reject(err);
      },
    });
  });
}

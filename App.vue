<script>
export default {
  onLaunch: async function () {
    console.log("App Launch");
    //全局配置
    this.$axios.getRequest("/config").then((res) => {
      // console.log(res, "全局配置")
      uni.setStorageSync("bookableDays", res.bookableDays); //购票限制日期
    });

    const token = uni.getStorageSync("token");

    if (!token) {
      await this.login();
    } else {
      await this.getAuthUser();
    }

    const user = uni.getStorageSync("userInfo");

    if (user.store) {
      uni.setStorageSync("storeName", resLogin.user.store.name); //默认门店名字
      uni.setStorageSync("storeId", resLogin.user.store.id); //默认门店id
    }
  },
  onShow: function () {
    console.log("App Show");
  },
  onHide: function () {
    console.log("App Hide");
  },
  methods: {
    login() {
      return new Promise((resolve, reject) => {
        uni.login({
          provider: "weixin",
          success: (loginRes) => {
            console.log("wechat login success:", loginRes);

            // 登录接口
            this.$axios
              .postRequest("/wechat/login", {
                code: loginRes.code,
              })
              .then((resLogin) => {
                console.log("wechat login response:", resLogin);
                uni.setStorageSync("token", resLogin.token); //token
                uni.setStorageSync("session_key", resLogin.session_key); //session_key
                uni.setStorageSync("openid", resLogin.openid); //openid
                uni.setStorageSync("userInfo", resLogin.user); //user信息
              });
          },
          fail(err) {
            console.error("wechat login error:", err);
          },
        });
      });
    },
    async getAuthUser() {
      const user = await this.$axios.getRequest("/auth/user");
      console.log("get auth user:", user);
      uni.setStorageSync("userInfo", user);
    },
  },
};
</script>

<style>
/*每个页面公共css */
* {
  margin: 0;
  padding: 0;
}
</style>

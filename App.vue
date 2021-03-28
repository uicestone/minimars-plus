<script>
export default {
  onLaunch: async function () {
    console.log("App Launch");
    //全局配置
    this.$axios.getRequest("/config").then((res) => {
      // console.log(res, "全局配置")
      uni.setStorageSync("bookableDays", res.bookableDays); //购票限制日期
    });
    if (uni.getStorageSync("userInfo")) {
      uni.login({
        provider: "weixin",
        success: (loginRes) => {
          console.log(loginRes, "loginRes");
          // uni.getUserInfo({
          //      provider: 'weixin',
          //      success: function (infoRes) {
          //        console.log('用户昵称为：' + infoRes.userInfo.nickName);
          //      }
          //    });

          // 登录接口
          this.$axios
            .postRequest("/wechat/login", {
              code: loginRes.code,
            })
            .then((resLogin) => {
              console.log(resLogin, "resLogin");
              uni.setStorageSync("userInfo", resLogin.user); //user信息
              uni.setStorageSync("token", resLogin.token); //token
              uni.setStorageSync("storeName", resLogin.user.store.name); //默认门店名字
              uni.setStorageSync("storeId", resLogin.user.store.id); //默认门店id
              uni.setStorageSync("session_key", resLogin.session_key); //session_key
              uni.setStorageSync("openid", resLogin.openid); //openid
              // 暂时用于更新手机号；
              // this.$axios.putRequest('/user/' + resLogin.user.id, {
              // 	mobile: 15931152153
              // }).then(res1 => {
              // 	console.log(res1)
              // })
            });
        },
        fail(err) {
          console.log(err);
        },
      });
    }
  },
  onShow: function () {
    console.log("App Show");
  },
  onHide: function () {
    console.log("App Hide");
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

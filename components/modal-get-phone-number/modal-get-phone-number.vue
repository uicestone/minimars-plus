<template lang="pug">
uni-popup(ref="getPhoneNumberPopup", type="bottom", :tabbar="true")
  view.login_box
    view.login_box_clear
      view.login_box_clear_left
      img.login_box_clear_right(
        src="../../static/images/clear.png",
        @click="close()"
      )
    view.login_contentBox
      view.login_box_title 请先授权登陆
      view.login_box_content 为了更好的为您提供服务，\n请允许微信授权后再使用功能。
      view.login_box_btn
        button.login_box_btn_box(
          open-type="getPhoneNumber",
          @getphonenumber="getPhoneNumber"
        )
          img.login_box_btn_img(src="../../static/images/wx.png")
          view.login_box_btn_name 授权手机号
</template>

<script>
import { sync } from "vuex-pathify";
import wechatLogin from "@/utils/wechatLogin";

export default {
  data() {
    return {};
  },
  computed: {
    auth: sync("auth"),
  },
  methods: {
    async getPhoneNumber(e) {
      Object.assign(this.auth, await wechatLogin());
      const openid = this.auth.openid;
      const session_key = this.auth.session_key;
      const { encryptedData, iv } = e.detail;
      const { token, user } = await this.$axios.postRequest(
        "/wechat/update-mobile",
        {
          encryptedData,
          iv,
          session_key,
          openid,
        }
      );
      uni.setStorageSync("token", token);
      this.auth.token = token;
      this.auth.user = user;
      this.close();
    },
    close() {
      this.$refs.getPhoneNumberPopup.close();
      uni.showTabBar();
    },
    open() {
      this.$refs.getPhoneNumberPopup.open();
      uni.hideTabBar();
    },
  },
  watch: {
    "auth.user"(user) {
      if (user.id && !user.mobile) {
        this.open();
      }
    },
  },
};
</script>

<style lang="less" scoped>
// 微信授权弹框
.login_box {
  background-color: #ffffff;
  width: 750rpx;
  height: 550rpx;
  background: #ffffff;
  border-radius: 40rpx 40rpx 0rpx 0rpx;

  .login_box_clear {
    padding-top: 30rpx;
    width: 672rpx;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;

    .login_box_clear_left {
      width: 40rpx;
      height: 40rpx;
    }

    .login_box_clear_right {
      width: 40rpx;
      height: 40rpx;
    }
  }

  .login_contentBox {
    width: 672rpx;
    margin: 0 auto;

    .login_box_title {
      padding-top: 20rpx;
      width: 264rpx;
      height: 60rpx;
      font-size: var(--theme--font-size-l);
      color: var(--theme--font-main-color);
      line-height: 60rpx;
      padding-bottom: 36rpx;
    }

    .login_box_content {
      width: 672rpx;
      height: 88rpx;
      font-size: var(--theme--font-size-m);
      color: var(--theme--font-main-color);
      line-height: 44rpx;
      text-align: left;
      white-space: pre-wrap;
    }

    .login_box_btn {
      width: 681rpx;
      height: 102rpx;
      background: var(--theme--main-color);
      box-shadow: 0rpx 10rpx 30rpx 0rpx rgba(215, 215, 215, 0.3);
      border-radius: 12rpx;

      .login_box_btn_box {
        margin-top: 50rpx;
        width: 681rpx;
        height: 102rpx;

        button::after {
          border: none;
        }

        padding: 0;
        background: transparent;
        line-height: 102px;
        border-radius: 52rpx;
        display: flex;
        justify-content: center;
        // margin: 65px 222rpx;

        .login_box_btn_img {
          width: 50rpx;
          height: 50rpx;
          color: #ffffff;
          padding-top: 25rpx;
          padding-right: 13rpx;
        }

        .login_box_btn_name {
          font-size: var(--theme--font-size-m);
          color:var(--theme--font-main-color);
          line-height: 100rpx;
        }
      }
    }
  }
}
</style>
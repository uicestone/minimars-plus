<template lang="pug">
view
  uni-popup(ref="popup", type="bottom", :tabbar="true")
    view.login_box
      view.login_box_clear
        view.login_box_clear_left
        img.login_box_clear_right(
          src="../../static/images/clear.png",
          @click="close()"
        )
      view.login_contentBox
        view.login_box_title 请先输入手机号码
        view.login_box_content
          input(
            type="text",
            value="phoneNumber",
            placeholder="输入手机号码",
            v-model="phoneNumber"
          )
        view.login_box_btn
          // @click="getphoneNumber"
          button.login_box_btn_box(@click="getphonenumber")
            img.login_box_btn_img(src="../../static/images/wx.png")
            view.login_box_btn_name 微信授权手机号码
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {},
};
</script>

<style lang="less">
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
      // width: 264rpx;
      height: 60rpx;
      font-size: 44rpx;
      font-weight: 550;
      color: #000000;
      line-height: 60rpx;
      padding-bottom: 36rpx;
    }

    .login_box_content {
      width: 672rpx;
      height: 88rpx;
      font-size: 32rpx;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #848484;
      line-height: 44rpx;
      text-align: left;
    }

    .login_box_btn {
      width: 681rpx;
      height: 102rpx;
      background: #9fcdff;
      box-shadow: 0rpx 10rpx 30rpx 0rpx rgba(215, 215, 215, 0.3);
      border-radius: 52rpx;

      .login_box_btn_box {
        margin-top: 50rpx;
        width: 681rpx;
        height: 102rpx;

        button::after {
          border: none;
        }

        padding: 0;
        background-color: #9fcdff;
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
          font-size: 32rpx;
          font-weight: 500;
          color: #ffffff;
          line-height: 100rpx;
        }
      }
    }
  }
}
</style>

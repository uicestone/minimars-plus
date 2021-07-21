<template lang="pug">
view.myvipcode_box
  view.myvipcodebox_header
    view.myvipcodeboxHeader_image(@click="gomy()")
      img.myvipcodeboxHeader_image_img(
        src="../../static/images/my/my_left.png"
      )
    view.myvipcodeboxHeader_headimg
      img.myvipcodeboxHeader_headimg_img(:src="avatar")
      span {{ name }}
  view.myvipcode_box_content
    img.myvipcode_box_content_img(:src="srcQRcode")
    span.myvipcode_box_content_title 会员码每30秒自动刷新一次
</template>

<script>
import { sync } from "vuex-pathify";
import config from "../../utils/config";

export default {
  data() {
    return {
      avatar: "",
      srcQRcode: "", // 会员码
      name: "",
    };
  },
  computed: {
    user: sync("auth/user"),
  },
  onShow() {
    this.name = this.user.name;
    this.avatar = this.user.avatarUrl;
    this.srcQRcode = config.apiBaseUrl + "/qrcode-image/" + this.user.id;
  },
  methods: {
    gomy() {
      uni.switchTab({
        url: "/pages/my/my",
      });
    },
  },
};
</script>

<style lang="less" scoped>
.myvipcode_box {
  width: 750rpx;
  background-color: #f0f2f5;
  min-height: 100vh;

  .myvipcodebox_header {
    width: 750rpx;
    height: 324rpx;
    background: #828282;
    position: relative;
    // margin-top: 20rpx;

    .header_img {
      width: 750rpx;
      height: 324rpx;
    }

    .myvipcodeboxHeader_image {
      position: absolute;
      top: 60rpx;
      left: 40rpx;

      .myvipcodeboxHeader_image_img {
        width: 16rpx;
        height: 22rpx;
      }
    }

    .myvipcodeboxHeader_headimg {
      width: 140rpx;
      height: 140rpx;
      position: absolute;
      bottom: -60rpx;
      left: 300rpx;
      text-align: center;

      // background: #D8D8D8;
      .myvipcodeboxHeader_headimg_img {
        width: 140rpx;
        height: 140rpx;
        border-radius: 140rpx;
      }
    }
  }

  .myvipcode_box_content {
    width: 322rpx;
    margin: 350rpx auto;

    .myvipcode_box_content_img {
      width: 322rpx;
      height: 322rpx;
      border-radius: var(--theme--border-radius);
      background-color: var(--theme--bg-main-color);
    }

    .myvipcode_box_content_title {
      font-size: var(--theme--font-size-s);
      display: block;
      margin-top: 56rpx;
      width: 100%;
      text-align: center;
    }
  }
}
</style>

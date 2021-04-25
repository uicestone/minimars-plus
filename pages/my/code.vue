<template lang="pug">
view.myvipcode_box
  view.myvipcodebox_header
    // <image src="../../static/images/224.jpg" mode="aspectFill" class="header_img" />
    view.myvipcodeboxHeader_image(@click="gomy()")
      img.myvipcodeboxHeader_image_img(
        src="../../static/images/my/my_left.png"
      )
    view.myvipcodeboxHeader_headimg
      img.myvipcodeboxHeader_headimg_img(:src="heading")
      span {{ nickname }}
  view.myvipcode_box_content
    img.myvipcode_box_content_img(:src="srcQRcode")
    span.myvipcode_box_content_title 会员码每30秒自动刷新一次
</template>

<script>
export default {
  data() {
    return {
      heading: "",
      srcQRcode: "", // 会员码
      nickname: "",
    };
  },
  onShow() {
    this.nickname = uni.getStorageSync("nickname");
    this.heading = uni.getStorageSync("headerimg");
    this.srcQRcode =
      "https://mini-mars.codeispoetry.tech/api/qrcode-image/" +
      uni.getStorageSync("user").id;
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

<style lang="less">
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
    width: 300rpx;
    // min-height: 100vh;
    margin: 350rpx auto;

    .myvipcode_box_content_img {
      width: 300rpx;
      height: 300rpx;
    }

    .myvipcode_box_content_title {
      width: 294rpx;
      height: 34rpx;
      font-size: 24rpx;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #bdbdbd;
      line-height: 34rpx;
    }
  }
}
</style>

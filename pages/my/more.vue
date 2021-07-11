<template lang="pug">
view.mymore_box
  view.my_vip_content
    view.my_vip_content_box
      view.my_vip_content_namebox
        span 个人资料
        img(src="../../static/images/111.png")
      view.my_vip_content_namebox
        span 条款
        img(src="../../static/images/111.png")
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
.mymore_box {
  width: 750rpx;
  min-height: 100vh;
  background-color: #f8f8f8;

  .my_vip_content {
    padding-top: 20rpx;

    .my_vip_content_box {
      width: 690rpx;
      margin: 0 auto;

      .my_vip_content_namebox {
        display: flex;
        justify-content: space-between;
        padding: 15px 20rpx;
        align-items: center;

        span {
          width: 150rpx;
          height: 40rpx;
          font-size: 30rpx;

          color: #0d0d0d;
          line-height: 40rpx;
        }

        image {
          width: 10rpx;
          height: 20rpx;
          margin-right: 30rpx;
          line-height: 20rpx;
        }
      }
    }
  }
}
</style>

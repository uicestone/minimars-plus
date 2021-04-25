<template lang="pug">
view
</template>

<script>
export default {
  onLoad() {
    uni.scanCode({
      success: (res) => {
        console.log("条码类型：" + res.scanType);
        console.log("条码内容：" + res.result);
        uni.setStorageSync("qrCodeRes", res.result);
        uni.redirectTo({
          url: "/pages/orderFood/orderFood",
        });
      },
      fail: function (res) {
        // 取消操作后的回调 跳转到小程序首页
        uni.switchTab({
          url: "/pages/index/index",
        });
      },
    });
  },
};
</script>

<style></style>

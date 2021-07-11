<template lang="pug">
view
  view.img-box.bg
    img(src="../../static/images/mall/mall-redirecting.png", mode="aspectFill")
</template>

<script>
import config from "../../utils/config";
export default {
  onTabItemTap(data) {
    if (data.pagePath === "pages/mall/index") {
      uni.navigateToMiniProgram({
        appId: config.mallAppId,
      });
    }
  },
};
</script>

<style scoped>
.bg {
  width: 100%;
  height: 100vh;
}
</style>
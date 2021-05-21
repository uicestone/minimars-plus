<template lang="pug">
view
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
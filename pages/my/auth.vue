<template lang="pug">
view
</template>

<script>
export default {
  data() {
    return {};
  },
  onShow() {
    console.log("123333333");
    uni.getUserInfo({
      provider: "weixin",
      success: (infoRes) => {
        console.log(infoRes, "用户信息");
        uni.setStorageSync("nickname", infoRes.userInfo.nickName);
        uni.setStorageSync("headerimg", infoRes.userInfo.avatarUrl);
      },
    });
  },
  methods: {},
};
</script>

<style></style>

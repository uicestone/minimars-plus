<template>
  <uni-popup ref="popup" type="bottom">
    <view class="box">
      <view class="box__header">
        <slot name="header"></slot>
      </view>
      <view>
        <slot name="body"></slot>
      </view>
    </view>
  </uni-popup>
</template>

<script>
export default {
  methods: {
    open() {
      this.$refs.popup.open();
    },
  },
};
</script>

<style scoped>
.box {
  background-color: white;
  border-radius: 16rpx 16rpx 0 0;
  overflow: hidden;
}

.box__header {
  background-color: var(--theme--main-color);
  height: 103rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 16rpx;
}
</style>

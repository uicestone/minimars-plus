<template lang="pug">
view.item
  view.img-box.item__img
    img(:src="img", :mode="imgMode")
  view.item-content
    slot
</template>

<script>
export default {
  props: {
    img: String,
    imgMode: {
      type: String,
      default: "aspectFill",
    },
  },
};
</script>

<style scoped>
.item {
  border-radius: var(--theme--border-radius);
  box-shadow: var(--theme--box-shadow);
  overflow: hidden;
  width: 100%;
}

.item__img {
  width: 100%;
  padding-bottom: 33.62%;
  background-color: var(--theme--bg-main-color);
}

.item-content {
  padding: 30rpx 40rpx;
  font-size: var(--theme--font-size-s);
  line-height: var(--theme--font-size-s);
}
</style>

<style>
.item-content > view {
  width: 50%;
  display: inline-block;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

.item-content > view:nth-of-type(2n) {
  text-align: right;
}

.item-content > view:nth-of-type(n + 3) {
  margin-top: 24rpx;
}
</style>

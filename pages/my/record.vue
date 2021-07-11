<template lang="pug">
view.page
  view.record.flex-x.center
    view.img-box.icon
      img(src="../../static/images/my/record_icon1.png")
    view.content.grow
      view.title 消费内容:MARSMARSMARSMARSMARSMARSMARSMARSMARSMARSMARSMARSMARSMARSMARSMARSMARS
      view.time 消费时间:2021.05.18 15:45
    view.detail
      view.num x2
      view.price rmb 1,198
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {},
};
</script>

<style scoped>
.page {
  height: 100vh;
  overflow-y: scroll;
  background-color: #f7f7f7;
}

.record {
  height: 202rpx;
  width: 640rpx;
  margin: 0 auto;
  border-bottom: 2rpx solid #e2e4e4;
  font-size: var(--theme--font-size-s);
}

.icon {
  width: 70rpx;
  height: 70rpx;
  margin-right: 28rpx;
}

.content {
  width: 400rpx;
}

.detail {
  text-align: right;
}

.time,
.price {
  margin-top: 18rpx;
}

.num,
.time {
  font-weight: var(--theme--font-weight-light);
}

.title {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
</style>

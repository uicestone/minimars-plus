<template lang="pug">
view.marsActivityBox
  view.marsActivity_header.img-box
    img(src="../../static/images/my/my-banner.png", mode="aspectFill")
  view.marsActivity_titleBox
    view.header
        view.name 圣诞树DIY
        view.rule
          view.date 2021.12.19
          view.age 3-10岁
    view.richtext 111
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {},
};
</script>

<style lang="less" scoped>
.marsActivityBox {
  .marsActivity_header {
    width: 750rpx;
    height: 782rpx;
    background: var(--theme--bg-main-color);
  }
  .marsActivity_titleBox {
    border-radius: var(--theme--border-radius) var(--theme--border-radius) 0 0;
    position: fixed;
    bottom: 0;
    height: calc(100vh - 720rpx);
    width: 100%;
    top: 720rpx;
    background-color: white;
    padding: 56rpx 66rpx;
    box-sizing: border-box;
  }
}

.header{
  border-bottom: 2rpx solid #e4e7e7;
}

.header::after{
  content: "";
  display: table-cell;
}

.name{
  font-size: var(--theme--font-size-m);
  line-height: var(--theme--font-size-m);  
  margin-bottom: 22rpx;
}

.rule{
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: var(--theme--font-size-m);
  line-height: var(--theme--font-size-m);
  color: var(--theme--font-deputy-color);
  margin-bottom: 54rpx;
}

.richtext{
  font-size: var(--theme--font-size-s);
  line-height: 42rpx;
  color: var(--theme--font-main-color);
  padding: 32rpx 0;
  overflow-y: scroll;
  height: calc(100vh - 720rpx - 115rpx - 132rpx);
  box-sizing: border-box;
}
</style>
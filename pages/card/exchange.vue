<template lang="pug">
view.container
  view.card
    view.flex-x.center.between.card-title
      view.logo.flex-x.center.mid
        view.img-box.logo__img
          img(src="../../static/images/card/logo.png")
      view.name.grow MINI MARS
      view.img-box.scan
        img(src="../../static/images/card/scan.png")
  view.content
    view.content-container
      view.title 兑换中心
      view.notice 用于兑换门票、优惠或礼品卡
      view.input.flex-x.center
        input.input__input.grow(placeholder="输入券码兑换门票、优惠或礼品卡")
        view.img-box.input__scan
          img(src="../../static/images/card/scan.png")
      view.confirm 确认 CONFIRM
</template>

<script></script>

<style scoped>
.container {
  background-color: #edeeef;
  width: 100%;
  height: 100vh;
}

.container::before,
.card::before {
  content: "";
  display: table-cell;
}

.card {
  width: 596rpx;
  height: 938rpx;
  background-color: white;
  margin: 68rpx auto 0;
  border-radius: var(--theme--border-radius);
}

.card-title {
  width: 508rpx;
  margin: 32rpx auto 0;
}

.logo {
  width: 80rpx;
  height: 80rpx;
  background-color: var(--theme--main-color);
  border-radius: 50%;
}

.logo__img {
  width: 48rpx;
  height: 30rpx;
}

.content {
  height: calc(100vh - 386rpx);
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: white;
  box-shadow: var(--theme--box-shadow);
}

.name {
  margin-left: 20rpx;
  font-size: var(--theme--font-size-m);
}

.scan {
  width: 44rpx;
  height: 44rpx;
}

.content-container {
  width: 596rpx;
  margin: 0 auto;
}

.title {
  font-size: var(--theme--font-size-l);
  margin-top: 68rpx;
}

.notice {
  font-size: var(--theme--font-size-m);
  margin-top: 64rpx;
}

.input,
.confirm {
  width: 100%;
  height: 102rpx;
  line-height: 102rpx;
  background-color: #edeeef;
  border-radius: var(--theme--border-radius);
  padding: 0 42rpx;
  box-sizing: border-box;
}

.input {
  margin-top: 184rpx;
}

.input_input {
  font-size: var(--theme--font-size-m);
}

.input__scan {
  width: 50rpx;
  height: 50rpx;
  background-color: var(--theme--main-color);
  border-radius: 6rpx;
}

.input__scan img {
  width: 32rpx;
  height: 32rpx;
}

.confirm {
  background-color: var(--theme--main-color);
  text-align: center;
  margin-top: 60rpx;
}
</style>

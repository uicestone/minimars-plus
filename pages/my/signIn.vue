<template lang="pug">
view
  swiper.banner(autoplay, loop)
    swiper-item(v-for="(item, index) in swiperImg", :key="index")
      view.banner__img.img-box
        img(:src="item")
  view.container
    view.list
      view.item(
        v-for="(item, index) in signinImg",
        :key="index",
        :class="signInDays > index ? 'item--active' : ''"
      )
        view.item__name {{ item.name }}
        view.img-box.item__img
          img(v-if="!item.text", :src="item.img")
          view.item__text(v-else) {{ item.text }}
    view.btn 今日签到 SIGN IN NOW

  view.intro 签到说明
</template>

<script>
export default {
  data() {
    return {
      swiperImg: ["../../static/images/my/sign/task-daily-banner.png"],
      signinImg: [
        {
          name: "第一天",
          text: "1",
        },
        {
          name: "第二天",
          text: "2",
        },
        {
          name: "第三天",
          text: "3",
        },
        {
          name: "第四天",
          text: "4",
        },
        {
          name: "第五天",
          text: "5",
        },
        {
          name: "第六天",
          text: "6",
        },
        {
          name: "第七天",
          img: "../../static/images/my/task/task-goal.png",
        },
      ],
      signInDays: 1,
    };
  },
  methods: {},
};
</script>

<style lang="less" scoped>
.banner {
  width: 100%;
  height: 424rpx;
  background-color: var(--theme--bg-main-color);
}

.banner__img {
  width: 100%;
  height: 100%;
}

.container {
  position: absolute;
  top: 380rpx;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
}

.list {
  width: 100%;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: center;
}

.item {
  border-radius: var(--theme--border-radius);
  box-shadow: var(--theme--box-shadow);
  background-color: white;
  color: var(--theme--font-main-color);
  padding: 36rpx;
  margin-left: 28rpx;
}

.item:nth-of-type(n + 5) {
  margin-top: 40rpx;
}

.item:nth-of-type(4n + 1) {
  margin-left: 0;
}

.item__name {
  font-size: var(--theme--font-size-s);
  text-align: center;
  padding-bottom: 34rpx;
  border-bottom: 2rpx solid var(--theme--bg-main-color);
}

.item__img {
  width: 78rpx;
  height: 78rpx;
  background-color: #fbfbfb;
  margin-top: 28rpx;
}

.item__img > img {
  width: 60%;
  height: 60%;
}

.item__text {
  font-size: 60rpx;
  font-weight: 900;
  text-align: center;
  line-height: 78rpx;
  color: #fbfbfb;
  text-shadow: 0 0 4rpx var(--theme--font-main-color);
}

.item--active .item__text {
  color: var(--theme--main-color);
}

.btn {
  width: 594rpx;
  height: 102rpx;
  border-radius: var(--theme--border-radius);
  background-color: var(--theme--main-color);
  line-height: 102rpx;
  font-size: var(--theme--font-size-m);
  text-align: center;
  margin: 42rpx auto 0;
}

.intro {
  position: absolute;
  bottom: 24rpx;
  font-size: var(--theme--font-size-s);
  color: var(--theme--font-deputy-color);
  left: 50%;
  transform: translateX(-50%);
  padding-bottom: env(safe-area-inset-bottom);
}
</style>

<template lang="pug">
view
  swiper.banner(autoplay,loop)
    swiper-item(v-for="(item,index) in swiperImg",:key="index")
      view.banner__img.img-box
        img(:src="item")
  
  view.task-container
    view.card
      view.card-title
        view 每日任务
        view 积分
          span.card-title__score +5
      view.task-list
        view.task
          view.img-box.task__img
            img
          view.task-content
            view.task-content__name 每日签到
            view.task-content__condition 打卡签到获得惊喜积分+5
          view.task__btn 去签到
    view.card
      view.card-title
        view 每周任务
      view.task-list
        view.task
          view.img-box.task__img
            img
          view.task-content
            view.task-content__name 订单奖励
            view.task-content__condition 会员全渠道消费
          view.task__btn 领任务
        view.task
          view.img-box.task__img
            img
          view.task-content
            view.task-content__name 活动浏览
            view.task-content__condition 浏览活动页面获得积分奖励+10
          view.task__btn 去浏览
</template>

<script>
export default {
  onHide() {
    this.swiperAutoplay = false;
  },
  data() {
    return {
      swiperImg: [
        '../../static/images/223.jpg',
        '../../static/images/224.jpg',
        '../../static/images/223.jpg',
        '../../static/images/223.jpg',
        '../../static/images/224.jpg',
        '../../static/images/223.jpg'
      ],
      current: 0,
      swiperCurrent: 0,
      swiperAutoplay: true
    };
  },
  methods: {
    changeSwiper(e) {
      this.swiperCurrent = e.detail.current;
    },
    goSignIn() {
      uni.navigateTo({
        url: '/pages/my/mySignIn'
      });
    }
  }
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

.task-container {
  position: absolute;
  top: 380rpx;
  left: 50%;
  transform: translateX(-50%);
  width: 690rpx;
}

.card {
  box-shadow: var(--theme--box-shadow);
  border-radius: var(--theme--border-radius);
  background-color: white;
  padding: 0 44rpx;
}

.card-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 88rpx;
  font-size: var(--theme--font-size-s);
}

.card-title__score {
  color: var(--theme--main-color);
}

.task {
  display: flex;
  border-top: 2rpx solid #dde0e1;
  padding: 26rpx 0 40rpx;
}

.task__img {
  width: 40rpx;
  height: 40rpx;
  background-color: var(--theme--bg-main-color);
}

.task-content {
  flex-grow: 1;
  width: 50%;
  margin-left: 20rpx;
  color: var(--theme--font-main-color);
}

.task-content__name {
  font-size: var(--theme--font-size-m);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.task-content__condition {
  font-size: var(--theme--font-size-s);
  margin-top: 20rpx;
  font-weight: var(--theme--font-weight-light);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.task__btn {
  align-self: center;
  border-radius: var(--theme--border-radius);
  background-color: var(--theme--main-color);
  height: 46rpx;
  line-height: 46rpx;
  font-size: var(--theme--font-size-s);
  padding: 0 24rpx;
  margin-left: 20rpx;
}

.card + .card {
  margin-top: 30rpx;
}
</style>

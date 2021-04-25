<template lang="pug">
view.myTaskBox
  view.banner
    swiper.swiper(
      :autoplay="true",
      :interval="3000",
      :duration="1000",
      :current="swiperCurrent",
      @change="changeSwiper",
      indicator-dots="true",
      circular="true",
      indicator-color="#B9B9B9",
      indicator-active-color="#9B9B9B"
    )
      swiper-item(v-for="item in swiperImg", :key="item.id")
        img.swiper_item(:src="item", mode="aspectFill")
  // 每日任务
  view.myTask_Boxactive
    view.myTask_Boxactive_title 每日任务
    view.myTask_Boxactive_content
      img.Boxactive_content_left(src="../../static/images/my/my_qiandao.png")
      view.Boxactive_content_right
        view.Boxactive_content_rightBox
          view.Boxactive_content_rightBox_left
            view.Boxactive_content_rightBox_leftTitle
              | 每日签到
              view
                | 积分
                span +5
            view.Boxactive_content_rightBox_leftdetail 打卡签到获得惊喜积分
          view.Boxactive_content_rightBox_right(@click="goSignIn") 去签到
  // 每周任务
  view.myTask_weeklybox
    view.myTask_Boxactive.weekly
      view.myTask_Boxactive_title.weekly_title 每周任务
      view.myTask_Boxactive_content
        img.Boxactive_content_left(src="../../static/images/my/my_jingli.png")
        view.Boxactive_content_right
          view.Boxactive_content_rightBox
            view.Boxactive_content_rightBox_left
              view.Boxactive_content_rightBox_leftTitle 订单奖励
              view.Boxactive_content_rightBox_leftdetail 会员全渠道消费
            view.Boxactive_content_rightBox_right 领任务
    view.myTask_Boxactive.weekly.weeklyHeight
      //
        <view class="myTask_Boxactive_title">
        每周任务
        </view>
      view.myTask_Boxactive_content
        img.Boxactive_content_left(src="../../static/images/my/my_liulan.png")
        view.Boxactive_content_right
          view.Boxactive_content_rightBox
            view.Boxactive_content_rightBox_left
              view.Boxactive_content_rightBox_leftTitle
                | 活动浏览
                view
                  | 积分
                  span +10
              view.Boxactive_content_rightBox_leftdetail 浏览活动页面获得积分奖励
            view.Boxactive_content_rightBox_right 去浏览
</template>

<script>
export default {
  data() {
    return {
      swiperImg: [
        "../../static/images/223.jpg",
        "../../static/images/224.jpg",
        "../../static/images/223.jpg",
        "../../static/images/223.jpg",
        "../../static/images/224.jpg",
        "../../static/images/223.jpg",
      ],
      current: 0,
      swiperCurrent: 0,
    };
  },
  methods: {
    changeSwiper(e) {
      this.swiperCurrent = e.detail.current;
    },
    goSignIn() {
      uni.navigateTo({
        url: "/pages/my/mySignIn",
      });
    },
  },
};
</script>

<style lang="less">
.myTaskBox {
  background: #f8f8f8;
  min-height: 100vh;

  // 轮播
  .banner {
    width: 720rpx;
    height: 304rpx;
    border-radius: 24rpx;
    margin: 0 auto;
    // margin-top: 20rpx;
    padding-top: 10rpx;

    .swiper {
      height: 304rpx;
      border-radius: 24rpx;

      .swiper_item {
        width: 720rpx;
        height: 304rpx;
        border-radius: 24rpx;

        img {
          width: 720rpx;
          height: 304rpx;
          // border-radius: 24rpx;
        }

        span {
          font-weight: bold;
          color: #333333;
        }
      }
    }
  }

  // 每日任务
  .myTask_Boxactive {
    background-color: #007aff;
    margin: 25rpx auto;
    width: 720rpx;
    height: 262rpx;
    background: #ffffff;
    box-shadow: 0rpx 4rpx 10rpx 4rpx rgba(218, 218, 218, 0.5);
    border-radius: 24rpx;

    .myTask_Boxactive_title {
      padding: 25rpx;
      width: 120rpx;
      height: 42rpx;
      font-size: 30rpx;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 550;
      color: #0d0d0d;
      line-height: 42rpx;
    }

    .myTask_Boxactive_content {
      width: 670rpx;
      margin: 0 auto;
      display: flex;

      .Boxactive_content_left {
        width: 46rpx;
        height: 46rpx;
        margin-top: 20rpx;
      }

      .Boxactive_content_right {
        margin-top: 8rpx;

        .Boxactive_content_rightBox {
          margin-left: 20rpx;
          width: 600rpx;
          display: flex;
          align-items: center;
          justify-content: space-between;

          .Boxactive_content_rightBox_left {
            .Boxactive_content_rightBox_leftTitle {
              width: 275rpx;
              height: 42rpx;
              font-size: 30rpx;
              font-family: PingFangSC-Medium, PingFang SC;
              font-weight: 550;
              color: #0d0d0d;
              line-height: 42rpx;
              display: flex;
              justify-content: space-between;

              view {
                width: 100rpx;
                height: 32rpx;
                font-size: 22rpx;
                font-family: PingFangSC-Regular, PingFang SC;
                font-weight: 400;
                color: #0d0d0d;
                line-height: 55rpx;

                span {
                  color: #9fcdff;
                }
              }
            }

            .Boxactive_content_rightBox_leftdetail {
              width: 290rpx;
              height: 32rpx;
              font-size: 22rpx;
              font-family: PingFangSC-Regular, PingFang SC;
              font-weight: 400;
              color: #ababab;
              line-height: 32rpx;
            }
          }

          .Boxactive_content_rightBox_right {
            width: 144rpx;
            height: 60rpx;
            background: #9fcdff;
            border-radius: 50rpx;
            text-align: center;
            line-height: 60rpx;
            font-size: 26rpx;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #ffffff;
          }
        }
      }
    }
  }

  // 每周任务
  .myTask_weeklybox {
    width: 720rpx;
    height: 450rpx;
    background: #ffffff;
    box-shadow: 0rpx 4rpx 10rpx 4rpx rgba(211, 211, 211, 0.5);
    border-radius: 24rpx;
    margin: 5rpx auto;

    .weekly {
      margin: 0rpx auto;
      padding: 10px 0;
      border-radius: 10rpx 10rpx 0rpx 0rpx;
      height: 180rpx;
      border-bottom: 1rpx solid #f7f7f7;

      .weekly_title {
      }
    }

    .weeklyHeight {
      height: 80rpx;
      box-shadow: 0rpx 0rpx 0rpx 0rpx;
    }
  }
}
</style>

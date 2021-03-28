<template>
  <view class="shoppingMall_box">
    <view class="shoppingMall_banner">
      <swiper
        class="swiper"
        :autoplay="true"
        :interval="3000"
        :duration="1000"
        :current="swiperCurrent"
        @change="changeSwiper"
        indicator-dots="true"
        circular="true"
        indicator-color="#B9B9B9"
        indicator-active-color="#9B9B9B"
      >
        <swiper-item v-for="item in swiperImg" :key="item.id">
          <image class="swiper_item" :src="item" mode="aspectFill"></image>
        </swiper-item>
      </swiper>
    </view>
    <!-- 联名 -->
    <view class="mars_jointlySigned">
      <view class="mars_jointlySigned_box">
        <view class="mars_jointlySigned_one">
          <span>MARS联名</span>
        </view>
        <view class="mars_jointlySigned_two">
          <view class="mars_jointlySigned_two-top">
            <span>MARS周边</span>
          </view>
          <view class="mars_jointlySigned_two-bottom">
            <span>积分商城</span>
          </view>
        </view>
      </view>
    </view>
    <!-- 猜你喜欢 -->
    <view class="my_like">
      <view class="my_like_title"> 猜你喜欢 </view>
      <view class="my_like_content"> </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      swiperImg: [
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
  },
};
</script>

<style lang="less">
.shoppingMall_box {
  .shoppingMall_banner {
    width: 750rpx;
    height: 750rpx;
    background: #d8d8d8;

    .swiper {
      height: 750rpx;

      .swiper_item {
        width: 750rpx;
        height: 750rpx;

        img {
          width: 750rpx;
          height: 750rpx;
        }

        span {
          font-weight: bold;
          color: #333333;
        }
      }
    }
  }

  // mars联名
  .mars_jointlySigned {
    width: 692rpx;
    margin: 0 auto;
    margin-top: 30rpx;
    margin-bottom: 50rpx;

    .mars_jointlySigned_box {
      display: flex;
      justify-content: space-between;

      .mars_jointlySigned_one {
        width: 332rpx;
        height: 332rpx;
        background: #d8d8d8;
        border-radius: 16rpx;

        span {
          padding-left: 20rpx;
          width: 144rpx;
          height: 100rpx;
          font-size: 29rpx;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 550;
          color: #333333;
          line-height: 100rpx;
        }
      }

      .mars_jointlySigned_two {
        width: 332rpx;
        height: 332rpx;

        .mars_jointlySigned_two-top,
        .mars_jointlySigned_two-bottom {
          background: #d8d8d8;
          border-radius: 16rpx;

          span {
            padding-left: 20rpx;
            width: 144rpx;
            height: 100rpx;
            font-size: 29rpx;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 550;
            color: #333333;
            line-height: 100rpx;
          }
        }

        .mars_jointlySigned_two-top {
          width: 332rpx;
          height: 152rpx;
        }

        .mars_jointlySigned_two-bottom {
          width: 332rpx;
          height: 154rpx;
          margin-top: 13px;
        }
      }
    }
  }

  // 猜你喜欢
  .my_like {
    width: 692rpx;
    margin: 0 auto;

    .my_like_title {
      width: 116rpx;
      height: 40rpx;
      font-size: 29rpx;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #333333;
      line-height: 40rpx;
      margin-left: 25rpx;
    }

    .my_like_content {
      margin: 25rpx 0;
      width: 692rpx;
      height: 288rpx;
      background: #d8d8d8;
      border-radius: 16px;
    }
  }
}
</style>

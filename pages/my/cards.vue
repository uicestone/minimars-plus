<template lang="pug">
view.cardbag
  view.cardbag_box
    view.cardbag_box-left
      view.cardbag_use(
        @click="gouse()",
        :class="btnnum == 0 ? 'clickcard' : 'noclickcard'"
      ) 可使用 （1）
      view.cardbag_unactivated(
        @click="nouse()",
        :class="btnnum == 1 ? 'clickcard' : 'noclickcard'"
      ) 未激活 （2）
    view.cardbag_box-right
      img(src="../../static/images/my/card.png")
      | 获得更多礼品卡
  view.cardbag_card(v-show="btnnum == 0")
    view.cardbag_card_box
      img(src="../../static/images/224.jpg", mode="aspectFill")
      view.cardbag_card_box-content
        view.cardbag_card_box-content-money
          | MarsBabe卡
          span ¥ 3800
        view.cardbag_card_box-content-time （过期时间：2021.5.18）
    view.mycards_footer 历史卡券
  // 未激活
  view.cardbag_card(v-show="btnnum == 1")
    view.cardbag_card_box
      img(src="../../static/images/224.jpg", mode="aspectFill")
      view.cardbag_card_box-content
        view.cardbag_card_box-content-money
          | Mars圣诞卡
          span ¥ 3800
        view.cardbag_card_box-content-times
          view.cardbag_card_box-content-time-left 自用激活
          view.cardbag_card_box-content-time-right.giveColors 赠送好友
    view.cardbag_card_box
      img(src="../../static/images/224.jpg", mode="aspectFill")
      view.cardbag_card_box-content
        view.cardbag_card_box-content-money
          | Mars圣诞卡
          span ¥ 3800
        view.cardbag_card_box-content-times
          view
          view.cardbag_card_box-content-time-right.getColors 待领取
    // 底部，礼品卡使用须知
    view.mycards_footer-use
      view.mycards_footer-use_left(@click="gouseCade()") 礼品卡使用须知
      view.mycards_footer-use_line
      view.mycards_footer-use_right(@click="goRceived()") 卡券收赠记录
</template>

<script>
export default {
  data() {
    return {
      btnnum: 0,
      count: "",
    };
  },
  methods: {
    gouse() {
      this.btnnum = 0;
    },
    nouse() {
      this.btnnum = 1;
    },
    gouseCade() {
      uni.navigateTo({
        url: "/pages/my/cardRules",
      });
    },
    goRceived() {
      uni.navigateTo({
        url: "/pages/my/cardTransfers",
      });
    },
  },
};
</script>
<style lang="less">
.cardbag {
  width: 750rpx;
  background: #f8f8f8;

  .cardbag_box {
    padding-top: 30rpx;
    width: 650rpx;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    margin-bottom: 40rpx;

    .cardbag_box-left {
      display: flex;
      justify-content: space-between;
      width: 322rpx;
      height: 34rpx;
      font-size: 24rpx;
      font-weight: 500;
      color: #919191;
      line-height: 34rpx;
    }

    .clickcard {
      color: #9fcdff;
    }

    .noclickcard {
      color: #919191;
    }

    .cardbag_box-right {
      width: 260rpx;
      height: 40rpx;
      font-size: 28rpx;
      font-weight: 500;
      color: #3f3f3f;
      line-height: 40rpx;
      display: flex;
      align-items: center;

      image {
        width: 34rpx;
        height: 28rpx;
        margin-right: 10rpx;
        // background: #666666;
      }
    }
  }

  .cardbag_card {
    .cardbag_card_box {
      width: 566rpx;
      height: 404rpx;
      // background: #D8D8D8;
      box-shadow: 0rpx 4rpx 14rpx 6rpx rgba(222, 221, 221, 0.5);
      border-radius: 16rpx;
      margin: 0 auto;
      position: relative;
      margin-bottom: 45rpx;

      image {
        width: 566rpx;
        height: 404rpx;
        border-radius: 16rpx;
      }

      .cardbag_card_box-content {
        position: absolute;
        bottom: 0;
        display: flex;
        width: 566rpx;
        text-align: center;
        height: 82rpx;
        background: #ffffff;
        border-radius: 0rpx 0rpx 16rpx 16rpx;

        .cardbag_card_box-content-money {
          width: 260rpx;
          height: 34rpx;
          font-size: 22rpx;
          
          font-weight: 400;
          color: #666666;
          line-height: 75rpx;
        }

        //时间
        .cardbag_card_box-content-time {
          width: 280rpx;
          height: 32rpx;
          font-size: 22rpx;
          
          font-weight: 400;
          color: #a4a4a4;
          line-height: 75rpx;
        }

        // 激活/赠送
        .cardbag_card_box-content-times {
          width: 290rpx;
          font-size: 22rpx;
          
          font-weight: 400;
          color: #a4a4a4;
          display: flex;
          align-items: center;
          justify-content: space-between;

          .cardbag_card_box-content-time-left {
            width: 134rpx;
            height: 50rpx;
            border-radius: 25rpx;
            border: 2rpx solid #c4c4c4;
            line-height: 50rpx;
          }

          .cardbag_card_box-content-time-right {
            width: 134rpx;
            height: 50rpx;
            border-radius: 25rpx;
            border: 2rpx solid #9fcdff;
            line-height: 50rpx;
          }

          .giveColors {
            color: #9fcdff;
          }

          .getColors {
            color: #ffffff;
            background: #9fcdff;
          }
        }
      }
    }

    // 历史卡券
    .mycards_footer {
      width: 80rpx;
      height: 28rpx;
      font-size: 20rpx;
      
      font-weight: 400;
      color: #767676;
      line-height: 28rpx;
      text-shadow: 0rpx 2rpx 6rpx rgba(0, 0, 0, 0.5);
      position: absolute;
      bottom: 20rpx;
      right: 350rpx;
    }

    // 礼品卡使用须知
    .mycards_footer-use {
      text-shadow: 0rpx 2rpx 15rpx rgba(0, 0, 0, 0.5);
      margin: 0 auto;
      display: flex;
      justify-content: space-around;
      width: 360rpx;
      height: 28rpx;
      font-size: 20rpx;
      
      font-weight: 400;
      color: #767676;
      position: absolute;
      bottom: 20rpx;
      left: 195rpx;

      .mycards_footer-use_line {
        background-color: #767676;
        width: 3rpx;
        height: 30rpx;
      }

      .mycards_footer-use_left {
        width: 140rpx;
        height: 28rpx;
        font-size: 20rpx;
        
        font-weight: 400;
        color: #767676;
        line-height: 28rpx;
      }

      .mycards_footer-use_right {
        width: 120rpx;
        height: 28rpx;
        font-size: 20rpx;
        
        font-weight: 400;
        color: #767676;
        line-height: 28rpx;
      }
    }
  }
}
</style>

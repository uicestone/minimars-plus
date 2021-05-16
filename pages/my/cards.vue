<template lang="pug">
view.cardbag
  custom-tabs(:tabs="tabs",:activeIndex.sync="activeIndex",@onselect="selectTab")
  view.cardbag_card(v-show="activeIndex == 0")
    view.cardbag_card_box
      view.img-box.cadbag__img
        img(src="../../static/images/224.jpg", mode="aspectFill")
      view.cardbag_card_box-content
        view.cardbag_card_box-content-money
          | MarsBabe卡 rmb 3800
        view.cardbag_card_box-content-time 2021.5.18到期
    view.mycards_footer 历史卡券
  // 未激活
  view.cardbag_card(v-show="activeIndex == 1")
    view.cardbag_card_box
      view.img-box.cadbag__img
        img(src="../../static/images/224.jpg", mode="aspectFill")
      view.cardbag_card_box-content
        view.cardbag_card_box-content-money
          | Mars圣诞卡
          span ¥ 3800
        view.cardbag_card_box-content-times
          view.cardbag__btn 自用激活
          view.cardbag__btn 赠送好友
    view.cardbag_card_box
      view.img-box.cadbag__img
        img(src="../../static/images/224.jpg", mode="aspectFill")
      view.cardbag_card_box-content
        view.cardbag_card_box-content-money
          | Mars圣诞卡
          span ¥ 3800
        view.cardbag_card_box-content-times
          view.cardbag__btn.cardbag__btn--highlight 待领取
    // 底部，礼品卡使用须知
    view.mycards_footer-use
      view.mycards_footer-use_left(@click="gouseCade()") 礼品卡使用须知
      view.mycards_footer-use_line
      view.mycards_footer-use_right(@click="goRceived()") 卡券收赠记录
</template>

<script>
import customTabs from '../../components/custom-tabs/tabs.vue';
export default {
  data() {
    return {
      tabs: [
        {
          id: 1,
          name: '可使用（1）'
        },
        {
          id: 2,
          name: '未激活（2）'
        },
        {
          id: 3,
          name: '获得更多礼品卡',
          showArrow: true,
          customClick: true
        }
      ],
      activeIndex: 0,
      count: ''
    };
  },
  components: {
    'custom-tabs': customTabs
  },
  methods: {
    selectTab(e) {
      console.log(e);
      if (e.item.id === 3) {
        wx.navigateTo({
          url: '/pages/card/index'
        });
      }
    },
    gouseCade() {
      uni.navigateTo({
        url: '/pages/my/cardRules'
      });
    },
    goRceived() {
      uni.navigateTo({
        url: '/pages/my/cardTransfers'
      });
    }
  }
};
</script>
<style lang="less" scoped>
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
      width: 690rpx;
      box-shadow: 0rpx 4rpx 14rpx 6rpx rgba(222, 221, 221, 0.5);
      border-radius: ;
      margin: 0 auto;
      position: relative;
      margin-top: 30rpx;
      border-radius: var(--theme--border-radius);
      overflow: hidden;

      .cardbag_card_box-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 34rpx 0 40rpx;
        box-sizing: border-box;
        width: 100%;
        height: 90rpx;
        background: #ffffff;
        border-radius: 0rpx 0rpx 16rpx 16rpx;

        .cardbag_card_box-content-money {
          max-width: 50%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          height: 34rpx;
          font-size: var(--theme--font-size-s);
        }

        //时间
        .cardbag_card_box-content-time {
          height: 32rpx;
          font-size: var(--theme--font-size-s);
        }

        // 激活/赠送
        .cardbag_card_box-content-times {
          font-size: 22rpx;
          color: #a4a4a4;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
      }
    }

    // 历史卡券
    .mycards_footer {
      height: 28rpx;
      font-size: var(--theme--font-size-s);
      line-height: 28rpx;
      position: absolute;
      bottom: 20rpx;
      right: 350rpx;
      padding-bottom: env(safe-area-inset-bottom);
      color: var(--theme--font-deputy-color);
    }

    // 礼品卡使用须知
    .mycards_footer-use {
      color: var(--theme--font-deputy-color);
      font-size: var(--theme--font-size-s);
      margin: 0 auto;
      display: flex;
      justify-content: space-around;
      align-items: center;
      height: 28rpx;
      position: absolute;
      bottom: 20rpx;
      left: 195rpx;

      .mycards_footer-use_line {
        background-color: var(--theme--font-deputy-color);
        width: 2rpx;
        height: 20rpx;
        margin: 0 28rpx;
      }

      .mycards_footer-use_left {
        height: 28rpx;
        line-height: 28rpx;
      }

      .mycards_footer-use_right {
        height: 28rpx;
        line-height: 28rpx;
      }
    }
  }
}

.cadbag__img {
  width: 100%;
  height: 232rpx;
}

.cardbag__btn {
  width: 130rpx;
  height: 46rpx;
  text-align: center;
  font-size: var(--theme--font-size-s);
  border: 2rpx solid var(--theme--font-main-color);
  border-radius: var(--theme--border-radius);
  line-height: 46rpx;
  color: var(--theme--font-main-color);
}

.cardbag__btn + .cardbag__btn {
  margin-left: 20rpx;
}

.cardbag__btn--highlight {
  background-color: var(--theme--main-color);
  border-color: var(--theme--main-color);
}
</style>

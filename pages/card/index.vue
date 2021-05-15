<template lang="pug">
view.marsCoupon_box
  view.marsCoupon_header
    view Hi！小刀DAGGER
    view 这是你的卡券。
  view.marsCoupon_contentbox
    view.coupebox_content
      view.menu(v-for="(i, index) in menu", :key="index", @click="goCard(index)")
        view.img-box.menu__bg
          img.image(:src="i.img", mode="aspectFill")
        view.menu__name {{i.name}}
</template>

<script>
export default {
  data() {
    return {
      menu: [
        {
          name: '时效卡',
          img: '../../static/images/index/cardPickerThree.png'
        },
        {
          name: '礼品卡',
          img: '../../static/images/index/cardPickerTwo.png'
        },
        {
          name: '限定卡',
          img: '../../static/images/index/cardPickerOne.png'
        },
        {
          name: '活动套餐',
          img: '../../static/images/index/cardPickerFour.png'
        }
      ]
    };
  },
  methods: {
    goCard(index) {
      console.log('goCard index:', index);
      if (index === 0) {
        uni.navigateTo({
          url: '/pages/card/list?type=times'
        });
      } else if (index === 1) {
        uni.navigateTo({
          url: '/pages/card/list?type=balance'
        });
      } else if (index === 2) {
        uni.navigateTo({
          url: '/pages/card/list?type=period'
        });
      } else if (index === 3) {
        uni.navigateTo({
          url: '/pages/card/list?type=coupon'
        });
      }
    }
  }
};
</script>

<style lang="less" scoped>
.marsCoupon_box {
  width: 750rpx;
  height: 100vh;
  // margin-bottom: 20rpx;
  background-color: #f8f8f8;

  .marsCoupon_header {
    margin: 0 auto;
    width: 638rpx;
    font-size: var(--theme--font-size-l);
    letter-spacing: 2rpx;
    padding-top: 45rpx;
    line-height: 1.5;
  }

  .marsCoupon_contentbox {
    width: 682rpx;
    margin: 60rpx auto 0;

    .coupebox_content {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
    }
  }
}

.menu {
  margin-bottom: 20rpx;
  width: 690rpx;
  height: 232rpx;
  background: var(--theme--bg-main-color);
  box-shadow: 0rpx 4rpx 8rpx 0rpx rgba(195, 195, 195, 0.5);
  border-radius: var(--theme--border-radius);
  position: relative;
  overflow: hidden;
}

.menu::after{
  content:"点击进入 >";
  position: absolute;
  right: 42rpx;
  bottom:34rpx;
  font-size: var(--theme--font-size-m);
}

.menu__bg {
  width: 100%;
  height: 100%;
}

.menu__name {
  font-size: var(--theme--font-size-l);
  position: absolute;
  right: 42rpx;
  top: 46rpx;
}
</style>

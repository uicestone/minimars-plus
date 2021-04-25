<template>
  <view class="marsActivityBox_box">
    <view class="marsActivityBox_title_box">
      <view class="marsActivityBox_title-left">
        选择门店
        <image
          src="../../static/images/index/index_select.png"
          class="marsActivityBox_title-leftimg"
          @click="goDoorname"
        />
      </view>
      <view class="marsActivityBox_title-right">{{ changedoor }}</view>
      <view class="storeNameBox" v-if="doorname == 1">
        <view v-for="(door, index) in doorlist" :key="index" @click="godoor(door)">{{ door.name }}</view>
      </view>
    </view>
    <view class="marsCoupon_contentbox">
      <view class="coupebox_content">
        <view
          class="coupebox_contentimgBox"
          v-for="(item, index) in 7"
          :key="index"
          @click="goDetail"
        >
          <image src="../../static/images/224.jpg" mode="aspectFill" />
          <view class="coupebox_contentimgBox_content">
            <view class="coupebox_contentimgBox_content_title">圣诞树DIY</view>
            <view class="coupebox_contentimgBox_content_data">2020.12.19</view>
            <view class="coupebox_contentimgBox_content_detail">3岁-10岁</view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      doorname: 0,
      changedoor: "",

      doorlist: [
        {
          id: 1,
          name: "杨浦黄兴店",
        },
        {
          id: 2,
          name: "浦东金桥店",
        },
        {
          id: 3,
          name: "静安江宁店",
        },
        {
          id: 4,
          name: "长宁天山店",
        },
      ],
    };
  },
  onShow() {
    console.log(uni.getStorageSync("storeName"));
    if (uni.getStorageSync("storeName")) {
      console.log("有默认门店");
      this.changedoor = uni.getStorageSync("storeName");
    } else {
      this.changedoor = "";
      console.log("没有默认门店");
      // this.ticketOrderPayment.store=uni.getStorageSync("nameId")
    }
    // this.changedoor=uni.getStorageSync("name")
    // uni.getStorageSync("nameId")
  },
  created() {
    console.log(this.doorlist);
  },
  methods: {
    goDetail() {
      uni.navigateTo({
        url: "./eventDetail",
      });
    },
    goDoorname() {
      if (this.doorname == 1) {
        this.doorname = 0;
      } else {
        this.doorname = 1;
      }
    },
    godoor(door) {
      // console.log(door.name)
      this.changedoor = door.name;
    },
  },
};
</script>

<style lang="less">
.marsActivityBox_box {
  width: 750rpx;
  min-height: 100vh;
  background: #f8f8f8;

  .marsActivityBox_title_box {
    width: 750rpx;
    height: 80rpx;
    background: #ffffff;
    display: flex;
    position: relative;

    .marsActivityBox_title-left {
      margin-left: 35rpx;
      margin-top: 15rpx;
      display: flex;
      align-items: center;
      width: 180rpx;
      height: 42rpx;
      font-size: 30rpx;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #676767;
      line-height: 42rpx;

      .marsActivityBox_title-leftimg {
        width: 42rpx;
        height: 52rpx;
        margin-left: 10rpx;
      }
    }

    .marsActivityBox_title-right {
      border-bottom: 6rpx solid #9fcdff;
      margin-top: 15rpx;
      // width: 530rpx;
      height: 42rpx;
      font-size: 30rpx;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #0d0d0d;
      line-height: 42rpx;
      border-radius: 6rpx;
    }
    // 门店名称
    .storeNameBox {
      position: absolute;
      left: 33rpx;
      top: 80rpx;
      width: 338rpx;
      min-height: 275rpx;
      background: #ffffff;
      border-radius: 20rpx 20rpx 30rpx 30rpx;
      z-index: 1;
      line-height: 68rpx;
      text-align: center;

      view {
        border-bottom: 1rpx solid #f1f0f4;
        width: 280rpx;
        margin: 0 auto;
      }
    }
  }

  .marsCoupon_contentbox {
    width: 682rpx;
    margin: 20rpx auto;

    .coupebox_content {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;

      .coupebox_contentimgBox {
        margin: 20rpx 0;
        width: 320rpx;
        height: 360rpx;
        border-radius: 20rpx;
        position: relative;

        image {
          width: 320rpx;
          height: 360rpx;
          border-radius: 20rpx;
        }

        .coupebox_contentimgBox_content {
          position: absolute;
          bottom: 0;
          width: 320rpx;
          height: 110rpx;
          background: rgba(0, 0, 0, 0.5);
          border-radius: 0px 0px 20px 20px;
          color: #fff;
          text-align: center;
          border-radius: 0 0 20rpx 20rpx;

          .coupebox_contentimgBox_content_title {
            margin-top: 5rpx;
          }

          .coupebox_contentimgBox_content_title,
          .coupebox_contentimgBox_content_data {
            font-size: 24rpx;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #ffffff;
          }

          .coupebox_contentimgBox_content_detail {
            font-size: 20rpx;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #ffffff;
          }
        }
      }
    }
  }
}
</style>

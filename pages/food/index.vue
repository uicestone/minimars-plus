<template>
  <view class="orderFood_box">
    <view class="orderFood_left">
      <scroll-view scroll-y="true" class="orderFood_left_scroll" show-scrollbar="true">
        <view
          v-for="(item, index) in tabBars"
          :key="index"
          @click="setid(item.uid)"
          :class="item.uid == change ? 'active' : ''"
          class="orderFood_left_title"
        >
          <span>{{ item.name }}</span>
        </view>
      </scroll-view>
    </view>
    <view class="orderFood_right">
      <!-- 轮播 -->
      <view class="orderFood_right_banner">
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
            <image class="swiper_item" :src="item.posterUrl" mode="aspectFill" />
          </swiper-item>
        </swiper>
      </view>

      <!-- 特色推荐 -->
      <view class="orderFood_right_content_box">
        <scroll-view
          class="orderFood_right_content_scroll"
          :scroll-y="true"
          :scroll-into-view="clickId"
          @scroll="asideScroll"
          @scrolltolower="scrolltolower"
          @scrolltoupper="scrolltoupper"
        >
          <!--   :lower-threshold="200" :upper-threshold="200" :scroll-with-animation="true" -->
          <view class="orderFood_right_content">
            <view v-for="(item, index) in tabBars" :key="index" :id="'po' + item.uid">
              <text class="name orderFood_right_title">{{ item.name }}</text>
              <view
                v-for="(item2, index2) in item.products"
                :key="index2"
                class="orderFood_right_title_content"
              >
                <view
                  class="orderFood_right_title_content-left"
                  @click="open(index, index2, item2)"
                >
                  <image :src="item2.imageUrl" />
                </view>
                <view class="orderFood_right_title_content-right">
                  <view class="right_title_content-right-title">{{ item2.name }}</view>
                  <view
                    class="right_title_content-right-detail"
                    @click="open(index, index2, item2)"
                  >{{ item2.description }}</view>
                  <view class="right_title_content-right-money_box">
                    <view class="right_title_content-right-money_box_money">
                      ￥
                      <span>{{ item2.buyPrice }}</span>
                    </view>
                    <view class="right_title_content-right-money_box_add" v-if="item2.numbers == 0">
                      <view></view>
                      <view></view>
                      <view @click="foodAdd(item2)">
                        <image src="../../static/images/add.png" class="foodAdd_img" />
                      </view>
                    </view>
                    <view class="right_title_content-right-money_box_add" v-if="item2.numbers > 0">
                      <view @click="foodreduce(item2)">
                        <image src="../../static/images/minus.png" class="foodreduce_img" />
                      </view>
                      <view>{{ item2.numbers }}</view>
                      <view @click="foodAdd(item2)">
                        <image src="../../static/images/add.png" class="foodAdd_img" />
                      </view>
                    </view>
                  </view>
                </view>
              </view>
            </view>
          </view>
        </scroll-view>

        <!-- 详情 -->
        <uni-popup ref="popup" type="center" :tabbar="true">
          <view class="gift_box">
            <view class="gift_box_top">
              <image :src="item.imageUrl" mode="aspectFill" />
              <view class="gift_box_top-close">
                <image
                  class="gift_box_clear_right"
                  src="../../static/images/clear.png"
                  @click="close()"
                />
              </view>
            </view>
            <view class="gift_box_top_content">
              <view class="gift_box_top_content-title">{{ item.name }}</view>
              <view class="gift_box_top_content-box">{{ item.description }}</view>
            </view>
            <view class="gift_box_top_footer">
              <view class="gift_box_top_footer-left">
                ￥
                <span>{{ item.buyPrice }}</span>
              </view>
              <view class="gift_box_top_footer-right" @click="unpopAdd(index)">
                <image src="../../static/images/add.png" />
              </view>
            </view>
          </view>
        </uni-popup>
        <!-- 加购选择 -->
        <view class="orderFood_choose" v-if="settlement == 1">
          <view class="orderFood_choose-left">
            <image
              src="../../static/images/orderFood/shopcar.png"
              class="orderFood_choose-left_img"
            />
            <view class="orderFood_choose-left-line"></view>
            <view class="orderFood_choose-left_money">
              ￥
              <span>{{ playMoney }}</span>
            </view>
          </view>
          <view class="orderFood_choose-right" @click="goChoose()">
            <view class="orderFood_choose-right-choose">选好了</view>
            <image src="../../static/images/orderFood/white_right.png" />
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import uniPopup from "@/components/uni-popup/uni-popup.vue";
import foodMenu from "@/components/food-menu.vue";
export default {
  components: {
    uniPopup,
    foodMenu,
  },
  data() {
    return {
      // 购物车价钱
      playMoney: 0,
      change: 0,
      swiperHeight: 0,
      menuWidth: 0,
      foodWidth: 0,
      tabIndexShow: 0,
      tabIndex: 0,
      swiperImg: [],
      current: 0,
      swiperCurrent: 0,
      // 购物车显示隐藏
      settlement: 0,
      tabBars: [],
      clickId: "",
      change: 0,
      topList: [],
      isLeftClick: false,
      // 弹框得到索引
      unpooIndex: "",
      unpooIndex2: "",
      item: {},
      storeId: "",
      tableId: "",
    };
  },
  onLoad(option) {
    console.log("food/index:onLoad",option)
    this.getmenu();
    this.getbanner();
  },
  methods: {
    getmenu() {
      this.$axios
        .getRequest("/store-menu", {
          qr: uni.getStorageSync("qrCodeRes"),
        })
        .then((result) => {
          result.menu.forEach((i) => {
            i.products.forEach((j) => {
              j.numbers = 0;
            });
          });
          this.tabBars = result.menu;
          this.tableId = result.tableId;
          this.storeId = result.store.id;
        });
    },
    getbanner() {
      this.$axios
        .getRequest("/post", {
          tag: "food",
        })
        .then((res) => {
          this.swiperImg = res;
        });
    },
    // 轮播
    changeSwiper(e) {
      this.swiperCurrent = e.detail.current;
    },
    // 弹框打开,关闭
    open(index, index2, item) {
      this.item = item;
      this.unpooIndex = index;
      this.unpooIndex2 = index2;
      this.$refs.popup.open();
      wx.hideTabBar();
    },
    close() {
      this.$refs.popup.close();
      wx.showTabBar();
    },
    // 弹框加
    unpopAdd() {
      this.tabBars.forEach((item, k) => {
        if (k == this.unpooIndex) {
          item.products.forEach((j, l) => {
            if (l == this.unpooIndex2) {
              j.numbers++;
            }
          });
        }
      });
      this.settlement = 1;
      //总价格
      this.playMoney = 0;
      this.tabBars.forEach((item) => {
        item.products.forEach((j) => {
          this.playMoney += j.numbers * j.buyPrice;
        });
      });
      this.$refs.popup.close();
      wx.showTabBar();
    },
    // 购物车数量加减
    foodreduce(item2) {
      item2.numbers--;
      this.playMoney = this.playMoney - item2.buyPrice;
      if (this.playMoney == 0) {
        this.settlement = 0;
      }
    },
    foodAdd(item2) {
      for (let i = 0; i < this.tabBars.length; i++) {
        for (let j = 0; j < this.tabBars[i].products.length; j++) {
          if (item2.numbers == 0) {
            this.settlement = 1;
            break;
          }
        }
      }
      //count
      item2.numbers++;
      //总价格
      this.playMoney = 0;
      this.tabBars.forEach((item) => {
        item.products.forEach((j) => {
          this.playMoney += j.numbers * j.buyPrice;
        });
      });
    },

    goChoose() {
      let selectshop = []; //选中的餐品
      this.tabBars.forEach((item) => {
        item.products.forEach((items) => {
          if (items.numbers > 0) {
            selectshop.push(items);
          }
        });
      });
      console.log(selectshop);
      uni.navigateTo({
        url:
          "/pages/orderFood/foodChooseBuy?selectshop=" +
          JSON.stringify(selectshop) +
          "&tableId=" +
          this.tableId +
          "&storeId=" +
          this.storeId,
      });
    },
    // 鼠标点击
    setid(index) {
      this.clickId = "po" + index;
      this.change = index;
      this.isLeftClick = true;
    },

    // 滚动到底部
    scrolltolower() {
      this.change = this.tabBars[this.tabBars.length - 1].uid;
    },
    // 滚动到顶部
    scrolltoupper() {
      this.change = this.tabBars[0].uid;
    },
    //右侧栏滚动
    asideScroll(e) {
      if (!this.isLeftClick) {
        this.calcSize();
      }
      let scrollTop = e.detail.scrollTop;
      let tabs = this.tabBars.filter((item) => item.top <= scrollTop).reverse();
      if (tabs.length > 0) {
        this.change = tabs[0].uid;
      }
    },
    //计算右侧栏每个tab的高度等信息
    calcSize() {
      let h = 0;
      this.tabBars.forEach((item) => {
        let view = uni.createSelectorQuery().select("#po" + item.uid);
        view
          .fields(
            {
              size: true,
            },
            (data) => {
              item.top = h;
              h += data.height;
              item.bottom = h;
            }
          )
          .exec();
      });
      this.isLeftClick = true;
    },
  },
};
</script>

<style lang="less">
.orderFood_box {
  display: flex;

  .orderFood_left {
    width: 132rpx;
    // background: #FFFFFF;
    background: #f7f7f7;
    height: 100vh;

    .orderFood_left_scroll {
      height: 100vh;

      .active {
        background-color: #ffffff;
      }

      .orderFood_left_title {
        width: 132rpx;
        height: 68rpx;
        border-bottom: 1px solid #d1d1d1;
        text-align: center;
        padding-top: 10rpx 0 10rpx 0;
        line-height: 25rpx;
        padding-top: 25rpx;

        span {
          width: 132rpx;
          height: 60rpx;
          font-size: 20rpx;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #555555;
          white-space: wrap;
        }
      }
    }
  }

  // 右边
  .orderFood_right {
    width: 620rpx;
    // height: 100vh;

    // 轮播
    .orderFood_right_banner {
      width: 554rpx;
      // height: 256rpx;
      height: 22.5vh;
      background: #f0f0f0;
      border-radius: 20rpx;
      margin: 5rpx auto;

      .swiper {
        width: 554rpx;
        // height: 256rpx;
        height: 22.5vh;
        border-radius: 20rpx;

        .swiper_item {
          width: 554rpx;
          // height: 256rpx;
          height: 22.5vh;
          border-radius: 20rpx;

          image {
            width: 554rpx;
            height: 256rpx;
            // border-radius: 20rpx;
          }
        }
      }
    }

    .orderFood_right_content_box {
      width: 554rpx;
      height: 75vh;
      // height: 77vh;
      margin: 10rpx auto;
      // margin: 0 auto;
      margin-top: 10rpx;

      .orderFood_right_content_scroll {
        // height: 76.5vh;
        height: 75vh;

        .orderFood_right_content {
          margin-top: 20rpx;
          padding-bottom: 90rpx;

          .name {
            font-family: PingFangSC-Medium, PingFang SC;
            color: #0d0d0d;
            line-height: 34rpx;
            margin: 40rpx 0;
            width: 400rpx;
            height: 34rpx;
            line-height: 34rpx;
            font-size: 24rpx;
            font-family: PingFangSC-Medium, PingFang SC;
            color: #0d0d0d;
          }

          .orderFood_right_title_content {
            display: flex;
            justify-content: space-between;
            margin-bottom: 20rpx;
            margin-top: 20rpx;

            .orderFood_right_title_content-left {
              width: 160rpx;
              height: 160rpx;
              border-radius: 20rpx;

              image {
                width: 160rpx;
                height: 160rpx;
                border-radius: 20rpx;
              }
            }

            .orderFood_right_title_content-right {
              width: 360rpx;

              .right_title_content-right-title {
                width: 100%;
                height: 36rpx;
                font-size: 26rpx;
                font-family: PingFangSC-Semibold, PingFang SC;
                font-weight: 600;
                color: #222222;
                line-height: 36rpx;
                margin-bottom: 5rpx;
              }

              .right_title_content-right-detail {
                width: 360rpx;
                height: 56rpx;
                font-size: 20rpx;
                font-family: PingFangSC-Medium, PingFang SC;
                font-weight: 500;
                color: #bdbdbd;
                line-height: 28rpx;
              }

              .right_title_content-right-money_box {
                width: 360rpx;
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-top: 30rpx;

                .right_title_content-right-money_box_money {
                  width: 74rpx;
                  height: 42rpx;
                  font-size: 18rpx;
                  font-family: PingFangSC-Medium, PingFang SC;
                  font-weight: 550;
                  color: #222222;
                  // line-height: 26rpx;

                  span {
                    font-size: 30rpx;
                    color: #222222;
                  }
                }

                .right_title_content-right-money_box_add {
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                  width: 120rpx;
                  height: 40rpx;
                  line-height: 26rpx;

                  .foodreduce_img {
                    width: 37rpx;
                    height: 37rpx;
                  }

                  .foodAdd_img {
                    width: 40rpx;
                    height: 40rpx;
                  }
                }
              }
            }
          }
        }
      }

      // 食物详情弹框
      .gift_box {
        width: 640rpx;
        height: 952rpx;
        background: #ffffff;
        border-radius: 20rpx;

        .gift_box_top {
          position: relative;

          image {
            width: 640rpx;
            height: 640rpx;
            border-radius: 20rpx;
          }

          .gift_box_top-close {
            position: absolute;
            top: 10rpx;
            right: 30rpx;

            image {
              width: 40rpx;
              height: 40rpx;
              background: #666666;
              opacity: 0.8;
            }
          }
        }

        .gift_box_top_content {
          margin-left: 25rpx;

          .gift_box_top_content-title {
            width: 100%;
            height: 36rpx;
            font-size: 26rpx;
            font-family: PingFangSC-Semibold, PingFang SC;
            font-weight: 600;
            color: #222222;
            line-height: 36rpx;
            margin: 15rpx 0 10rpx 0;
          }

          .gift_box_top_content-box {
            width: 360rpx;
            height: 56rpx;
            font-size: 20rpx;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
            color: #bdbdbd;
            line-height: 28rpx;
          }
        }

        .gift_box_top_footer {
          margin-top: 95rpx;
          width: 640rpx;
          height: 90rpx;
          background: #f7f7f7;
          border-radius: 20rpx;
          display: flex;
          justify-content: space-between;
          align-items: center;

          .gift_box_top_footer-left {
            width: 88rpx;
            height: 50rpx;
            font-size: 22rpx;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
            color: #9fcdff;
            line-height: 65rpx;
            margin-left: 10rpx;

            span {
              font-size: 30rpx;
            }
          }

          .gift_box_top_footer-right {
            margin-right: 10rpx;
            margin-top: 30rpx;

            image {
              width: 40rpx;
              height: 40rpx;
            }
          }
        }
      }
    }
  }

  // 选择商品
  .orderFood_choose {
    z-index: 1;
    position: fixed;
    bottom: 0;
    right: 70rpx;
    width: 600rpx;
    height: 114rpx;
    background: #9fcdff;
    box-shadow: 0px 4rpx 4rpx 2rpx rgba(0, 0, 0, 0.05);
    border-radius: 57rpx;
    display: flex;
    justify-content: space-between;

    .orderFood_choose-left {
      width: 140rpx;
      margin-left: 15rpx;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .orderFood_choose-left_img {
        width: 40rpx;
        height: 40rpx;
        z-index: 1;
      }

      .orderFood_choose-left-line {
        width: 4rpx;
        height: 38rpx;
        background-color: #ffffff;
      }

      .orderFood_choose-left_money {
        width: 74rpx;
        height: 42rpx;
        font-size: 18rpx;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #ffffff;
        line-height: 45rpx;

        span {
          font-size: 25rpx;
        }
      }
    }

    .orderFood_choose-right {
      display: flex;
      align-items: center;
      margin-right: 15rpx;
      width: 120rpx;
      justify-content: space-around;

      .orderFood_choose-right-choose {
        width: 90rpx;
        height: 42rpx;
        font-size: 30rpx;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #ffffff;
        line-height: 42rpx;
      }

      image {
        width: 17rpx;
        height: 18rpx;
      }
    }
  }
}
</style>

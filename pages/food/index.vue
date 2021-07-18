<template lang="pug">
view.orderFood_box
  view.orderFood_left
    scroll-view.orderFood_left_scroll(scroll-y="true", show-scrollbar="true")
      view.orderFood_left_title(
        v-for="(category, index) in categories",
        :key="category.uid",
        v-if="category.products.some((p) => p.stock > 0 && p.sellPrice > 0)",
        @click="scrollToCategory(category.uid)",
        :class="category.uid === change ? 'active' : ''"
      )
        span {{ category.name }}
  view.orderFood_right
    // 轮播
    view.orderFood_right_banner
      swiper.swiper(
        :autoplay="swiperAutoplay",
        :interval="3000",
        :duration="1000",
        :current="swiperCurrent",
        indicator-dots="true",
        circular="true",
        indicator-color="#B9B9B9",
        indicator-active-color="#9B9B9B"
      )
        swiper-item(v-for="item in bannerPosts", :key="item.id")
          img.swiper_item(:src="item.posterUrl", mode="aspectFill")
    view.orderFood_right_content_box
      scroll-view.orderFood_right_content_scroll(
        :scroll-y="true",
        :scroll-into-view="clickId",
        @scroll="asideScroll",
        @scrolltolower="scrolltolower",
        @scrolltoupper="scrolltoupper"
      )
        // :lower-threshold="200" :upper-threshold="200" :scroll-with-animation="true"
        view.orderFood_right_content
          view(
            v-for="category in categories",
            :key="category.uid",
            v-if="category.products.some((p) => p.stock > 0 && p.sellPrice > 0)",
            :id="'po' + category.uid"
          )
            text.name.orderFood_right_title {{ category.name }}
            view.orderFood_right_title_content(
              v-for="product in category.products",
              :key="product.uid",
              v-if="product.stock > 0 && product.sellPrice > 0"
            )
              view.orderFood_right_title_content-left(@click="open(product)")
                img(:src="product.imageUrl")
              view.orderFood_right_title_content-right
                view.right_title_content-right-title {{ product.name }}
                view.right_title_content-right-detail(@click="open(product)") {{ product.description }}
                view.right_title_content-right-money_box
                  view.right_title_content-right-money_box_money
                    | rmb {{ product.sellPrice }}
                  view.right_title_content-right-money_box_add(
                    v-if="!getCartItem(product)"
                  )
                    view
                    view
                    view(@click="foodAdd(product)")
                      img.foodAdd_img(src="../../static/images/add_deputy.png")
                  view.right_title_content-right-money_box_add(v-else)
                    view(@click="foodReduce(product)")
                      img.foodreduce_img(
                        src="../../static/images/minus_deputy.png"
                      )
                    view {{ getCartItem(product).numbers }}
                    view(@click="foodAdd(product)")
                      img.foodAdd_img(src="../../static/images/add_deputy.png")
      // 详情
      uni-popup(ref="popup", type="center", :tabbar="true")
        view.gift_box(v-if="popupProduct")
          view.gift_box_top
            img(:src="popupProduct.imageUrl", mode="aspectFill")
            view.gift_box_top-close
              img.gift_box_clear_right(
                src="../../static/images/clear.png",
                @click="close()"
              )
          view.gift_box_top_content
            view.gift_box_top_content-title {{ popupProduct.name }}
            view.gift_box_top_content-box {{ popupProduct.description }}
          view.gift_box_top_footer
            view.gift_box_top_footer-left
              | rmb {{ popupProduct.sellPrice }}
            view.img-box.gift_box_top_footer-right(@click="addInPopup(index)")
              img(src="../../static/images/add_deputy.png")
      // 加购选择
      view.orderFood_choose(v-if="foodCart.length > 0")
        view.orderFood_choose-left
          view.img-box.orderFood_choose-left_img
            img(src="../../static/images/orderFood/food-cart.png")
            view.cart__num {{ goodsSum }}
          view.orderFood_choose-left-line
          view.orderFood_choose-left_money
            | rmb {{ totalPrice }}
        view.orderFood_choose-right(@click="goOrder")
          view.orderFood_choose-right-choose 选好了
          img(src="../../static/images/orderFood/white_right.png")
</template>

<script>
import uniPopup from "@/components/uni-popup/uni-popup.vue";
import foodMenu from "@/components/food-menu.vue";
import { sync } from "vuex-pathify";

export default {
  components: {
    uniPopup,
    foodMenu,
  },
  data() {
    return {
      isScanning: false,
      swiperAutoplay: true,
      bannerPosts: [],
      categories: [],
      clickId: "",
      change: 0,
      isLeftClick: false,
      // 弹框得到索引
      popupProduct: null,
      storeCode: "",
      storeId: "",
      tableId: "",
    };
  },
  computed: {
    foodCart: sync("booking/foodCart"),
    // 商品总数
    goodsSum() {
      return this.foodCart.reduce((sum, item) => sum + item.numbers, 0);
    },
    totalPrice() {
      return this.foodCart.reduce(
        (total, item) => +(total + item.sellPrice * item.numbers).toFixed(10),
        0
      );
    },
  },
  onLoad(option) {
    console.log("food/index:onLoad", option);
    this.getBanner();
    if (option.s && option.t) {
      this.storeCode = option.s;
      this.tableId = option.t;
    }
  },
  async onShow() {
    console.log("food/index:onShow");
    if (this.isScanning) return;
    try {
      if (!this.storeCode || !this.tableId) {
        await this.scanTableCode();
      }
      if (!this.categories.length) {
        uni.showLoading();
        await this.getMenu();
        this.change = this.categories[0].uid;
        uni.hideLoading();
      }
    } catch (e) {
      uni.showToast({ title: e, icon: "none" });
    }
  },
  onHide() {
    this.swiperAutoplay = false;
  },
  methods: {
    scanTableCode() {
      this.isScanning = true;
      return new Promise((resolve, reject) => {
        uni.scanCode({
          success: (res) => {
            this.isScanning = false;
            // console.log(res.scanType, res.path, res.result);
            if (res.path) {
              const [, s, t] = res.path.match(/s=(.*)&t=(.*)/);
              console.log(s, t);
              if (!s || !t) {
                return reject("无效点餐二维码");
              }
              this.storeCode = s;
              this.tableId = t;
              resolve();
            } else {
              reject("无效点餐二维码");
            }
          },
          fail: (res) => {
            this.isScanning = false;
            reject("扫码失败");
            uni.switchTab({
              url: "../index/index",
            });
          },
        });
      });
    },
    async getMenu() {
      const storeMenu = await this.$axios.getRequest("/store-menu", {
        storeCode: this.storeCode,
        tableId: this.tableId,
      });
      storeMenu.menu.forEach((i) => {
        i.products.forEach((j) => {
          j.numbers = 0;
        });
      });
      this.categories = storeMenu.menu;
      this.storeId = storeMenu.store.id;
    },
    async getBanner() {
      this.bannerPosts = await this.$axios.getRequest("/post", {
        tag: "food",
      });
    },
    // 轮播
    changeSwiper(e) {
      this.swiperCurrent = e.detail.current;
    },
    // 弹框打开,关闭
    open(product) {
      this.popupProduct = product;
      this.$refs.popup.open();
      wx.hideTabBar();
    },
    close() {
      this.popupProduct = null;
      this.$refs.popup.close();
      wx.showTabBar();
    },
    // 弹框加
    addInPopup() {
      this.foodAdd(this.popupProduct);
      this.close();
    },
    getCartItem(product) {
      return this.foodCart.find((item) => item.uid === product.uid);
    },
    // 购物车数量加减
    foodReduce(product) {
      const itemInCart = this.foodCart.find((item) => item.uid === product.uid);
      if (itemInCart) {
        itemInCart.numbers--;
        if (itemInCart.numbers <= 0) {
          this.foodCart = this.foodCart.filter(
            (item) => item.uid !== product.uid
          );
        }
      }
    },
    foodAdd(product) {
      const itemInCart = this.foodCart.find((item) => item.uid === product.uid);
      if (itemInCart) {
        itemInCart.numbers++;
      } else {
        this.foodCart.push({ ...product, numbers: 1 });
      }
    },
    goOrder() {
      uni.navigateTo({
        url:
          "./order?" + "tableId=" + this.tableId + "&storeId=" + this.storeId,
      });
    },
    // 鼠标点击
    scrollToCategory(catUid) {
      this.clickId = "po" + catUid;
      this.change = catUid;
      this.isLeftClick = true;
    },

    // 滚动到底部
    scrolltolower() {
      this.change = this.categories[this.categories.length - 1].uid;
    },
    // 滚动到顶部
    scrolltoupper() {
      this.change = this.categories[0].uid;
    },
    //右侧栏滚动
    asideScroll(e) {
      if (!this.isLeftClick) {
        this.calcSize();
      }
      let scrollTop = e.detail.scrollTop;
      let tabs = this.categories
        .filter((item) => item.top <= scrollTop)
        .reverse();
      if (tabs.length > 0) {
        this.change = tabs[0].uid;
      }
    },
    //计算右侧栏每个tab的高度等信息
    calcSize() {
      let h = 0;
      this.categories.forEach((item) => {
        let view = uni.createSelectorQuery().select("#po" + item.uid);
        view
          .fields(
            {
              size: true,
            },
            (data) => {
              if (!data) return;
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

<style lang="less" scoped>
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

        &::before {
          content: "";
          width: 7rpx;
          height: 100%;
          background-color: #9fcdff;
          position: absolute;
          left: 0;
          top: 0;
        }

        &::after {
          display: none;
        }
      }

      .orderFood_left_title {
        height: 100rpx;
        line-height: 25rpx;
        margin: 0 auto;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0 20rpx;
        position: relative;

        span {
          font-size: var(--theme--font-size-s);
          font-weight: var(--theme--font-weight-light);
          white-space: wrap;
        }

        &::after {
          content: "";
          width: 90rpx;
          left: 50%;
          transform: translateX(-50%);
          bottom: 0;
          height: 2rpx;
          background-color: #d1d1d1;
          position: absolute;
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
      width: 100%;
      height: 270rpx;
      background: #f0f0f0;

      .swiper {
        width: 100%;
        height: 100%;
        border-radius: var(--theme--border-radius);

        .swiper_item {
          width: 100%;
          height: 100%;
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
      height: calc(100vh - 270rpx);
      margin: 0 auto;

      .orderFood_right_content_scroll {
        height: 100%;

        .orderFood_right_content {
          margin-top: 20rpx;
          padding-bottom: 90rpx;

          .name {
            margin: 40rpx 0;
            display: block;
            font-size: var(--theme--font-size-s);
            color: var(--theme--font-main-color);
          }

          .orderFood_right_title_content {
            display: flex;
            justify-content: space-between;
            margin-bottom: 20rpx;
            margin-top: 20rpx;
            min-height: 168rpx;
            position: relative;

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
              position: relative;
              min-height: 175rpx;
              .right_title_content-right-title {
                width: 100%;
                height: 36rpx;
                font-size: var(--theme--font-size-m);
                line-height: 36rpx;
                margin-bottom: 5rpx;
              }

              .right_title_content-right-detail {
                width: 360rpx;
                height: 56rpx;
                font-size: var(--theme--font-size-s);
                color: var(--theme--font-deputy-color);
                font-weight: var(--theme--font-weight-light);
                line-height: 28rpx;
                overflow: hidden;
              }

              .right_title_content-right-money_box {
                width: 360rpx;
                display: flex;
                justify-content: space-between;
                align-items: center;
                // margin-top: 30rpx;
                position: absolute;
                bottom: 0;
                .right_title_content-right-money_box_money {
                  height: 42rpx;
                  font-size: var(--theme--font-size-m);
                }

                .right_title_content-right-money_box_add {
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                  width: 120rpx;
                  height: 40rpx;
                  line-height: 26rpx;
                  font-size: var(--theme--font-size-m);

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
        border-radius: var(--theme--border-radius);

        .gift_box_top {
          position: relative;

          image {
            width: 640rpx;
            height: 640rpx;
            border-radius: 20rpx;
          }

          .gift_box_top-close {
            position: absolute;
            top: 36rpx;
            right: 36rpx;

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
            font-size: var(--theme--font-size-m);
            color: var(--theme--font-main-color);
            line-height: 36rpx;
            margin: 15rpx 0 10rpx 0;
          }

          .gift_box_top_content-box {
            height: 56rpx;
            font-size: var(--theme--font-size-s);
            color: var(--theme--font-main-color);
            line-height: 42rpx;
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
          padding: 0 34rpx;
          box-sizing: border-box;

          .gift_box_top_footer-left {
            font-size: var(--theme--font-size-m);
          }

          .gift_box_top_footer-right {
            width: 40rpx;
            height: 40rpx;
          }
        }
      }
    }
  }

  // 选择商品
  .orderFood_choose {
    z-index: 1;
    position: fixed;
    bottom: 20rpx;
    width: 594rpx;
    height: 102rpx;
    background: var(--theme--deputy-color);
    box-shadow: var(--theme--box-shadow);
    border-radius: var(--theme--border-radius);
    left: 50%;
    transform: translateX(-50%);
    padding: 0 36rpx;
    display: flex;
    justify-content: space-between;

    .orderFood_choose-left {
      display: flex;
      align-items: center;
      justify-content: space-between;

      .orderFood_choose-left_img {
        width: 40rpx;
        height: 40rpx;
        z-index: 1;
        margin-right: 30rpx;
        overflow: visible;

        .cart__num {
          display: block;
          width: 20rpx;
          height: 20rpx;
          background-color: #646a6d;
          font-size: 14rpx;
          line-height: 20rpx;
          text-align: center;
          color: white;
          position: absolute;
          z-index: 1;
          right: -10rpx;
          top: -4rpx;
          border-radius: 50%;
        }
      }

      .orderFood_choose-left-line {
        width: 2rpx;
        height: 32rpx;
        background-color: #ffffff;
      }

      .orderFood_choose-left_money {
        height: 42rpx;
        font-size: var(--theme--font-size-m);
        color: #ffffff;
        line-height: 45rpx;
        margin-left: 26rpx;
      }
    }

    .orderFood_choose-right {
      display: flex;
      align-items: center;
      margin-right: 15rpx;
      justify-content: space-around;

      .orderFood_choose-right-choose {
        height: 42rpx;
        font-size: var(--theme--font-size-m);
        color: #ffffff;
        line-height: 42rpx;
        margin-right: 11rpx;
      }

      image {
        width: 17rpx;
        height: 18rpx;
      }
    }
  }
}
</style>

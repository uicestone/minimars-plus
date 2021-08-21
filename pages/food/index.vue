<template lang="pug">
view.orderFood_box
  view.left
    scroll-view.scroll(scroll-y, enhanced, :show-scrollbar="false")
      view.title(
        v-for="(category, index) in categories",
        :key="category.uid",
        v-if="category.products.some((p) => p.stock > 0 && p.sellPrice > 0)",
        @click="scrollToCategory(category.uid)",
        :class="category.uid === change ? 'active' : ''"
      )
        span {{ category.name }}
        span.num(v-if="getCatCartNum(category)") {{ getCatCartNum(category) }}

  view.right
    // 轮播
    view.banner
      swiper.swiper(
        :autoplay="swiperAutoplay",
        :interval="3000",
        :duration="500",
        :current="swiperCurrent",
        indicator-dots="true",
        circular="true",
        indicator-color="#B9B9B9",
        indicator-active-color="#9B9B9B"
      )
        swiper-item(
          v-for="item in bannerPosts",
          :key="item.id",
          @click="bannerClick(item)"
        )
          img.item(:src="item.posterUrl", mode="aspectFill")
    view.content-box
      scroll-view.scroll(
        scroll-y,
        enhanced,
        :show-scrollbar="false",
        :scroll-into-view="clickId",
        @scroll="asideScroll",
        @scrolltolower="scrolltolower",
        @scrolltoupper="scrolltoupper"
      )
        // :lower-threshold="200" :upper-threshold="200" :scroll-with-animation="true"
        view.content
          view(
            v-for="category in categories",
            :key="category.uid",
            v-if="category.products.some((p) => p.stock > 0 && p.sellPrice > 0)",
            :id="'c' + category.uid"
          )
            text.name {{ category.name }}
            view.food-item(
              v-for="product in category.products",
              :key="product.uid",
              v-if="product.stock > 0 && product.sellPrice > 0",
              :id="'p' + product.uid"
            )
              view.tags(v-if="product.tags && product.tags.length")
                view.tag(v-for="tag in product.tags", :key="tag") {{ tag }}
              view.left(@click="open(product)")
                img(:src="product.imageUrl", mode="aspectFill")
              view.right
                view.title {{ product.name }}
                view.detail(@click="open(product)") {{ product.description }}
                view.money-box
                  view.money
                    | rmb {{ product.sellPrice }}
                  view.add(v-if="!getCartItem(product)")
                    view
                    view
                    view(@click="foodAdd(product)")
                      img.foodAdd-img(src="../../static/images/add_deputy.png")
                  view.add(v-else)
                    view(@click="foodReduce(product)")
                      img.foodreduce-img(
                        src="../../static/images/minus_deputy.png"
                      )
                    view {{ getCartItem(product).numbers }}
                    view(@click="foodAdd(product)")
                      img.foodAdd-img(src="../../static/images/add_deputy.png")
  // 详情
  uni-popup(ref="popup", type="center", :tabbar="true")
    scroll-view.detail-popup(v-if="popupProduct", scroll-y)
      view.top
        img(:src="popupProduct.imageUrl", mode="aspectFill")
        view.close
          img(src="../../static/images/clear.png", @click="close()")
      view.content
        view.title {{ popupProduct.name }}
        view.box {{ popupProduct.description }}
      view.flavors
        view.group(
          v-for="group in popupProduct.flavorGroups",
          :key="group.uid"
        )
          text.name {{ group.name }}
            text(v-if="group.required") *
            text(v-if="group.multiple") （多选）
            text ：
          text.flavor(
            v-for="flavor in group.flavors",
            :key="flavor.uid",
            @click="chooseFlavor(popupProduct, group, flavor)",
            :class="{ selected: isFlavorChosen(popupProduct, group, flavor) }"
          ) {{ flavor.name }}
      view.footer
        view.left
          | rmb {{ (popupProduct.sellPrice + getFlavorExtraPrice(popupProduct)) | round(2) }}
        view.img-box.right(
          @click="addInPopup(index)",
          :class="{ disabled: !isFlavorValid(popupProduct) }"
        )
          img(src="../../static/images/add_deputy.png")
  // 加购选择
  view.orderFood_choose(v-if="foodCart.length > 0", @click="goOrder")
    view.orderFood_choose-left
      view.img-box.orderFood_choose-left_img
        img(src="../../static/images/orderFood/food-cart.png")
        view.cart__num {{ goodsSum }}
      view.orderFood_choose-left-line
      view.orderFood_choose-left_money
        | rmb {{ totalPrice }}
    view.orderFood_choose-right
      view.orderFood_choose-right-choose 选好了
      img(src="../../static/images/orderFood/white_right.png")
  modal-get-phone-number
</template>

<script>
import uniPopup from "@/components/uni-popup/uni-popup.vue";
import foodMenu from "@/components/food-menu.vue";
import { sync, call } from "vuex-pathify";

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
      flavorChosen: {},
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
        (total, item) =>
          +(
            total +
            (item.sellPrice + (item.extraPrice || 0)) * item.numbers
          ).toFixed(10),
        0
      );
    },
  },
  onLoad(option) {
    console.log("food/index:onLoad", option);
    this.getBanner();
    if (option.s !== undefined && option.t) {
      this.storeCode = option.s;
      this.tableId = option.t;
    }
  },
  async onShow() {
    console.log("food/index:onShow");
    if (this.isScanning) return;
    await this.$onLaunched;
    this.getAuth();
    try {
      if (this.storeCode === undefined || !this.tableId) {
        await this.scanTableCode();
        this.swiperAutoplay = true;
      }
      const isFreshLoad = !this.categories.length;
      uni.showLoading();
      this.isLeftClick = false;
      await this.getMenu();
      isFreshLoad && (this.change = this.categories[0].uid);
      uni.hideLoading();
    } catch (e) {
      uni.showToast({ title: e, icon: "none" });
    }
  },
  onHide() {
    console.log("food/index:onHide");
    this.swiperAutoplay = false;
  },
  methods: {
    getAuth: call("auth/get"),
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
              if (s === undefined || !t) {
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
    bannerClick(item) {
      if (!item.target) return;
      const category = this.categories.find((c) => c.name === item.target);
      if (category) {
        this.scrollToCategory(category.uid);
      } else {
        let product = null;
        this.categories.forEach((cat) => {
          cat.products.forEach((p) => {
            if (p.name.includes(item.target)) {
              product = p;
              return;
            }
          });
        });
        if (product) {
          this.clickId = "p" + product.uid;
        }
      }
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
      if (!this.isFlavorValid(this.popupProduct)) {
        return;
      }
      this.foodAdd(this.popupProduct, true);
      this.close();
    },
    getCatCartNum(category) {
      return this.foodCart
        .filter((i) => i.categoryUid === category.uid)
        .reduce((sum, i) => sum + i.numbers, 0);
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
    foodAdd(product, inPopup = false) {
      if (product.flavorGroups?.length && !inPopup) {
        return this.open(product);
      }
      const flavors = Object.values(
        this.flavorChosen?.[product.uid] || {}
      ).reduce((acc, cur) => acc.concat(cur), []);
      const comment = flavors.map((f) => f.name).join(" ") || "";
      const itemInCart = this.foodCart.find(
        (item) => item.uid === product.uid && item.comment === comment
      );
      if (itemInCart) {
        itemInCart.numbers++;
      } else {
        this.foodCart.push({
          ...product,
          numbers: 1,
          comment,
          extraPrice: flavors.reduce(
            (p, f) => +(p + f.extraPrice || 0).toFixed(10),
            0
          ),
        });
      }
    },
    chooseFlavor(product, group, flavor) {
      const productFlavorGroupValues = this.flavorChosen[product.uid] || {};
      if (!productFlavorGroupValues[group.uid]) {
        productFlavorGroupValues[group.uid] = [];
      }
      const chosen = this.isFlavorChosen(product, group, flavor);
      if (!group.multiple) {
        productFlavorGroupValues[group.uid] = chosen ? [] : [flavor];
      } else {
        if (chosen) {
          productFlavorGroupValues[group.uid] = productFlavorGroupValues[
            group.uid
          ].filter((f) => f.uid !== flavor.uid);
        } else {
          productFlavorGroupValues[group.uid].push(flavor);
        }
      }
      this.$set(this.flavorChosen, product.uid, {
        ...productFlavorGroupValues,
      });
    },
    isFlavorChosen(product, group, flavor) {
      return this.flavorChosen[product.uid]?.[group.uid]
        ?.map((f) => f.uid)
        .includes(flavor.uid);
    },
    getFlavorExtraPrice(product) {
      const flavors = Object.values(
        this.flavorChosen[product.uid] || {}
      ).reduce((acc, cur) => acc.concat(cur), []);
      return flavors.reduce((p, f) => +(p + f.extraPrice || 0).toFixed(10), 0);
    },
    isFlavorValid(product) {
      if (!product.flavorGroups?.length) return true;
      return product.flavorGroups.every(
        (g) => !g.required || this.flavorChosen?.[product.uid]?.[g.uid]?.length
      );
    },
    goOrder() {
      uni.navigateTo({
        url:
          "./order?" + "tableId=" + this.tableId + "&storeId=" + this.storeId,
      });
    },
    // 鼠标点击
    scrollToCategory(catUid) {
      this.clickId = "c" + catUid;
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
      const scrollTop = e.detail.scrollTop;
      // console.log(scrollTop);
      const tabs = this.categories
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

  > .left {
    width: 132rpx;
    // background: #FFFFFF;
    background: #f7f7f7;
    height: 100vh;
    box-shadow: var(--theme--box-shadow);

    .scroll {
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

      .title {
        height: 100rpx;
        line-height: 25rpx;
        margin: 0 auto;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0 16rpx;
        position: relative;

        span {
          font-size: var(--theme--font-size-s);
          font-weight: var(--theme--font-weight-light);
          white-space: wrap;
        }

        .num {
          display: block;
          width: 30rpx;
          height: 30rpx;
          font-size: 20rpx;
          line-height: 0;
          /* text-align: center; */
          color: #64656d;
          position: absolute;
          z-index: 1;
          right: 0rpx;
          top: 20rpx;
          border-radius: 50%;
          background: var(--theme--deputy-color);
          font-weight: var(--theme--font-weight-normal);
          /* opacity: 0.8; */
          display: flex;
          justify-content: center;
          align-items: center;
        }

        &::after {
          content: "";
          width: 90rpx;
          left: 50%;
          transform: translateX(-50%);
          bottom: 0;
          height: 2rpx;
          background-color: #e6e6e6;
          position: absolute;
        }
      }
    }
  }

  // 右边
  .right {
    width: 620rpx;
    // height: 100vh;

    // 轮播
    .banner {
      width: 100%;
      height: 270rpx;
      // background: #f0f0f0;
      box-shadow: var(--theme--box-shadow);

      .swiper {
        width: 100%;
        height: 100%;
        // border-radius: var(--theme--border-radius);

        .item {
          width: 100%;
          height: 100%;

          image {
            width: 554rpx;
            height: 256rpx;
            // border-radius: 20rpx;
          }
        }
      }
    }

    .content-box {
      width: 554rpx;
      height: calc(100vh - 270rpx);
      margin: 0 auto;

      .scroll {
        height: 100%;

        .content {
          margin-top: 20rpx;
          padding-bottom: 90rpx;

          .name {
            margin: 40rpx 0;
            display: block;
            font-size: var(--theme--font-size-s);
            color: var(--theme--font-main-color);
          }

          .food-item {
            display: flex;
            justify-content: space-between;
            margin-bottom: 20rpx;
            margin-top: 20rpx;
            min-height: 168rpx;
            position: relative;
            overflow: hidden;
            border-radius: 20rpx;

            .tags {
              position: absolute;
              color: var(--theme--font-main-color);
              border-radius: 10rpx;
              font-size: var(--theme--font-size-s);
              background: var(--theme--deputy-color);
              padding: 0 10rpx;
              left: -34rpx;
              transform: rotate(-45deg);
              top: -2px;
              padding-top: 12rpx;
              padding-left: 30rpx;
              padding-right: 30rpx;
              .tag {
              }
            }

            > .left {
              width: 160rpx;
              height: 160rpx;
              border-radius: 20rpx;

              image {
                width: 160rpx;
                height: 160rpx;
                border-radius: 20rpx;
              }
            }

            .right {
              width: 360rpx;
              position: relative;
              min-height: 175rpx;
              .title {
                width: 100%;
                max-height: 72rpx;
                font-size: var(--theme--font-size-m);
                line-height: 36rpx;
                margin-bottom: 5rpx;
                overflow: hidden;
              }

              .detail {
                width: 360rpx;
                height: 56rpx;
                font-size: var(--theme--font-size-s);
                color: var(--theme--font-deputy-color);
                font-weight: var(--theme--font-weight-light);
                line-height: 28rpx;
                overflow: hidden;
              }

              .money-box {
                width: 360rpx;
                display: flex;
                justify-content: space-between;
                align-items: center;
                // margin-top: 30rpx;
                position: absolute;
                bottom: 0;
                .money {
                  height: 42rpx;
                  font-size: var(--theme--font-size-m);
                }

                .add {
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                  width: 120rpx;
                  height: 40rpx;
                  line-height: 26rpx;
                  font-size: var(--theme--font-size-m);

                  .foodreduce-img {
                    width: 37rpx;
                    height: 37rpx;
                  }

                  .foodAdd-img {
                    width: 40rpx;
                    height: 40rpx;
                  }
                }
              }
            }
          }
        }
      }
    }
  }

  // 食物详情弹框
  .detail-popup {
    width: 640rpx;
    max-height: calc(100vh - env(safe-area-inset-bottom));
    position: relative;
    background: #ffffff;
    border-radius: var(--theme--border-radius);

    .top {
      position: relative;

      image {
        width: 640rpx;
        height: 640rpx;
        border-radius: 20rpx;
      }

      .close {
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

    .content {
      padding: 0 40rpx;
      text-align: justify;

      .title {
        width: 100%;
        // height: 36rpx;
        font-size: var(--theme--font-size-m);
        color: var(--theme--font-main-color);
        line-height: 36rpx;
        margin: 15rpx 0 10rpx 0;
      }

      .box {
        // height: 56rpx;
        font-size: var(--theme--font-size-s);
        color: var(--theme--font-main-color);
        line-height: 42rpx;
      }
    }

    .flavors {
      padding: 10rpx 40rpx;
      .group {
        margin-top: 24rpx;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        .flavor {
          font-weight: var(--theme--font-weight-light);
          /* padding: 10rpx 20rpx; */
          margin: 0 10rpx;
          border: 1px solid var(--theme--deputy-color);
          padding: 10rpx 20rpx;
          border-radius: 10rpx;
          margin-bottom: 10rpx;
          &.selected {
            background-color: var(--theme--deputy-color);
          }
        }
      }
    }

    .footer {
      position: sticky;
      bottom: 0;
      // margin-top: 95rpx;
      width: 640rpx;
      height: 90rpx;
      background: #f7f7f7;
      border-radius: 20rpx;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 34rpx;
      box-sizing: border-box;

      .left {
        font-size: var(--theme--font-size-m);
      }

      .right {
        width: 40rpx;
        height: 40rpx;
        &.disabled {
          image {
            opacity: 0.3;
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

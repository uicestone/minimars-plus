<template lang="pug">
view.buycards_box
  view.buycards_top
    view.buycards_top_box.img-box
      img(:src="cover || cardType.posterUrl", mode="aspectFill")
    span.card-title {{ cardType.title }}
  view.buycards_contentall
    view.buycards_content
      view.buycards_content-title 充值金额选择 RECHARGE
      view.buycards_content-Bigbox
        view.buycards_content-box
          view.buycards_content-boxone(
            v-for="(item, index) in balancePriceGroups",
            :key="index"
          )
            view.buycards_contentBody
              view.buycards_contentBody-left
                span {{ item.count }}
              view.buycards_contentBody-right.minus(
                v-if="item.count > 0",
                @click="addOne(item._id, -1)"
              )
                img(src="/static/images/minus.png")
              view.buycards_contentBody-right(@click="addOne(item._id)")
                img(src="/static/images/add.png")
              view.buycards_contentBody-image(@click="open(item)") {{ item.balance }}
            span rmb {{ item.price }}
          uni-popup(ref="popup", type="bottom", :tabbar="false")
            view.login_box
              view.img-box.pop__close.cover-mask--small(@click="close()")
                img(src="/static/images/clear.png")
              view.buycardsBox_top
                img.buycardsBox_top_leftimg(
                  src="/static/images/index/indexRecharge.png"
                )
                view.buycardsBox_top_right
                  view {{ balanceItem.balance }}
                  view.pop__price rmb {{ balanceItem.price }}
              view.buycardsBox_footer
                view.buycardsBox_footer_left
                  scroll-view.gift_contentBox_box(scroll-y="true")
                    view.title 使用须知：
                    view.spanContent
                      rich-text(:nodes="content")
    // footer
    view.buycards_footer
      // 订单支付
      view.modeOf_Payment_order
        view.modeOf_Payment_order_money
          view {{ totalCount }}张
          |
          | 总计 ¥ {{ price.toFixed(2) }}
        view.modeOf_Payment_order_play(
          @click="createCard",
          :class="{ disabled: !totalCount }"
        )
          | 订单支付 PAYMENT
</template>

<script>
import uniPopup from "@/components/uni-popup/uni-popup.vue";
import { get } from "vuex-pathify";
import { create as createCard } from "../../utils/card";

export default {
  components: {
    uniPopup,
  },
  props: ["cardType", "cover", "content"],
  data() {
    return {
      balanceItem: {
        balance: 0,
        price: 0,
      }, //弹框的模块
      balancePriceGroups: [],
    };
  },
  methods: {
    async createCard() {
      if (!this.totalCount) {
        return;
      }
      createCard(
        {
          slug: this.cardType.slug,
          balanceGroups: this.balancePriceGroups.map((g) => ({
            balance: g.balance,
            count: g.count,
          })),
        },
        this.atStore
      );
    },
    open(item) {
      console.log(item, "item");
      this.balanceItem = item;
      this.$refs.popup.open();
    },
    close() {
      this.$refs.popup.close();
    },
    addOne(id, by = 1) {
      this.balancePriceGroups.forEach((i) => {
        if (id == i._id) {
          i.count = i.count + by;
        }
      });
    },
  },
  computed: {
    atStore: get("auth/atStore"),
    totalCount() {
      return this.balancePriceGroups.reduce(
        (count, group) => count + group.count,
        0
      );
    },
    price() {
      return this.balancePriceGroups.reduce(
        (price, group) => +(price + group.count * group.price).toFixed(6),
        0
      );
    },
  },
  created() {
    this.balancePriceGroups = this.cardType.balancePriceGroups.map((g) => ({
      ...g,
      count: 0,
    }));
  },
};
</script>

<style lang="less" scoped>
.buycards_box {
  width: 750rpx;
  background: #f8f8f8;
  height: 100vh;

  .buycards_top {
    padding: 100rpx 0;

    .buycards_top_box {
      width: 550rpx;
      height: 370rpx;
      box-shadow: 4rpx 4rpx 6rpx 4rpx rgba(204, 204, 204, 0.5);
      border-radius: var(--theme--border-radius);
      background-color: var(--theme--bg-main-color);
      margin: 0 auto;
    }
  }

  // 充值金额选择
  .buycards_contentall {
    position: fixed;
    bottom: 0;
    width: 750rpx;
    background: #ffffff;
    box-shadow: 0rpx 4rpx 16rpx 8rpx rgba(186, 186, 186, 0.5);

    .buycards_content {
      width: 660rpx;
      margin: 0 auto;
      height: 360rpx;

      .buycards_content-title {
        padding-top: 32rpx;
        margin-bottom: 32rpx;
        width: 100%;
        text-align: center;
        height: 40rpx;
        font-size: var(--theme--font-size-m);
        line-height: 40rpx;
      }

      .buycards_content-Bigbox {
        .buycards_content-box {
          width: 580rpx;
          margin: 0 auto;
          display: flex;
          justify-content: space-around;

          .buycards_content-boxone {
            text-align: center;
            margin: 0 auto;
            width: 145rpx;
            font-size: var(--theme--font-size-m);

            .buycards_contentBody {
              width: 140rpx;
              height: 140rpx;
              border-radius: 140rpx;
              position: relative;
              margin-bottom: 20rpx;

              .buycards_contentBody-left {
                position: absolute;
                border-radius: 50%;
                width: 40rpx;
                height: 40rpx;
                background: var(--theme--main-color);
                display: flex;
                justify-content: center;
                align-items: center;
              }

              .buycards_contentBody-right {
                z-index: 1;
                position: absolute;
                bottom: 0;
                right: 0;
                width: 42rpx;
                height: 42rpx;

                &.minus {
                  left: 0;
                  right: auto;
                }

                image {
                  width: 42rpx;
                  height: 42rpx;
                  background-color: #ffffff;
                  border-radius: 42rpx;
                }
              }

              .buycards_contentBody-image {
                margin: 0 auto;
                width: 140rpx;
                height: 140rpx;
                background-size: 100%;
                border-radius: 140rpx;
                background-color: #d8dbdc;
                line-height: 140rpx;
                font-size: 40rpx;
                font-weight: 900;
                color: white;
                -webkit-text-stroke: 1px var(--theme--font-main-color);
              }
            }

            span {
              white-space: nowrap;
            }
          }
        }

        // 使用须知
        .login_box {
          width: 750rpx;
          border-radius: var(--theme--border-radius) var(--theme--border-radius)
            0rpx 0rpx;
          padding: 60rpx 66rpx 48rpx;
          box-sizing: border-box;
          background-color: white;

          .buycardsBox_top {
            padding-bottom: 54rpx;
            border-bottom: 2rpx solid #f5f6f6;
            display: flex;
            align-items: center;
            // xheight: 140rpx;
            margin: 0 auto;

            .buycardsBox_top_leftimg {
              width: 140rpx;
              height: 140rpx;
              border-radius: 140rpx;
            }

            .buycardsBox_top_right {
              margin-left: 40rpx;
              width: 218rpx;
              font-size: var(--theme--font-size-s);
              line-height: 40rpx;
              text-align: left;
            }
          }

          .buycardsBox_footer {
            display: flex;
            justify-content: space-between;
            width: 100%;

            .buycardsBox_footer_left {
              text-align: left;

              .gift_contentBox_box {
                height: 440rpx;
                font-size: var(--theme--font-size-s);
                line-height: 42rpx;
                .title {
                  margin-top: 30rpx;
                }
                .spanContent {
                  margin-top: 10rpx;
                }
              }
            }
          }
        }
      }
    }

    // 底部
    .buycards_footer {
      // border: 1px solid red;
      width: 750rpx;
      height: 225rpx;
      background: #ffffff;
      box-shadow: 0rpx 4rpx 16rpx 8rpx rgba(186, 186, 186, 0.5);
      // position: fixed;
      // bottom: 0;

      .modeOf_Payment_order {
        display: flex;
        justify-content: space-between;
        width: 666rpx;
        margin: 0 auto;

        .modeOf_Payment_order_money {
          font-size: var(--theme--font-size-m);
          margin-top: 80rpx;

          view {
            margin-bottom: 12rpx;
          }
        }

        .modeOf_Payment_order_play {
          margin-top: 65rpx;
          background-color: var(--theme--main-color);
          height: 102rpx;
          padding: 0 46rpx;
          border-radius: var(--theme--border-radius);
          line-height: 102rpx;
          font-size: var(--theme--font-size-m);
          &.disabled {
            opacity: 0.4;
          }
        }
      }
    }
    // end
  }
}

.card-title {
  font-size: var(--theme--font-size-s);
  font-weight: var(--theme--font-weight-light);
  width: 550rpx;
  margin: 56rpx auto 0;
  display: block;
}

.pop__close {
  width: 36rpx;
  height: 36rpx;
  position: absolute;
  right: 66rpx;
  top: 60rpx;
}

.pop__price {
  font-size: var(--theme--font-size-m);
}
</style>

<template lang="pug">
view.buycards_box
  view.buycards_top
    view.buycards_top_box
      img(:src="cover || cardType.posterUrl", mode="aspectFill")
      view.cards_box
        view.cards_box-left
          | {{ cardType.title }}
          view.cards_box_left-title rmb {{ cardType.price }}
        view.cards_box-right(v-if="buyMultiple")
          view.img-box.minus.cover-mask--small
            img(
              src="../../static/images/minus.png",
              @click="() => { if (number > 1) number--; }"
            )
          text {{ number }}
          view.img-box.add.cover-mask--small
            img(src="../../static/images/add.png", @click="number++")
  // 购买须知
  view.buyQualifyCards_contentbox
    view.buyQualifyCards_content
      view.purchase_notes
        // 购买须知:
        view.purchase_notesBox
          rich-text(:nodes="content")
      //
        <view class="warm_prompt">
        温馨提示:
        </view>
      view.buyQualifyCards_footer(@click="createCard")
        view(style="text-align:center", v-if="price") 订单支付 PAYMENT
        view(style="text-align:center", v-else) 免费领取 GET FOR FREE
        view ￥{{ price }}
</template>

<script>
import { get } from "vuex-pathify";
import { create as createCard } from "../../utils/card";

export default {
  props: ["cardType", "cover", "content"],
  data() {
    return {
      buyMultiple: false,
      number: 1,
    };
  },
  methods: {
    async createCard() {
      const orderDetail = {
        slug: this.cardType.slug,
      };

      if (this.buyMultiple) {
        orderDetail.quantity = this.number;
      }

      await createCard(orderDetail, this.atStore);
    },
  },
  computed: {
    atStore: get("auth/atStore"),
    price() {
      return this.cardType.price * this.number;
    },
  },
  created() {
    if (["times"].includes(this.cardType.type)) {
      this.buyMultiple = true;
    }
  },
};
</script>

<style lang="less">
.buycards_box {
  width: 750rpx;
  background: #f8f8f8;

  .buycards_top {
    padding: 130rpx 0 44rpx;

    .buycards_top_box {
      width: 550rpx;
      margin: 0 auto;

      > image {
        width: 550rpx;
        height: 370rpx;
        box-shadow: 4rpx 4rpx 6rpx 4rpx rgba(204, 204, 204, 0.5);
        border-radius: var(--theme--border-radius);
      }

      .cards_box {
        display: flex;
        justify-content: space-between;
        margin-top: 50rpx;

        .cards_box-left {
          font-size: var(--theme--font-size-s);
          font-weight: var(--theme--font-weight-light);
          line-height: 42rpx;

          .cards_box_left-title {
            width: 320rpx;
            height: 40rpx;
            font-size: var(--theme--font-size-m);
            font-weight: var(--theme--font-weight-medium);
          }
        }

        .cards_box-right {
          align-items: center;
          width: 164rpx;
          display: flex;
          justify-content: space-between;
          font-size: var(--theme--font-size-m);

          .minus {
            width: 40rpx;
            height: 40rpx;
            border-radius: 50%;
          }

          .add {
            box-shadow: none;
            width: 40rpx;
            height: 40rpx;
            border-radius: 50%;
          }
        }
      }
    }
  }

  // 购买须知
  .buyQualifyCards_contentbox {
    width: 750rpx;
    background: #ffffff;

    .buyQualifyCards_content {
      width: 80%;
      margin: 0 auto;
      padding-top: 40rpx;

      .purchase_notes,
      .warm_prompt {
        padding-bottom: 200rpx;
        // width: 126rpx;
        min-height: 34rpx;

        color: #0d0d0d;

        .purchase_notesBox {
          font-size: var(--theme--font-size-s);

          line-height: 42rpx;
          .p {
            margin-bottom: 0.5rem;
          }
          .ol {
            margin-top: 1em;
            margin-bottom: 1em;
            padding-left: 1.5rem;
          }
        }
      }

      .buyQualifyCards_footer {
        position: fixed;
        bottom: 50rpx;
        width: 594rpx;
        height: 102rpx;
        background: var(--theme--main-color);
        border-radius: var(--theme--border-radius);
        font-size: var(--theme--font-size-m);
        box-shadow: 0rpx 10rpx 30rpx 0rpx rgba(215, 215, 215, 0.3);
        display: flex;
        align-items: center;
        box-sizing: border-box;
        padding: 0 36rpx;
        justify-content: space-between;
        white-space: nowrap;
      }
    }
  }
}
</style>

<template lang="pug">
view.cardbag
  view.card
    view.box(v-for="card in cards", :key="card.id")
      view.img-box
        img(
          :src="card.posterDenseUrl || '/static/images/my/my-banner.png'",
          mode="aspectFill"
        )
      view.content
        view.title
          text {{ card.title }}
        view.time {{ card.start || card.createdAt | date }} - {{ card.expiresAt | date }}
</template>

<script>
import moment from "moment";

export default {
  data() {
    return {
      type: "", // card / coupon
      activeIndex: 0,
      count: "",
      cards: [],
    };
  },
  components: {
    "custom-tabs": customTabs,
  },
  methods: {
    async getCards() {
      this.cards = await this.$axios.getRequest(`/card?status=expired`);
    },
  },
  filters: {
    date(d) {
      return moment(d).format("YYYY.M.D");
    },
  },
  async onShow() {
    await this.getCards();
  },
};
</script>
<style lang="less" scoped>
.cardbag {
  width: 750rpx;
  min-height: 100vh;
  background: #f8f8f8;
  position: relative;
  padding-top: 1rpx;

  .card {
    padding-bottom: calc(env(safe-area-inset-bottom) + 20rpx);

    .box {
      width: 690rpx;
      box-shadow: 0rpx 4rpx 14rpx 6rpx rgba(222, 221, 221, 0.5);
      margin: 0 auto;
      position: relative;
      margin-top: 30rpx;
      border-radius: var(--theme--border-radius);
      overflow: hidden;

      .img-box {
        width: 100%;
        height: 232rpx;
      }

      .content {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 34rpx 0 40rpx;
        box-sizing: border-box;
        width: 100%;
        height: 90rpx;
        background: #ffffff;
        border-radius: 0rpx 0rpx 16rpx 16rpx;

        .title {
          max-width: 50%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          height: 34rpx;
          font-size: var(--theme--font-size-s);
        }

        //时间
        .time {
          height: 32rpx;
          font-size: var(--theme--font-size-s);
        }
      }
    }
  }
}
</style>

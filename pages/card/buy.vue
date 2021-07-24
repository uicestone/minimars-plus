<template lang="pug">
div
  card-buy-balance(
    v-if="cardType.type === 'balance' && cardType.balancePriceGroups && cardType.balancePriceGroups.length",
    :card-type="cardType",
    :cover="cover",
    :content="content"
  )
  card-buy(
    v-else-if="cardType.id",
    :card-type="cardType",
    :cover="cover",
    :content="content"
  )
</template>

<script>
import { get } from "vuex-pathify";
import { create as createCard } from "../../utils/card";

export default {
  data() {
    return {
      cardType: {},
      cover: null,
      content: null,
    };
  },
  onShow() {
    this.getCardTypeDetail();
  },
  onLoad(option) {
    this.slug = option.slug;
    this.cover = option.cover;
    this.id = option.id;
  },
  methods: {
    async getCardTypeDetail() {
      try {
        this.cardType = await this.$axios.getRequest(
          `/card-type/${this.id || this.slug}`
        );
        this.content = this.cardType.content || "";
        this.content = this.content
          .replace(/<p([ >])/g, '<p class="p"$1')
          .replace(/<ol([ >])/g, '<ol class="ol"$1')
          .replace(/<ul([ >])/g, '<ul class="ul"$1');
      } catch (e) {
        uni.showToast({
          title: "卡券不见了，看看其他卡券吧",
          icon: "none",
        });
        setTimeout(() => {
          uni.redirectTo({ url: "./index" });
        }, 1000);
      }
    },
  },
};
</script>

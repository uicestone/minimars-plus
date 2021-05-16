<template lang="pug">
view.list
  view.item(v-for="item in 4",:key="item")
    custom-card
      view.item-content__name MARS BABY卡 rmb 3,000
      view.item-content__status 未收卡
      view.item-content__id 赠卡人ID: 2877hhh343
      view.item-content__date 日期：2021.05.18
</template>

<script>
import customCard from '../../components/custom-card-box/card-box.vue';
export default {
  components: {
    'custom-card': customCard
  },
  data() {
    return {};
  },
  methods: {}
};
</script>

<style scoped>
page {
  background-color: #f8f8f8;
}

.list {
  padding-bottom: 30rpx;
  padding-bottom: env(safe-area-inset-bottom);
}

.item{
  width: 690rpx;
  margin: 30rpx auto 0;
}
</style>

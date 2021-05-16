<template lang="pug">
view
  view.tabs
    custom-tabs(:tabs="tabs",@onselect="selectTab",activeIndex="1")
  view.list
    view.item
      custom-card
        view 圣诞树
        view 3岁-10岁
  custom-pop(ref="storePicker")
    view(slot="header") 门店选择 STORES
    custom-picker(slot="body",:options="[stores]")
</template>

<script>
import customTabs from '../../components/custom-tabs/tabs.vue';
import customCard from '../../components/custom-card-box/card-box.vue';
import customPop from '../../components/custom-popup/popup.vue';
import customPicker from '../../components/custom-picker/picker.vue';
export default {
  components: {
    'custom-tabs': customTabs,
    'custom-card': customCard,
    'custom-pop': customPop,
    'custom-picker': customPicker
  },
  data() {
    return {
      tabs: [
        {
          id: 1,
          name: '门店选择',
          customClick: true,
          showArrow: true,
          arrowTowards: 'bottom'
        },
        {
          id: 2,
          name: '静安江宁店'
        }
      ],
      stores: [
        {
          val: '杨浦'
        }
      ]
    };
  },
  methods: {
    selectTab(e) {
      if (e.item.id === 1) {
        this.$refs.storePicker.open();
      }
    }
  }
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

.item {
  width: 690rpx;
  margin: 30rpx auto 0;
}

.tabs{
  position: sticky;
  top: 0;
}
</style>

<template lang="pug">
<!-- view.marsActivityBox_box
  view.marsActivityBox_title_box
    view.marsActivityBox_title-left
      | 选择门店
      img.marsActivityBox_title-leftimg(
        src="../../static/images/index/index_select.png",
        @click="goDoorname"
      )
    view.marsActivityBox_title-right {{ store }}
    view.storeNameBox(v-if="doorname == 1")
      view(
        v-for="(door, index) in doorlist",
        :key="index",
        @click="godoor(door)"
      ) {{ door.name }}
  view.marsCoupon_contentbox
    view.coupebox_content
      view.coupebox_contentimgBox(
        v-for="(item, index) in 7",
        :key="index",
        @click="goDetail"
      )
        img(src="../../static/images/224.jpg", mode="aspectFill")
        view.coupebox_contentimgBox_content
          view.coupebox_contentimgBox_content_title 圣诞树DIY
          view.coupebox_contentimgBox_content_data 2020.12.19
          view.coupebox_contentimgBox_content_detail 3岁-10岁 -->
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
      custom-picker(slot="body",:options="[doorlist]",labelKey="name",@onchange="selectStore")
</template>

<script>
import { sync } from "vuex-pathify";
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
      store: "",
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
  computed: {
    user: sync("auth/user"),
    tabs(){
      return [
        {
          id: 1,
          name: '门店选择',
          customClick: true,
          showArrow: true,
          arrowTowards: 'bottom'
        },
        {
          id: 2,
          name: this.store
        }
      ]
    }
  },
  onShow() {
    if (this.user.store) {
      this.store = this.user.store.name;
    } else {
      this.store = this.doorlist[0].name;
    }
  },
  methods: {
    goDetail() {
      uni.navigateTo({
        url: "./eventDetail",
      });
    },
    
    selectStore(e){
      this.store=e.value[0].name
    },
    
    // 选择门店
    selectTab(e) {
      if (e.item.id === 1) {
        this.$refs.storePicker.open();
      }
    }
  },
};
</script>

<style lang="less" scoped>
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

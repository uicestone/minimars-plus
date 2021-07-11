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
      custom-tabs(:tabs="tabs", @onselect="selectTab", activeIndex="1")
    view.select(v-if="!store.id")
      view.img-box.select__img
        img(src="../../static/images/events/event-no-store.png")
      view.select__text 你还没有选择门店\n快来挑选自己喜欢的活动吧
      view.select__btn(@click="$refs.storePicker.open()") 门店选择
    view.list(v-else)
      view.item(v-for="(i, k) in list", :key="k", @click="goDetail(i.id)")
        custom-card(:img="i.posterUrl")
          view {{ i.title }}
          view {{ i.kidAgeRange }}
    custom-pop(ref="storePicker")
      view(slot="header") 门店选择 STORES
      custom-picker(
        slot="body",
        :options="[doorlist]",
        labelKey="name",
        @onchange="selectStore"
      )
</template>

<script>
import { get } from "vuex-pathify";
import customTabs from "../../components/custom-tabs/tabs.vue";
import customCard from "../../components/custom-card-box/card-box.vue";
import customPop from "../../components/custom-popup/popup.vue";
import customPicker from "../../components/custom-picker/picker.vue";
export default {
  components: {
    "custom-tabs": customTabs,
    "custom-card": customCard,
    "custom-pop": customPop,
    "custom-picker": customPicker,
  },
  data() {
    return {
      store: "",
      doorlist: [
        {
          id: 0,
          name: "请选择门店",
        },
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

      list: [],
    };
  },
  computed: {
    user: get("auth/user"),
    stores: get("config/stores"),
    tabs() {
      return [
        {
          id: 1,
          name: "门店选择",
          customClick: true,
          showArrow: true,
          arrowTowards: "bottom",
        },
        {
          id: 2,
          name: this.store.id ? this.store.name : "",
        },
      ];
    },
  },
  onShow() {
    if (this.user.store) {
      this.store = this.user.store;
    } else {
      this.store = this.doorlist[0];
    }
  },
  onLoad() {},
  methods: {
    async getList() {
      this.list = await this.$axios.getRequest("/event", {
        store: this.store.id,
      });
    },

    goDetail(id) {
      uni.navigateTo({
        url: "./eventDetail?id=" + id,
      });
    },

    selectStore(e) {
      this.store = e.value[0];
      if (this.store.id) this.getList();
    },

    // 选择门店
    selectTab(e) {
      if (e.item.id === 1) {
        this.$refs.storePicker.open();
      }
    },
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

.tabs {
  position: sticky;
  top: 0;
  z-index: 1;
  background-color: white;
}

.select {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.select__img {
  width: 454rpx;
  height: 334rpx;
}

.select__text {
  font-size: var(--theme--font-size-s);
  white-space: pre-wrap;
  margin-top: 80rpx;
  text-align: center;
  line-height: 42rpx;
}

.select__btn {
  width: 424rpx;
  height: 102rpx;
  line-height: 102rpx;
  text-align: center;
  background-color: var(--theme--main-color);
  border-radius: var(--theme--border-radius);
  margin-top: 114rpx;
}
</style>

<template lang="pug">
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
      custom-card(:img="i.posterDenseUrl || i.posterUrl")
        view
          text {{ i.title }}
          text.date(v-if="i.date") {{ i.date | date }}
        view {{ i.kidAgeRange }}
  custom-pop(ref="storePicker")
    view(slot="header") 门店选择 STORES
    custom-picker(
      slot="body",
      :options="[options]",
      labelKey="name",
      @onchange="selectStore"
    )
</template>

<script>
import { get } from "vuex-pathify";
import store from "vuex";
import moment from "moment";
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
      list: [],
    };
  },
  computed: {
    user: get("auth/user"),
    stores: get("config/stores"),
    options() {
      return [{ id: 0, name: "请选择门店" }, ...this.stores];
    },
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
      this.getList();
    } else {
      this.store = { id: 0, name: "请选择门店" };
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
  filters: {
    date(d) {
      return moment(d).format("YYYY.M.D");
    },
  },
};
</script>

<style lang="less" scoped>
page {
  background-color: #f8f8f8;
}

.list {
  padding-bottom: calc(env(safe-area-inset-bottom) + 30rpx);
}

.item {
  width: 690rpx;
  margin: 30rpx auto 0;
  .date {
    margin-left: 15rpx;
    font-weight: var(--theme--font-weight-light);
  }
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

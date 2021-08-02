<template lang="pug">
view.marsActivityBox
  view.marsActivity_header.img-box
    img(
      :src="detail.ipCharacter ? `/static/images/events/${detail.ipCharacter}.png` : detail.posterUrl",
      mode="aspectFill"
    )
  view.marsActivity_titleBox
    view.header
      view.name {{ detail.title }}
      view.rule
        view.date {{ detail.date }}
        view.age {{ detail.kidAgeRange }}
    view.richtext
      rich-text(:nodes="detail.content")
  view.btn(@click="$refs.popup.open()") 立即预约 BOOK NOW

  uni-popup(ref="popup", type="center")
    view.popup-box
      view.popup-conent
        view.flex-x.center.popup-goods
          view.img-box.popup-goods__img
            img(
              :src="detail.ipCharacter ? `/static/images/events/${detail.ipCharacter}.png` : detail.posterUrl",
              mode="aspectFill"
            )
          view.grow.flex-y.between.popup-goods__content
            view.popup-goods__name {{ detail.title }}
            view.flex-x.center.between.popup-goods__detail
              view.popup-goods__condition *入场门票需另购
              view.popup-goods__price rmb {{ detail.price }}
        view.storesToChoose_choose
          view.title
            img(src="../../static/images/index/index_orderOne.png")
            view 门店确认 STORE
          view.content(@click="showShopPop")
            span {{ store.name }}
          view.title
            img(src="../../static/images/index/index_orderTwo.png")
            view 活动日期 DATE
          view.content(@click="showCalendarPop")
            span {{ date[0] }}
          view.title
            img(src="../../static/images/index/index_orderThree.png")
            view 报名人数 ATTENDANCE
          view.content
            span 儿童
            view.flex-x.center.popup-control
              view.img-box.popup-control__btn(@click="setNum(-1)")
                img(src="../../static/images/minus.png")
              view.popup__num {{ num }}
              view.img-box.popup-control__btn(@click="setNum(+1)")
                img(src="../../static/images/add.png")
      view.flex-x.center.between.popup-bottom
        view
          view.popup-bottom__btn(
            v-if="![null, undefined].includes(detail.priceInPoints)",
            @click="pay('points')"
          ) 积分支付
        view
          view.popup-bottom__btn(v-if="detail.price", @click="pay()") 微信支付

    // 日期选择
  custom-popup(ref="calendarPop")
    view.pop-header(slot="header")
      view.pop-header__arrow.pop-header__arrow--left.cover-mask--medium(
        @click="changeMonth(-1)"
      )
      view {{ currentMonth }}
      view.pop-header__arrow.pop-header__arrow--right.cover-mask--medium(
        @click="changeMonth(+1)"
      )
    view.calendar__body(slot="body")
      custom-calendar(
        :markDays.sync="date",
        :displayMonth.sync="calendarDisplayMonth",
        ref="calendar",
        disabledAfter,
        :maxDate="maxDate"
      )

  // 门店选择
  custom-popup(ref="shopPop")
    view.pop-header(slot="header") 门店选择 STORES
    view(slot="body")
      custom-picker(
        valueKey="id",
        labelKey="name",
        :options="[storeOptions]",
        @onchange="selectStore"
      )
</template>

<script>
import moment from "moment";
import { get } from "vuex-pathify";
import { create as createBooking } from "@/utils/booking.js";
import { confirm } from "@/utils/modal";
import customPopup from "@/components/custom-popup/popup";
import customPicker from "@/components/custom-picker/picker";
import customCalendar from "@/components/custom-calendar/calendar";

export default {
  components: {
    "custom-popup": customPopup,
    "custom-picker": customPicker,
    "custom-calendar": customCalendar,
  },
  computed: {
    currentMonth() {
      return moment(this.calendarDisplayMonth).format("YYYY 年 MM 月");
    },
    stores: get("config/stores"),
    storeOptions() {
      return [
        {
          id: 0,
          name: "请选择门店",
        },
        ...this.stores,
      ];
    },

    eventQuery() {
      return {
        type: "event",
        store: this.store.id ? this.store.id : "",
        event: this.detail.id,
        kidsCount: this.num,
        date: this.date[0],
      };
    },
  },
  data() {
    return {
      detail: {},
      date: [moment().format("YYYY-MM-DD")], // 选中日期
      dateLock: false, // 锁定日期
      calendarDisplayMonth: moment().format("YYYY-MM-DD"),
      maxDate: moment().add(13, "days").format("YYYY-MM-DD"),
      store: {
        name: "请选择门店",
      },
      storeLock: false, // 锁定门店
      num: 1, // 数量
    };
  },
  onLoad(params) {
    this.getDetail(params.id);
  },
  methods: {
    async getDetail(id) {
      const detail = await this.$axios.getRequest("/event/" + id);

      if (detail.content)
        detail.content = getApp().fixRichTextImg(detail.content);

      if (detail.date) {
        // 活动固定日期
        detail.date = moment(detail.date).format("YYYY.MM.DD");
        this.dateLock = true;
      }

      if (detail.store) {
        // 固定门店
        this.store = detail.store;
        this.storeLock = true;
      }
      this.detail = detail;
    },

    // 显示日历弹窗
    showCalendarPop() {
      if (this.dateLock) return false;
      this.$refs.calendarPop.open();
    },

    // 选择月份
    changeMonth(n) {
      this.$refs.calendar.addMonth(n);
    },

    // 显示门店弹窗
    showShopPop() {
      if (this.storeLock) return false;
      this.$refs.shopPop.open();
    },

    selectStore(e) {
      this.store = e.value[0];
    },

    // 设置数量
    setNum(n) {
      let num = this.num + n;
      if (num < 1) num = 1;
      this.num = num;
    },

    // 支付
    async pay(type = "") {
      if (!this.store.id)
        return uni.showToast({
          title: "请先选择门店",
          icon: "none",
        });

      if (type === "points" && this.detail.priceInPoints) {
        await confirm(
          `确认使用积分支付吗？`,
          `将扣除您账户内${this.detail.priceInPoints}积分`
        );
      }

      await createBooking(this.eventQuery, type);
    },
  },
};
</script>

<style lang="less" scoped>
.marsActivityBox {
  overflow-y: scroll;

  .marsActivity_header {
    width: 750rpx;
    height: 782rpx;
    background: var(--theme--bg-main-color);
  }
  .marsActivity_titleBox {
    border-radius: var(--theme--border-radius) var(--theme--border-radius) 0 0;
    width: 100%;
    background-color: white;
    padding: 56rpx 66rpx;
    box-sizing: border-box;
    margin-top: -30rpx;
    position: absolute;
  }
}

.header {
  border-bottom: 2rpx solid #e4e7e7;
}

.header::after {
  content: "";
  display: table-cell;
}

.name {
  font-size: var(--theme--font-size-m);
  line-height: var(--theme--font-size-m);
  margin-bottom: 22rpx;
}

.rule {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: var(--theme--font-size-m);
  line-height: var(--theme--font-size-m);
  color: var(--theme--font-deputy-color);
  margin-bottom: 54rpx;
}

.richtext {
  font-size: var(--theme--font-size-s);
  line-height: 42rpx;
  color: var(--theme--font-main-color);
  padding: 32rpx 0 160rpx;
  overflow-y: scroll;
  box-sizing: border-box;
}

.btn {
  width: 594rpx;
  height: 102rpx;
  background-color: var(--theme--main-color);
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  bottom: calc(30rpx + env(safe-area-inset-bottom));
  border-radius: var(--theme--border-radius);
  text-align: center;
  line-height: 102rpx;
}

.popup-box {
  width: 596rpx;
  background-color: white;
  border-radius: var(--theme--border-radius);
  overflow: hidden;
}

.popup-conent {
  width: 526rpx;
  margin: 0 auto;
}

.popup-goods {
  height: 190rpx;
  border-bottom: 2rpx solid #dcdfe0;
}

.popup-goods__img {
  width: 100rpx;
  height: 100rpx;
  border-radius: var(--theme--border-radius);
  margin-right: 50rpx;
  background-color: var(--theme--bg-main-color);
}

.popup-goods__content {
  height: 100rpx;
}

.popup-goods__condition {
  font-size: var(--theme--font-size-s);
  color: var(--theme--font-deputy-color);
}

.storesToChoose_choose {
  padding: 30rpx 0;
  .title {
    display: flex;
    margin-top: 20rpx;

    image {
      width: 40rpx;
      height: 40rpx;
    }

    view {
      margin-left: 16rpx;
      height: 40rpx;
      font-size: var(--theme--font-size-m);
      color: var(--theme--font-deputy-color);
      line-height: 40rpx;
    }
  }

  .content {
    width: 100%;
    height: 80rpx;
    line-height: 80rpx;
    border-radius: var(--theme--border-radius);
    border: 2rpx solid #aaaeaf;
    display: flex;
    justify-content: space-between;
    margin-top: 15rpx;
    font-size: var(--theme--font-size-m);
    color: var(--theme--font-main-color);

    span {
      width: 550rpx;
      margin-left: 30rpx;
    }

    > image {
      width: 31rpx;
      height: 31rpx;
      margin-right: 25rpx;
      margin-top: 28rpx;
    }
  }
}

.popup-bottom {
  height: 114rpx;
  background-color: var(--theme--bg-main-color);
  padding: 0 38rpx;
  box-sizing: border-box;
}

.popup-bottom__btn {
  width: 190rpx;
  height: 46rpx;
  background-color: var(--theme--main-color);
  border-radius: 23rpx;
  text-align: center;
  line-height: 46rpx;
  font-size: var(--theme--font-size-s);
}

.popup-control {
  margin-right: 26rpx;
}

.popup-control__btn {
  width: 40rpx;
  height: 40rpx;
}

.popup__num {
  width: 80rpx;
  margin: 0 4rpx;
  text-align: center;
}

.pop-header,
.pop-header,
.pop-header {
  font-size: var(--theme--font-size-normal);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
}

.pop-header__arrow {
  width: 20rpx;
  height: 20rpx;
  background: url("../../static/images/booking/calendar_arrow.png") no-repeat
    center;
  background-size: contain;
}

.pop-header__arrow--left {
  transform: rotate(-90deg);
  margin-right: 40rpx;
}

.pop-header__arrow--right {
  transform: rotate(90deg);
  margin-left: 40rpx;
}
</style>

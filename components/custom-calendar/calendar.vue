<template lang="pug">
  <view>
    view.orderTime_box
      view.calendar-wrapper
        // 日历的星期
        view.week
          view.week-day(v-for='(item, index) in weekDay' :key='index') {{ item }}
        // 日历的天数
        // <view :class="{ hide: !monthOpen }" class="content" :style="{ height: height }">
        view.content(:style='{ height: height }')
          view.days(:style="{ top: positionTop + 'rpx' }")
            view.item(v-for='(item, index) in days' :key='index')
              view.day(@click='selectOne(item, $event)' :class='{\
              selected:date === `${item.text}`,\
              selected: isMarkDay(item.year, item.month, item.date),\
              isWeekday: isWeekday(item),\
              "day--lock": !checkDate(item.text),\
              }') {{ Number(item.date) }}
  </view>
</template>

<script>
import { sync } from "vuex-pathify";
import moment from "moment";

export default {
  name: "ren-calendar",
  props: {
    // 星期几为第一天(0为星期日)
    weekstart: {
      type: Number,
      default: 0,
    },
    // 标记的日期
    markDays: {
      type: Array,
      default: () => {
        return [moment().format("YYYY-MM-DD")];
      },
    },
    multiSelect: Boolean, // 支持多选
    displayMonth: String, // 当前显示月 YYYY-MM-DD
    // 是否展开
    open: {
      type: Boolean,
      default: true,
    },
    //是否可收缩
    collapsible: {
      type: Boolean,
      default: true,
    },
    //未来日期是否不可点击
    disabledAfter: {
      type: Boolean,
      default: false,
    },
    // 最大可选日期
    maxDate: {
      type: String,
      default: "",
    },
    // 是否可选
    canSelect: { type: Boolean, default: true },
  },
  data() {
    return {
      weektext: ["SUN", "MON", "THUS", "WED", "THUR", "FRI", "SAT"],
      days: [], // 当前月的日期数据
      positionTop: 0,
      monthOpen: true,
      headerBar: true, // 月份切换按钮

      syncMarkDays: [],
      syncDisplayMonth: "",
    };
  },
  mounted() {
    this.syncMarkDays = [].concat(this.markDays);
    this.syncDisplayMonth = this.displayMonth;
    if (this.syncMarkDays.length > 0 && !this.displayMonth) {
      this.syncDisplayMonth = this.syncMarkDays[0];
      this.$emit("update:displayMonth", this.syncDisplayMonth);
    }
    this.days = this.calcCalendarDays();
    !this.open && this.toggle();
  },
  computed: {
    weekDay() {
      return this.weektext
        .slice(this.weekstart)
        .concat(this.weektext.slice(0, this.weekstart));
    },
    height() {
      return (this.days.length / 7) * 50 + "rpx";
    },
  },
  methods: {
    confirm() {
      uni.navigateBack();
    },
    formatNum(num) {
      return num.toString().padStart(2, "0");
    },
    getSelectedDate() {
      const date = moment(this.selectDate);
      const weekText = ["日", "一", "二", "三", "四", "五", "六"];
      const formatWeek = "星期" + weekText[date.day()];
      return {
        date: date.format("YYYY-MM-DD"),
        week: formatWeek,
      };
    },
    // 获取当前月份数据
    calcCalendarDays() {
      const date = moment(this.syncDisplayMonth);
      const y = date.year();
      const m = date.month() + 1;
      let days = [];
      let firstDayOfMonth = new Date(y, m - 1, 1).getDay(); // 当月第一天星期几
      let lastDateOfMonth = new Date(y, m, 0).getDate(); // 当月最后一天
      let lastDayOfLastMonth = new Date(y, m - 1, 0).getDate(); // 上一月的最后一天
      let weekstart = this.weekstart;
      let startDay = (() => {
        // 周初有几天是上个月的
        if (firstDayOfMonth == weekstart) {
          return 0;
        } else if (firstDayOfMonth > weekstart) {
          return firstDayOfMonth - weekstart;
        } else {
          return 7 - weekstart + firstDayOfMonth;
        }
      })();
      let endDay = 7 - ((startDay + lastDateOfMonth) % 7); // 结束还有几天是下个月的
      for (let i = 1; i <= startDay; i++) {
        days.push({
          date: this.formatNum(lastDayOfLastMonth - startDay + i),
          day: (weekstart + i - 1) % 7,
          month: m - 1 >= 0 ? this.formatNum(m - 1) : 12,
          year: m - 1 >= 0 ? y : y - 1,
        });
      }
      for (let j = 1; j <= lastDateOfMonth; j++) {
        days.push({
          date: this.formatNum(j),
          day: (j - 1 + firstDayOfMonth) % 7,
          month: this.formatNum(m),
          year: y,
        });
      }
      for (let k = 1; k <= endDay; k++) {
        days.push({
          date: this.formatNum(k),
          day: (lastDateOfMonth + startDay + weekstart + k - 1) % 7,
          month: m + 1 <= 11 ? this.formatNum(m + 1) : 0,
          year: m + 1 <= 11 ? y : y + 1,
        });
      }
      days.forEach((day) => {
        const { year, month, date } = day;
        day.text = moment({ year, month: month - 1, date }).format(
          "YYYY-MM-DD"
        );
      });
      return days;
    },
    isWeekday(item) {
      return ![0, 6].includes(item.day);
    },
    isFutureDay(y, m, d) {
      //是否未来日期
      let ymd = `${y}/${m}/${d}`;
      let formatDY = new Date(ymd.replace(/-/g, "/"));
      let showTime = formatDY.getTime();
      let curTime = new Date().getTime();
      if (showTime > curTime) {
        return true;
      } else {
        return false;
      }
    },
    // 标记日期
    isMarkDay(y, m, d) {
      let flag = false;
      for (let i = 0; i < this.syncMarkDays.length; i++) {
        let dy = `${y}-${m}-${d}`;
        if (this.syncMarkDays[i] == dy) {
          flag = true;
          break;
        }
      }
      return flag;
    },
    isToday(y, m, d) {
      let checkD = y + "-" + m + "-" + d;
      let today = this.getSelectedDate().date;
      if (checkD == today) {
        return true;
      } else {
        return false;
      }
    },
    // 展开收起
    toggle() {
      this.monthOpen = !this.monthOpen;
      this.headerBar = !this.headerBar;
      if (this.monthOpen) {
        this.positionTop = 0;
      } else {
        let index = -1;
        this.days.forEach((i, x) => {
          this.isToday(i.year, i.month, i.date) && (index = x);
        });
        this.positionTop = -((Math.ceil((index + 1) / 7) || 1) - 1) * 80;
      }
    },
    // 点击回调
    selectOne(i, event) {
      let date = `${i.year}-${i.month}-${i.date}`;
      let week = new Date(date).getDay();
      let weekText = ["日", "一", "二", "三", "四", "五", "六"];
      let formatWeek = "星期" + weekText[week];
      let response = {
        date: date,
        week: formatWeek,
      };

      let resultDays = [].concat(this.syncMarkDays);

      // 禁止点击
      if (!this.canSelect) return false;

      if (moment().isAfter(date, "day") && this.disabledAfter) return false;

      // 支持最大日期
      if (moment(date).isAfter(this.maxDate, "day") && this.maxDate)
        return false;

      // 不支持多选
      if (!this.multiSelect && resultDays.length > 0) resultDays = [];

      // 支持多选已选中
      if (this.multiSelect && resultDays.includes(date))
        resultDays.splice(resultDays.indexOf(date), 1);
      else resultDays.push(response.date);

      this.syncMarkDays = resultDays;
      this.$emit("update:markDays", this.syncMarkDays);
      this.$emit("onDayClick", response);
    },
    addMonth(n) {
      this.syncDisplayMonth = moment(this.syncDisplayMonth)
        .add(n, "month")
        .format("YYYY-MM-DD");
      this.$emit("update:displayMonth", this.syncDisplayMonth);
      this.days = this.calcCalendarDays();
    },

    checkDate(date) {
      if (this.disabledAfter && moment().isAfter(date, "day")) return false;

      if (this.maxDate && moment(date).isAfter(this.maxDate, "day"))
        return false;

      return true;
    },
  },
};
</script>

<style lang="scss" scoped>
.orderTime_box {
  .calendar-wrapper {
    color: #000000;
    font-size: 28rpx;
    font-weight: 530;
    text-align: center;
    background-color: #ffffff;
    padding-bottom: 10rpx;
    color: #646a6d;

    // 星期
    .week {
      display: flex;
      align-items: center;
      height: 97rpx;
      line-height: 97rpx;
      border-bottom: 2rpx solid #d9dcdd;

      .week-day {
        font-weight: 300;
      }

      .week-day:first-child,
      .week-day:last-child {
        font-weight: normal;
      }

      view {
        flex: 1;
      }
    }

    .content {
      position: relative;
      overflow: hidden;
      transition: height 0.4s ease;
      color: red;
      padding: 25rpx 0;

      .days {
        transition: top 0.3s;
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        position: relative;

        .item {
          position: relative;
          display: block;
          height: 50rpx;
          line-height: 50rpx;
          width: calc(100% / 7);
          font-size: 0;

          .day {
            font-size: 28rpx;
            font-style: normal;
            display: inline-block;
            vertical-align: middle;
            width: 50rpx;
            height: 50rpx;
            line-height: 50rpx;
            overflow: hidden;
            border-radius: 50%;
            color: #646a6d;

            &.selected {
              background-color: #9fcdff;
              background-color: var(--theme--main-color);
            }

            &.nolm {
              color: #c7c7c7;
              opacity: 0.3;
            }
          }

          .isWeekday {
            font-weight: 300;
          }

          .notSigned {
            font-style: normal;
            width: 8rpx;
            height: 8rpx;
            background: #fa7268;
            border-radius: 10rpx;
            position: absolute;
            left: 50%;
            bottom: 0;
            pointer-events: none;
          }

          .today {
            color: #fff;
            background-color: #a8c0ff;
          }

          .workDay {
            font-style: normal;
            width: 8rpx;
            height: 8rpx;
            background: #4d7df9;
            border-radius: 10rpx;
            position: absolute;
            left: 50%;
            bottom: 0;
            pointer-events: none;
          }

          .markDay {
            font-style: normal;
            width: 8rpx;
            height: 8rpx;
            background: #fc7a64;
            border-radius: 10rpx;
            position: absolute;
            left: 50%;
            bottom: 0;
            pointer-events: none;
          }
        }
      }
    }

    .hide {
      height: 80rpx !important;
    }

    .dropDown {
      width: 50rpx;
      height: 50rpx;
      background-color: #fc7a64;
    }

    .weektoggle {
      width: 100rpx;
      height: 30rpx;
      position: relative;
      bottom: -55rpx;
      left: 45%;
      background-color: #fe6766;
      border-radius: 0 0 20rpx 20rpx;
      padding: 10rpx;

      image {
        width: 25rpx;
        height: 18rpx;
      }
    }
  }
}

.day--lock {
  opacity: 0.3;
}
</style>

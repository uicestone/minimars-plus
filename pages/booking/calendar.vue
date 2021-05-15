<template lang="pug">
view.orderTime_box
  view.calendar-wrapper
    view(style='width: 750rpx; height: 120rpx')
    // 日历头部
    view.header
      .header_left
        view.header_data {{ date | date('YYYY年M月') }}
      .header_right
        view.left_icon(@click='addMonth(-1)')
          img(src='../../static/images/myOrderTime/left_time.png' mode='')
        view.right_icon(@click='addMonth(1)')
          img(src='../../static/images/myOrderTime/right_time.png' mode='')
    // 日历的星期
    view.week
      view.week-day(v-for='(item, index) in weekDay' :key='index') {{ item }}
    // 日历的天数
    // <view :class="{ hide: !monthOpen }" class="content" :style="{ height: height }">
    view.content(:style='{ height: height }')
      view.days(:style="{ top: positionTop + 'rpx' }")
        view.item(v-for='(item, index) in days' :key='index')
          view.day(@click='selectOne(item, $event)' :class='{\
          selected:\
          date === `${item.text}`,\
          today: isToday(item.year, item.month, item.date),\
          isWeekday: isWeekday(item),\
          }') {{ Number(item.date) }}
  // 到访时间
  view.visiting_time
    view.visiting_time_box
      view.visiting_time_box_sign .
      view.visiting_time_box-title
        view.visiting_time_box-title-time 到访时间
        // <view class="visiting_time_box-title-data">{{date}} </view>
        view.visiting_time_box-title-data {{ date | date('Y年M月D日') }}
        // {{y}} 年 {{m}} 月 {{d}} 日
    view.message_confirm_box
      view.message_confirm(@click='confirm')
        view.message_confirm_name 确认Submit

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
        return [];
      },
    },
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
  },
  data() {
    return {
      weektext: ["S", "M", "T", "W", "T", "F", "S"],
      days: [], // 当前月的日期数据
      positionTop: 0,
      monthOpen: true,
      headerBar: true, // 月份切换按钮
    };
  },
  onLoad() {
    this.days = this.calcCalendarDays();
    !this.open && this.toggle();
  },
  computed: {
    date: sync("booking/newBookingDate"),
    weekDay() {
      return this.weektext
        .slice(this.weekstart)
        .concat(this.weektext.slice(0, this.weekstart));
    },
    height() {
      return (this.days.length / 7) * 80 + "rpx";
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
      const date = moment(this.date);
      const weekText = ["日", "一", "二", "三", "四", "五", "六"];
      const formatWeek = "星期" + weekText[date.day()];
      return {
        date: date.format("YYYY-MM-DD"),
        week: formatWeek,
      };
    },
    // 获取当前月份数据
    calcCalendarDays() {
      const date = moment(this.date);
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
      for (let i = 0; i < this.markDays.length; i++) {
        let dy = `${y}-${m}-${d}`;
        if (this.markDays[i] == dy) {
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
      let selectD = new Date(date).getTime();
      let curTime = new Date().getTime();
      let week = new Date(date).getDay();
      let weekText = ["日", "一", "二", "三", "四", "五", "六"];
      let formatWeek = "星期" + weekText[week];
      let response = {
        date: date,
        week: formatWeek,
      };
      if (selectD > curTime) {
        if (this.disabledAfter) {
          return false;
        } else {
          this.$emit("onDayClick", response);
        }
      } else {
        this.$emit("onDayClick", response);
      }
      this.date = response.date;
    },
    addMonth(n) {
      this.date = moment(this.date).add(n, "month").format("YYYY-MM-DD");
      this.days = this.calcCalendarDays();
    },
  },
  filters: {
    date(date, format) {
      return moment(date).format(format);
    },
  },
};
</script>

<style lang="scss" scoped>
.orderTime_box {
  .calendar-wrapper {
    color: #000000;
    font-size: 28rpx;
    
    text-align: center;
    background-color: #ffffff;
    padding-bottom: 10rpx;

    .header {
      border-bottom: 5rpx solid #eeeeee;
      margin: 0 auto;
      width: 690rpx;
      display: flex;
      justify-content: space-between;
      height: 88rpx;
      color: #afd7ff;
      font-size: 25rpx;
      

      .header_left {
        .header_data {
          height: 80rpx;
          width: 200rpx;
          font-size: 30rpx;
          line-height: 80rpx;
        }
      }

      .header_right {
        display: flex;
        justify-content: space-between;
        margin-top: 15rpx;
        width: 100rpx;

        .left_icon,
        .right_icon {
          width: 40rpx;
          height: 40rpx;
          border-radius: 40rpx;
          background-color: #e6f5ff;
          line-height: 40rpx;
          display: flex;
          justify-content: center;
          align-items: center;

          image {
            width: 30rpx;
            height: 25rpx;
          }
        }
      }
    }

    // 星期
    .week {
      display: flex;
      align-items: center;
      height: 80rpx;
      line-height: 80rpx;

      .week-day {
        color: #949397;
      }

      .week-day:first-child {
        color: #9fcdff;
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

      .days {
        transition: top 0.3s;
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        position: relative;

        .item {
          position: relative;
          display: block;
          height: 80rpx;
          line-height: 80rpx;
          width: calc(100% / 7);

          .day {
            font-size: 28rpx;
            font-style: normal;
            display: inline-block;
            vertical-align: middle;
            width: 60rpx;
            height: 60rpx;
            line-height: 60rpx;
            overflow: hidden;
            border-radius: 30rpx 30rpx 30rpx 0;
            color: #9fcdff;

            &.selected {
              background-color: #9fcdff;
              color: #000000;
            }

            &.nolm {
              color: #c7c7c7;
              opacity: 0.3;
            }
          }

          .isWeekday {
            color: #000000;
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

  // 到访时间
  .visiting_time {
    font-size: 35rpx;
    

    .visiting_time_box {
      border-top: 5rpx solid #eeeeee;
      margin: 0 auto;
      width: 690rpx;
      display: flex;
      padding-top: 20rpx;
      border-bottom: 5rpx solid #eeeeee;

      .visiting_time_box_sign {
        font-size: 98rpx;
        color: #549eff;
        margin-top: -75rpx;
        margin-right: 15rpx;
        margin-left: -5rpx;
      }

      .visiting_time_box-title {
        & .visiting_time_box-title-time {
          color: #949296;
          margin-bottom: 15rpx;
        }

        // .visiting_time_box-title-time{
        // 	color: #949296;
        // }
        & .visiting_time_box-title-data {
          margin-bottom: 20rpx;
        }
      }
    }

    .message_confirm_box {
      margin: 55rpx auto;
      width: 690rpx;

      .message_confirm {
        margin: 0 auto;
        width: 328rpx;
        height: 104rpx;
        background: #9fcdff;
        box-shadow: 0rpx 10rpx 30rpx 0rpx rgba(215, 215, 215, 0.3);
        border-radius: 52rpx;

        .message_confirm_name {
          margin: 5rpx auto;
          width: 150rpx;
          height: 40rpx;
          font-size: 30rpx;
          text-align: center;
          
          color: #ffffff;
          line-height: 40rpx;
          padding-top: 10rpx;
        }
      }
    }
  }
}
</style>

<template>
  <view class="orderTime_box">
    <view class="calendar-wrapper">
      <view style="width: 750rpx; height: 120rpx"></view>
      <!-- 日历头部 -->
      <view class="header">
        <div class="header_left">
          <view class="header_data">{{ y + "年" + formatNum(m) + "月" }}</view>
        </div>
        <div class="header_right">
          <view class="left_icon" @click="changeMonth('pre')">
            <image src="../../static/images/myOrderTime/left_time.png" mode />
          </view>
          <view class="right_icon" @click="changeMonth('next')">
            <image src="../../static/images/myOrderTime/right_time.png" mode />
          </view>
        </div>
      </view>
      <!-- 日历的星期 -->
      <view class="week">
        <view class="week-day" v-for="(item, index) in weekDay" :key="index">
          {{
          item
          }}
        </view>
      </view>
      <!-- 日历的天数 -->
      <!-- <view :class="{ hide: !monthOpen }" class="content" :style="{ height: height }"> -->
      <view class="content" :style="{ height: height }">
        <view :style="{ top: positionTop + 'rpx' }" class="days">
          <view class="item" v-for="(item, index) in dates" :key="index">
            <view
              class="day"
              @click="selectOne(item, $event)"
              :class="{
                choose:
                  choose == `${item.year}-${item.month}-${item.date}` &&
                  item.isCurM,
                nolm: !item.isCurM,
                today: isToday(item.year, item.month, item.date),
                isWorkDay: isWorkDay(item.year, item.month, item.date),
              }"
            >{{ Number(item.date) }}</view>
            <!-- <view class="markDay" v-if="isMarkDay(item.year, item.month, item.date)&&item.isCurM"></view> -->
            <!-- <view class="today-text" v-if="isToday(item.year, item.month, item.date)">今</view> -->
          </view>
        </view>
      </view>
    </view>

    <!-- 到访时间 -->
    <view class="visiting_time">
      <view class="visiting_time_box">
        <view class="visiting_time_box_sign">.</view>
        <view class="visiting_time_box-title">
          <view class="visiting_time_box-title-time">到访时间</view>
          <!-- <view class="visiting_time_box-title-data">{{date}} </view> -->
          <view class="visiting_time_box-title-data">{{ y + "年" + formatNum(m) + "月" + d + "日" }}</view>
          <!-- {{y}} 年 {{m}} 月 {{d}} 日 -->
        </view>
      </view>
      <view class="message_confirm_box">
        <view class="message_confirm" @click="confirm">
          <view class="message_confirm_name">确认Submit</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
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
      y: new Date().getFullYear(), // 年
      m: new Date().getMonth() + 1, // 月
      d: new Date().getDate(),
      dates: [], // 当前月的日期数据
      positionTop: 0,
      monthOpen: true,
      choose: "",
      headerBar: true, // 月份切换按钮
      date: "",
      info: {
        timers: "",
        children: 0,
        adult: 0,
        storeId: "",
        storeName: "",
        play: "",
        card: "",
        cardID: "",
      },
    };
  },
  onLoad(option) {
    console.log(option, "option");
    this.info.timers = option.timers;
    this.y = Number(option.timers.substr(0, 4));
    this.m = Number(option.timers.substr(5, 2));
    this.d = Number(option.timers.substr(8, 2));
    this.info.card = option.card;
    this.info.cardID = option.cardID;
    this.info.children = option.children;
    this.info.adult = option.adult;
    this.info.storeId = option.storeId;
    this.info.play = option.play;
    this.info.storeName = option.storeName;
    this.dates = this.monthDay(this.y, this.m);
    !this.open && this.toggle();

    // console.log(this.info.rmb)
  },
  created() {
    this.dates = this.monthDay(this.y, this.m);
    // console.log(this.dates, "this.dates")
    !this.open && this.toggle();
  },
  mounted() {
    this.choose = this.getToday().date;
  },
  computed: {
    // 顶部星期栏
    weekDay() {
      return this.weektext
        .slice(this.weekstart)
        .concat(this.weektext.slice(0, this.weekstart));
    },
    height() {
      return (this.dates.length / 7) * 80 + "rpx";
    },
  },

  methods: {
    confirm() {
      console.log(this.date, "this.date");
      uni.reLaunch({
        url:
          "/pages/my/myOrder?date=" +
          this.date +
          "&info=" +
          JSON.stringify(this.info),
      });
    },
    formatNum(num) {
      let res = Number(num);
      return res < 10 ? "0" + res : res;
    },
    getToday() {
      let date = new Date();
      let y = date.getFullYear();
      let m = date.getMonth();
      let d = date.getDate();
      let week = new Date().getDay();
      let weekText = ["日", "一", "二", "三", "四", "五", "六"];
      let formatWeek = "星期" + weekText[week];
      let today = {
        // date: y + '-' + this.formatNum(m + 1) + '-' + this.formatNum(d),//当天
        date: this.y + "-" + this.formatNum(this.m) + "-" + this.d,
        week: formatWeek,
      };
      return today;
    },
    // 获取当前月份数据
    monthDay(y, month) {
      let dates = [];
      let m = Number(month);
      let firstDayOfMonth = new Date(y, m - 1, 1).getDay(); // 当月第一天星期几
      let lastDateOfMonth = new Date(y, m, 0).getDate(); // 当月最后一天
      let lastDayOfLastMonth = new Date(y, m - 2, 0).getDate(); // 上一月的最后一天
      let weekstart = this.weekstart == 7 ? 0 : this.weekstart;
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
        dates.push({
          date: this.formatNum(lastDayOfLastMonth - startDay + i),
          day: weekstart + i - 1 || 7,
          month: m - 1 >= 0 ? this.formatNum(m - 1) : 12,
          year: m - 1 >= 0 ? y : y - 1,
        });
      }
      for (let j = 1; j <= lastDateOfMonth; j++) {
        dates.push({
          date: this.formatNum(j),
          day: (j % 7) + firstDayOfMonth - 1 || 7,
          month: this.formatNum(m),
          year: y,
          isCurM: true, //是否当前月份
        });
      }
      for (let k = 1; k <= endDay; k++) {
        dates.push({
          date: this.formatNum(k),
          day: (lastDateOfMonth + startDay + weekstart + k - 1) % 7 || 7,
          month: m + 1 <= 11 ? this.formatNum(m + 1) : 0,
          year: m + 1 <= 11 ? y : y + 1,
        });
      }
      // console.log(dates);
      return dates;
    },
    isWorkDay(y, m, d) {
      //是否工作日
      let ymd = `${y}/${m}/${d}`;
      let formatDY = new Date(ymd.replace(/-/g, "/"));
      let week = formatDY.getDay();
      if (week == 0) {
        return false;
      } else {
        return true;
      }
      // if (week == 0 || week == 6) {
      // 	return false;
      // } else {
      // 	return true;
      // }
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
      let today = this.getToday().date;
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
        this.dates.forEach((i, x) => {
          this.isToday(i.year, i.month, i.date) && (index = x);
        });
        this.positionTop = -((Math.ceil((index + 1) / 7) || 1) - 1) * 80;
      }
    },
    // 点击回调
    selectOne(i, event) {
      console.log("dianjidianjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj");
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
      if (!i.isCurM) {
        // console.log('不在当前月范围内');
        return false;
      }
      if (selectD > curTime) {
        if (this.disabledAfter) {
          console.log("未来日期不可选");
          return false;
        } else {
          this.choose = date;
          this.$emit("onDayClick", response);
        }
      } else {
        this.choose = date;
        this.$emit("onDayClick", response);
      }
      // console.log(response,"1111111111111111111111111111111111111");
      this.date = response.date;
      console.log(this.date, "1111111111111111111111111111111111111");
      this.y = Number(i.year);
      this.m = Number(i.month);
      this.d = Number(i.date);
    },
    //改变年月
    changYearMonth(y, m) {
      this.dates = this.monthDay(y, m);
      this.y = y;
      this.m = m;
    },
    changeMonth(type) {
      if (type == "pre") {
        if (this.m + 1 == 2) {
          this.m = 12;
          this.y = this.y - 1;
        } else {
          this.m = this.m - 1;
        }
      } else {
        if (this.m + 1 == 13) {
          this.m = 1;
          this.y = this.y + 1;
        } else {
          this.m = this.m + 1;
        }
      }
      this.dates = this.monthDay(this.y, this.m);
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

    .header {
      border-bottom: 5rpx solid #eeeeee;
      margin: 0 auto;
      width: 690rpx;
      display: flex;
      justify-content: space-between;
      height: 88rpx;
      color: #afd7ff;
      font-size: 25rpx;
      font-weight: bold;

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
            font-style: normal;
            display: inline-block;
            vertical-align: middle;
            width: 60rpx;
            height: 60rpx;
            line-height: 60rpx;
            overflow: hidden;
            border-radius: 60rpx;
            color: #9fcdff;

            &.choose {
              background-color: #9fcdff;
              color: #000000;
            }

            &.nolm {
              color: #c7c7c7;
              opacity: 0.3;
            }
          }

          .isWorkDay {
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
    font-weight: 530;

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
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 540;
          color: #ffffff;
          line-height: 40rpx;
          padding-top: 10rpx;
        }
      }
    }
  }
}
</style>

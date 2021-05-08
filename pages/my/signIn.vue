<template lang="pug">
view.mysigninbox
  view.my_signin_top
  view.my_signin_content_box
    view.my_signin_content
      view.my_signin_daybox
        view.my_signin_day(v-for="(item, index) in signinImg", :key="index")
          view.my_signin_day_title {{ item.name }}
          view.my_signin_day_content
            //
              <view v-for="(i,j) in signinImg" :key="j">
              <image :src="i" class="signin_day" />
              </view>
            img.signin_day(:src="item.img")
        view.my_signin_day.my_signin_dayseve
          view.my_signin_day_title.my_signin_dayseve_title 第七天
          view.my_signin_day_content.my_signin_dayseve_content
            img.signin_dayseveimg(
              src="../../static/images/my/my_signin_Seven.png"
            )
      // 签到
      view.sigb_box
        view.sigb_box_btn 今日签到
        view.sigb_box_detail ？签到说明
</template>

<script>
export default {
  data() {
    return {
      signinImg: [
        {
          name: "第一天",
          img: "../../static/images/my/my_signin_one.png",
        },
        {
          name: "第二天",
          img: "../../static/images/my/my_signin_Two.png",
        },
        {
          name: "第三天",
          img: "../../static/images/my/my_signin_three.png",
        },
        {
          name: "第四天",
          img: "../../static/images/my/my_signin_Four.png",
        },
        {
          name: "第五天",
          img: "../../static/images/my/my_signin_Five.png",
        },
        {
          name: "第六天",
          img: "../../static/images/my/my_signin_Six.png",
        },
      ],
    };
  },
  methods: {},
};
</script>

<style lang="less">
.mysigninbox {
  width: 750rpx;
  min-height: 100vh;
  background: #f8f8f8;

  .my_signin_top {
    margin-top: 25rpx;
    width: 750rpx;
    height: 392rpx;
    background: #ededed;
  }

  .my_signin_content_box {
    .my_signin_content {
      width: 600rpx;
      margin: 85rpx auto;
      min-height: 600rpx;

      .my_signin_daybox {
        display: flex;
        flex-wrap: wrap;

        .my_signin_day {
          margin: 10rpx;
          width: 128rpx;
          height: 174rpx;
          background: #ffffff;
          border-radius: 16rpx;

          .my_signin_day_title {
            text-align: center;
            margin: 5rpx auto;
            width: 128rpx;
            height: 62rpx;
            background: #9fcdff;
            border-radius: 16rpx 16rpx 0rpx 0rpx;
            font-size: 22rpx;
            font-weight: 500;
            color: #ffffff;
            line-height: 62rpx;
          }

          .my_signin_day_content {
            width: 46rpx;
            height: 46rpx;
            margin: 30rpx auto;
            background: #d8d8d8;

            .signin_day {
              width: 46rpx;
              height: 46rpx;
            }
          }
        }

        .my_signin_dayseve {
          width: 276rpx;
          height: 174rpx;

          .my_signin_dayseve_title {
            width: 276rpx;
          }

          .my_signin_dayseve_content {
            width: 100rpx;
            height: 100rpx;
            background: #d8d8d8;
            margin: 5rpx 0rpx 5rpx 160rpx;

            .signin_dayseveimg {
              width: 100rpx;
              height: 100rpx;
            }
          }
        }
      }

      // 签到
      .sigb_box {
        margin-top: 20rpx;

        .sigb_box_btn {
          width: 382rpx;
          height: 102rpx;
          background: #ededed;
          border-radius: 51rpx;
          text-align: center;
          line-height: 102rpx;
          margin: 0 auto;
        }

        .sigb_box_detail {
          width: 110rpx;
          height: 32rpx;
          font-size: 22rpx;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #0d0d0d;
          line-height: 32rpx;
          margin: 10rpx auto;
        }
      }
    }
  }
}
</style>

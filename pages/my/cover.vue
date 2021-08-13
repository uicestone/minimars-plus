<template lang="pug">
.orderLlist
  div(
    style='\
  width: 100%;\
  display: flex;\
  justify-content: center;\
  flex-wrap: wrap;\
  '
  )
    div(style="width: 100%")
      mm-tabs(
        :list="tabsList",
        linecolor="#4A5BED",
        itemcolor="#405BE6",
        v-model="active",
        @input="tabsChange"
      )
    // 全部封面
    view.one(v-show="list1 == 0")
      view.allcover_box
        view.allcover_box_recommend
          view.allcover_box_recommend_title 推荐封面
          view.allcover_box_recommend_content_box
            view.allcover_box_recommend_content(
              v-for="(item, index) in userCoverImg",
              :key="index"
            )
              view.allcover_box_recommend_content_img(
                @click="open(index, item)"
              )
                img.image_img(:src="item.posterUrl", mode="aspectFill")
              view.allcover_box_recommend_content_name {{ item.title }}
        view.allcover_box_recommend
          view.allcover_box_recommend_title 节日主题
          view.allcover_box_recommend_content_box
            view.allcover_box_recommend_content(
              v-for="(item, index) in festivalCoverImg",
              :key="index"
            )
              view.allcover_box_recommend_content_img
                // <view class="allcover_box_recommend_content_img" @click="open(index)">
                // <image :src="item.posterUrl" mode="aspectFill" class="image_img" />
              view.allcover_box_recommend_content_name {{ item.title }}
    // 封面管理
    view.one(v-show="list1 == 1")
      view.allcover_box
        view.allcover_box_recommend(v-if="currentCoverBox == false")
          view.allcover_box_recommend_title 正在使用
          view.allcover_box_recommend_content_box
            view.allcover_box_recommend_content
              view.allcover_box_recommend_content_img
                img.image_img(:src="currentCover.posterUrl", mode="aspectFill")
              view.allcover_box_recommend_content_name {{ currentCover.title }}
        view.allcover_box_recommend
          view.allcover_box_recommend_title 我的封面
          view.allcover_box_recommend_content_box
            view.allcover_box_recommend_content(
              v-for="(item, index) in getCovers",
              :key="index"
            )
              view.allcover_box_recommend_content_img(@click="useCover(item)")
                img.image_img(:src="item.posterUrl", mode="aspectFill")
              view.allcover_box_recommend_content_name {{ item.title }}
  // 详情  弹框
  uni-popup(ref="popup", type="center")
    view.gift_box
      view.gift_boximg
        img.giftImage(:src="alertImg", mode="aspectFill")
        view.gift_box_clear
          img.gift_box_clear_right(
            src="../../static/images/clear.png",
            @click="close()"
          )
      view.gift_boximg_detail
        view.gift_boximg_detail_left 当前封面：{{ alertPriceInPoints }}积分
        view.gift_boximg_detail_right_box(@click="buyuserCover()")
          view.gift_boximg_detail_right 兑换使用
</template>

<script>
import uniPopup from "@/components/uni-popup/uni-popup.vue";
import { sync } from "vuex-pathify";

export default {
  components: {
    uniPopup,
  },
  computed: {
    user: sync("auth/user"),
  },
  data() {
    return {
      userCoverImg: [], //封面
      festivalCoverImg: [], //节日主题
      orderlists: [],
      alertImg: "", //弹框封面
      alertPriceInPoints: 0, //弹框积分
      alertId: "",
      covers: {
        id: "",
        posterUrl: "",
        title: "",
      },
      currentCover: {}, //正在使用
      currentCoverBox: false,
      getCovers: [], //我的封面
      replaceCovers: "", //替换封面  id
      list1: 0,
      tabsList: [
        {
          title: "全部封面",
        },
        {
          title: "封面管理",
        },
      ],
      active: 0,
    };
  },
  onShow() {
    this.userCover(); //推荐封面
    this.myCover(); //我的封面
    this.festivalCover(); //节日主题
  },
  onLoad(option) {
    if (option.active) {
      this.active = 1;
      this.list1 = 1;
    }
  },
  methods: {
    tabsChange(e) {
      if (this.active == 0) {
        console.log("全部封面");
        this.list1 = 0;
      } else if (this.active == 1) {
        this.list1 = 1;
        console.log("封面管理");
      }
    },
    // 推荐封面列表
    userCover() {
      this.$axios
        .getRequest("/gift", {
          isCover: 1,
        })
        .then((res) => {
          this.userCoverImg = res;
          console.log(res, "res个人");
          this.myCover(); //我的封面
        });
    },
    // 节日主题
    festivalCover() {
      this.$axios.getRequest("/gift").then((res) => {
        this.festivalCoverImg = res;
        console.log(res, "节日主题");
      });
    },
    // 打开弹框
    open(index, item) {
      console.log(item, "item");
      this.alertId = item.id;
      this.alertPriceInPoints = item.priceInPoints;
      this.alertImg = item.posterUrl;
      console.log(index);
      this.$refs.popup.open();
    },
    close() {
      this.$refs.popup.close();
    },
    // 购买用户封面
    buyuserCover() {
      this.$axios
        .postRequest("/booking", {
          type: "gift",
          gift: this.alertId,
        })
        .then((res) => {
          console.log(res, "购买封面");
          this.myCover();
          this.active = 1;
          this.list1 = 1;
          this.$refs.popup.close();
        });
    },
    // 更换封面
    useCover(item) {
      this.replaceCovers = item.id;
      this.$axios
        .putRequest("/user/" + this.user.id, {
          currentCover: this.replaceCovers,
        })
        .then((res) => {
          this.userCover(); //推荐封面
          this.myCover(); //我的封面
        });
    },
    // 封面管理,我的封面
    myCover() {
      this.$axios
        .getRequest("/auth/user", {
          covers: this.covers,
          currentCover: this.currentCover,
        })
        .then((res) => {
          console.log(res, "res  myCover");
          this.getCovers = res.covers;
          if (this.currentCover) {
            // console.log(this.currentCover,"this.currentCover")
            this.currentCover = res.currentCover;
            this.currentCoverBox = false;
          } else {
            this.currentCoverBox = true;
          }
          console.log(this.currentCover, "this.getCovers");
        });
    },
  },
};
</script>

<style lang="less">
.orderLlist {
  width: 750rpx;
  height: 100vh;
  background-color: #f8f8f8;

  .allcover_box {
    // border: 1px solid red;
    width: 700rpx;
    margin-top: 100rpx;

    .allcover_box_recommend {
      margin-bottom: 20rpx;

      .allcover_box_recommend_title {
        width: 120rpx;
        height: 42rpx;
        font-size: 30rpx;

        color: #0d0d0d;
        margin-left: 10rpx;
        margin-top: 20rpx;
      }

      .allcover_box_recommend_content_box {
        display: flex;
        flex-wrap: wrap;

        .allcover_box_recommend_content {
          margin-left: 5.5rpx;
          margin-right: 10.5rpx;
          // margin: 0 auto;
          margin-top: 30rpx;

          .allcover_box_recommend_content_img {
            width: 218rpx;
            height: 204rpx;
            background: #ededed;
            border-radius: 20rpx;

            .image_img {
              width: 218rpx;
              height: 204rpx;
              border-radius: 20rpx;
            }
          }

          .allcover_box_recommend_content_name {
            font-size: 24rpx;

            color: #666666;
            margin-left: 10rpx;
            margin-top: 10rpx;
          }
        }
      }
    }
  }

  // 详情弹框
  .gift_box {
    width: 570rpx;
    min-height: 750rpx;
    background: #ffffff;
    border-radius: 38rpx;

    .gift_boximg {
      width: 570rpx;
      height: 630rpx;
      border-radius: 42rpx 42rpx 0rpx 0rpx;
      position: relative;

      .giftImage {
        width: 570rpx;
        height: 630rpx;
        border-radius: 36rpx 36rpx 0rpx 0rpx;
      }

      .gift_box_clear {
        position: absolute;
        right: 20rpx;
        top: 20rpx;

        .gift_box_clear_right {
          width: 40rpx;
          height: 40rpx;
        }
      }
    }

    .gift_boximg_detail {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 570rpx;
      height: 120rpx;
      background: #ffffff;
      border-radius: 0rpx 0rpx 42rpx 42rpx;

      .gift_boximg_detail_left {
        width: 214rpx;
        height: 36rpx;
        font-size: 26rpx;

        color: #0d0d0d;
        line-height: 36rpx;
        margin: 10rpx auto;
      }

      .gift_boximg_detail_right_box {
        width: 232rpx;
        height: 120rpx;
        background: #9fcdff;
        border-radius: 0rpx 0rpx 42rpx 0rpx;
        // line-height: 100rpx;

        .gift_boximg_detail_right {
          margin: 40rpx auto;
          text-align: center;
          font-size: 26rpx;

          color: #ffffff;
        }
      }
    }
  }
}
</style>

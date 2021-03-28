<template>
  <view class="myOrder_box">
    <!-- 门店选择 -->
    <view class="myOrder_top">
      <view class="storesToChoose">
        <view class="storesToChoose_choose">
          <view class="title">
            <image src="../../static/images/index/index_orderOne.png"></image>
            <view>门店选择</view>
          </view>
          <view class="content">
            <span>
              <lbPicker
                :props="myProps"
                mode="selector"
                :value="mendian"
                :list="doorChoose1"
                @confirm="confirms"
                @cancel="cancels"
                :footers="false"
              >
                <view slot="cancel-text">取消</view>
                <view slot="action-center">门店选择</view>
                <view slot="confirm-text">确定</view>
                <view class="uni-input">{{ mendian }}</view>
              </lbPicker>
            </span>
            <image src="../../static/images/search.png"></image>
          </view>
          <view class="title">
            <image src="../../static/images/index/index_orderTwo.png"></image>
            <view>到访时间</view>
          </view>
          <view class="content content_two" @click="goCalendar()">
            <input type="text" value="timers" v-model="timers" disabled="" />
            <image
              src="../../static/images/right.png"
              class="content_right"
            ></image>
          </view>
          <view class="title">
            <image src="../../static/images/index/index_orderThree.png"></image>
            <view>进场人数</view>
          </view>
          <view class="content">
            <span>
              <lbPicker
                :props="myProps"
                mode="unlinkedSelector"
                :value="classifyIndex"
                :list="classifyArr"
                list-key="id"
                :footers="true"
                @confirm="confirmspeople"
                @cancel="cancelspeople"
                @change="change"
              >
                <view slot="cancel-text">儿童（位）</view>
                <view slot="confirm-text">成人（位）</view>
                <view class="uni-input">{{ name }}</view>
                <view slot="picker-bottom_left">取消Cancel</view>
                <view slot="picker-bottom_right">确定 Submit</view>
              </lbPicker>
            </span>
            <image
              src="../../static/images/right.png"
              class="content_right"
            ></image>
          </view>
        </view>
      </view>
    </view>
    <view class="orderSpace"> </view>
    <view class="modeOf_Payment">
      <view class="modeOf_Payment_title"> 更多优惠支付方式 </view>
      <scroll-view scroll-x="true" class="modeOf_Payment-box">
        <view class="modeOf_Payment_scroll">
          <view
            class="modeOf_Payment_box"
            v-for="(item, index) in card"
            :key="index"
          >
            <image
              :src="item.posterUrl"
              :class="[confircard2 == index ? '' : 'confircard']"
              v-if="correspondingStoresAndCards == false"
            ></image>
            <image
              :src="item.posterUrl"
              @click="open(index, item.id, item)"
              :class="[confircard2 == index ? 'confircard' : '']"
              v-if="correspondingStoresAndCards == true"
            ></image>
            <view class="modeOf_Payment_box_name">
              {{ item.title }}
              <view style="color: #9fcdff; font-size: 24rpx; margin-top: 5rpx"
                >Rmb<span style="font-size: 33rpx">{{ item.price }}</span></view
              >
            </view>
          </view>
          <view class="modeOf_Payment_box">
            <view
              class="modeOf_Payment_box_btn"
              style="
                position: relative;
                border: 1px solid #d8d8d8;
                background-color: #d8d8d8;
              "
            >
              <view @click="goBuyCards">
                <view
                  style="
                    background-color: #9fcdff;
                    width: 80rpx;
                    height: 80rpx;
                    border-radius: 50%;
                    margin: 70rpx auto;
                  "
                >
                  <view
                    style="
                      color: #ffffff;
                      margin-bottom: 50rpx;
                      font-size: 56rpx;
                      font-weight: bold;
                      text-align: center;
                    "
                    >+</view
                  >
                </view>
              </view>
            </view>
            <view class="modeOf_Payment_box_name"> 点击购买新卡 </view>
          </view>
        </view>
        <!-- 礼品卡  弹框 -->
        <uni-popup ref="popup" type="center">
          <view class="gift_box">
            <view class="gift_box_clear">
              <view class="gift_box_clear_left"></view>
              <image
                class="gift_box_clear_right"
                src="../../static/images/clear.png"
                @click="close()"
              ></image>
            </view>
            <view class="gift_contentBox">
              <view class="gift_contentBox_title"> 礼品卡使用说明 </view>
              <scroll-view scroll-y="true" class="gift_contentBox_box">
                <view class="gift_contentBox_boxContent">
                  <rich-text :nodes="cardContent"></rich-text>
                </view>
              </scroll-view>
              <view class="gift_contentBox_btn" @click="giftCardConfirm">
                <view class="gift_contentBox_btn_name"> 确认 Agree </view>
              </view>
            </view>
          </view>
        </uni-popup>
      </scroll-view>
      <!-- 订单支付 -->
      <view class="modeOf_Payment_order">
        <view class="modeOf_Payment_order_money"> 订单总价：{{ rmb }}元 </view>
        <!--  -->
        <view class="modeOf_Payment_order_play" @click="goPlay">
          <view class="modeOf_Payment_order_play_name"> 订单支付Payment </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import uniPopup from "@/components/uni-popup/uni-popup.vue";
import lbPicker from "../../components/lb-picker/index.vue";
export default {
  components: {
    lbPicker,
    uniPopup,
  },
  data() {
    return {
      stores: "", //门店
      mendian: "",
      index: 0,
      doorChoose1: [],
      y: new Date().getFullYear(), // 年
      m: new Date().getMonth() + 1, // 月
      d: new Date().getDate(),
      timers: "",
      name: "1儿童 ，1成人",
      children: 1,
      adult: 1,
      rmb: 0,
      classifyArr: [
        [
          {
            label: "0",
            value: "0",
          },
          {
            label: 1,
            value: 1,
          },
          {
            label: 2,
            value: 2,
          },
          {
            label: 3,
            value: 3,
          },
          {
            label: 4,
            value: 4,
          },
          {
            label: 5,
            value: 5,
          },
        ],
        [
          {
            label: "0",
            value: 0,
          },
          {
            label: 1,
            value: 1,
          },
          {
            label: 2,
            value: 2,
          },
          {
            label: 3,
            value: 3,
          },
          {
            label: 4,
            value: 4,
          },
          {
            label: 5,
            value: 5,
          },
        ],
      ],
      classifyIndex: [0, 0], // picker - 索引
      childArr: [], // 二级分类数据源
      checkImage1: " ",
      confircard2: -1,
      // 订单支付
      ticketOrderPayment: {
        store: " ", //门店ID
        date: "", //到访时间
        kidsCount: 0, //儿童人数
        adultsCount: 0, //成人人数
        card: "", //礼品卡ID
      },
      card: [], //礼品卡
      cardContent: "", //礼品卡使用说明
      cardId: "",
      clacPrice: {
        store: "",
        date: "",
        kidsCount: 0, //儿童人数
        adultsCount: 0, //成人人数
      },
      isinfo: false, //判断是不是从日历进来的
      correspondingStoresAndCards: true, //显示是否对应门店和卡
    };
  },
  onLoad(option) {
    if (uni.getStorageSync("storeName")) {
      console.log("有默认门店");
      this.mendian = uni.getStorageSync("storeName");
      this.ticketOrderPayment.store = uni.getStorageSync("storeId");
    } else {
      this.mendian = "";
      console.log("没有默认门店");
    }

    if (option.info) {
      this.isinfo = true;
      let info = JSON.parse(option.info);
      // console.log(info,11111)
      this.name = info.children + "儿童" + "  ，" + info.adult + "成人";
      this.children = info.children;
      this.adult = info.adult;
      this.timers = info.timers;
      this.ticketOrderPayment.store = info.storeId;
      this.confircard2 = info.card;
      this.ticketOrderPayment.card = info.cardID; //卡片ID 不是ID
      this.mendian = info.storeName;
      this.classifyIndex = [
        info.children === "0" ? info.children : parseInt(info.children),
        info.adult === "0" ? info.adult : parseInt(info.adult),
      ];
    } else {
      this.isinfo = false;
    }

    if (option.date) {
      // console.log(option.date)
      this.timers = option.date;
    }
    this.goStore();
    this.goCard();
    this.getprice();
    // 获取数据源并分出一级二级分类
    // this.getAllClassify()
  },
  // onShow() {
  // 	if (uni.getStorageSync("")) {
  // 		console.log("有默认门店")
  // 		this.mendian = uni.getStorageSync("storeName")
  // 		this.ticketOrderPayment.store = uni.getStorageSync("storeId")

  // 	} else {
  // 		this.mendian = ""
  // 		console.log("没有默认门店")
  // 	}

  // },
  created() {
    this.name;
    this.m = this.m > 9 ? this.m : "0" + this.m;
    this.d = this.d > 9 ? this.d : "0" + this.d;
    this.timers = this.y + "-" + this.m + "-" + this.d;
    // this.confirms()
  },
  methods: {
    // 门店
    goStore() {
      this.$axios.getRequest("/store").then((res) => {
        this.stores = res;
        // this.mendian=res[0].name
        console.log(res, "门店");
        if (this.isinfo == false) {
          this.mendian = res[0].name;
          this.ticketOrderPayment.store = res[0].id;
        }
        res.forEach((item) => {
          this.doorChoose1.push(item.name);
        });
      });
    },
    // 获取门店ID
    getStore() {
      this.stores.forEach((item) => {
        if (item.name == this.mendian) {
          this.ticketOrderPayment.store = item.id;
          this.getprice();
        }
      });
    },
    // 卡片
    goCard() {
      this.$axios.getRequest("/card").then((res) => {
        this.card = res;
        console.log("this.cardContnt=res.content", res);
        res.forEach((c) => {
          if (this.ticketOrderPayment.store == c.stores) {
            this.correspondingStoresAndCards = true;
            console.log("等于");
          } else {
            this.correspondingStoresAndCards = false;
            console.log("不等于");
          }
        });
      });
    },
    // 去购卡
    goBuyCards() {
      this.goCard();
      uni.redirectTo({
        url: "../index/marsCoupon",
      });
    },
    // 计算价格
    getprice() {
      this.$axios
        .postRequest("/booking-price", {
          date: this.timers,
          kidsCount: this.children,
          adultsCount: this.adult,
          store: this.ticketOrderPayment.store,
          type: "play",
        })
        .then((res) => {
          // console.log(res)
          this.rmb = res.price;
          console.log(this.rmb, "方法");
        });
    },

    // 订单支付
    goPlay() {
      this.ticketOrderPayment.date = this.timers; //时间
      this.ticketOrderPayment.kidsCount = this.children; //儿童人数
      this.ticketOrderPayment.adultsCount = this.adult; //成人人数
      this.ticketOrderPayment.type = "play";
      this.$axios
        .postRequest("/booking", this.ticketOrderPayment)
        .then((res) => {
          // console.log(res, "订单支付")
          if (res.payments[0].payArgs) {
            //唤起微信支付
            uni.requestPayment({
              provider: "wxpay",
              timeStamp: res.payments[0].payArgs.timeStamp,
              nonceStr: res.payments[0].payArgs.nonceStr,
              package: res.payments[0].payArgs.package,
              signType: "MD5",
              paySign: res.payments[0].payArgs.paySign,
              success: function (res) {
                console.log("success:" + JSON.stringify(res));
                uni.showToast({
                  title: "支付成功",
                  duration: 2000,
                });
              },
              fail: function (err) {
                console.log("fail:" + JSON.stringify(err));
              },
            });
          } else {
            this.goOrder(); //跳转订单
            uni.showToast({
              title: "购买成功",
              duration: 2000,
            });
          }
        });
    },
    change(e) {},
    // 跳转订单页面
    goOrder() {
      uni.redirectTo({
        url: "myOrderlist?active=1",
      });
    },
    //日历
    goCalendar() {
      uni.navigateTo({
        // url: '../my/myOrderTime?name=' + this.name + "&mendian=" + this.mendian + "&card=" + this.confircard2 + "&rmb="+this.rmb
        url:
          "../my/myOrderTime?timers=" +
          this.timers +
          "&children=" +
          this.children +
          "&adult=" +
          this.adult +
          "&storeId=" +
          this.ticketOrderPayment.store +
          "&storeName=" +
          this.mendian +
          "&play=" +
          "play" +
          "&card=" +
          this.confircard2 +
          "&cardID=" +
          this.ticketOrderPayment.card,
      });
    },

    confirms(e) {
      this.mendian = e.value;
      this.getStore();
      this.goCard();
      this.getprice();
    },
    cancels(e) {},
    confirmspeople(e) {
      // console.log(e, "e")
      this.children = Number(e.item[0].label);
      this.adult = Number(e.item[1].label);
      this.classifyIndex = e.index;
      this.getprice();
      this.name = this.children + "儿童" + "  ，" + this.adult + "成人";
    },
    cancelspeople(e) {},
    open(index, id, item) {
      console.log(index, id, item, "index,id");
      this.cardContent = item.content;
      if (this.confircard2 === index) return (this.confircard2 = -1);
      console.log(this.confircard2);
      console.log(index, id);
      if (index) {
        !index;
      }
      this.ticketOrderPayment.card = id;
      this.$refs.popup.open();
      this.checkImage1 = index;
    },
    close() {
      this.$refs.popup.close();
    },
    // 礼品卡确认
    giftCardConfirm() {
      this.$refs.popup.close();

      this.confircard2 = this.checkImage1;
    },
    // 获取数据源并分出一级二级
    getAllClassify() {
      let dataLen = this.dataSource.length;
      for (let i = 0; i < dataLen; i++) {
        // 将数据源中的二级分类 push 进 childArr，作为二级分类的数据源
        this.childArr.push(this.dataSource[i].child);
      }
      // 一级分类的数据源
      this.classifyArr[0] = this.dataSource;

      // 第一次打开时，默认给一级分类添加它的二级分类
      this.classifyArr[1] = this.childArr[0];
    },
    // 选择商品分类
    classifyChange(e) {
      let value = e.target.value;
      this.classifyIndex = value;
      if (this.classifyArr[0].length != 0) {
        this.name = this.classifyArr[0][this.classifyIndex[0]].name;
      }
      if (this.classifyArr[1].length != 0) {
        this.name += "," + this.classifyArr[1][this.classifyIndex[1]].name;
      }
    },
    // 获取二级分类
    columnchange(e) {
      // 当滚动切换一级分类时，为当前的一级分类添加它的子类
      if (e.detail.column == 0) {
        // #ifdef H5
        // 在小程序中直接赋值无效  H5 可直接赋值
        this.classifyArr[1] = this.childArr[e.detail.value];
        // #endif

        // #ifdef MP-WEIXIN
        // 在 H5 环境下 $set 会导致一级分类无法滚动， 小程序正常运行
        this.$set(this.classifyArr, 1, this.childArr[e.detail.value]);
        // #endif
      }
    },
  },
};
</script>

<style lang="less">
.myOrder_box {
  background-color: #f8f8f8;
  // min-height: 1100rpx;
  height: 100vh;

  // 门店选择
  .myOrder_top {
    position: relative;
    width: 750rpx;
    height: 330rpx;
    background: #d8d8d8;

    .storesToChoose {
      height: 520rpx;
      position: absolute;
      margin-top: 85rpx;
      right: 30rpx;
      width: 690rpx;
      display: flex;
      justify-content: space-around;
      background: #ffffff;
      box-shadow: 0rpx 4rpx 4rpx 4rpx rgba(0, 0, 0, 0.03);
      border-radius: 20rpx;

      .storesToChoose_choose {
        height: 170rpx;

        .title {
          display: flex;
          margin-top: 20rpx;

          image {
            width: 40rpx;
            height: 40rpx;
            background: #d8d8d8;
          }

          view {
            margin-left: 15rpx;
            width: 112rpx;
            height: 40rpx;
            font-size: 28rpx;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #949397;
            line-height: 40rpx;
          }
        }

        .content {
          width: 594rpx;
          height: 80rpx;
          line-height: 80rpx;
          border-radius: 40rpx;
          border: 4rpx solid #dfdfdf;
          display: flex;
          justify-content: space-between;
          margin-top: 15rpx;

          input {
            margin-left: 15rpx;
            font-size: 30rpx;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 500;
            color: #373447;
            margin-top: 20rpx;
          }

          span {
            width: 550rpx;
            margin-left: 15rpx;
            font-size: 30rpx;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 500;
            color: #373447;
          }

          image {
            width: 31rpx;
            height: 31rpx;
            margin-right: 25rpx;
            margin-top: 28rpx;
          }
        }

        // 到访时间
        .content_two {
          width: 352rpx;
          height: 80rpx;
          border-radius: 40rpx;
          border: 4rpx solid #dfdfdf;
        }
      }
    }
  }

  .orderSpace {
    width: 750rpx;
    height: 300rpx;
  }

  // 更多优惠
  .modeOf_Payment {
    // border: 1px solid red;
    min-height: 620rpx;

    .modeOf_Payment_title {
      width: 690rpx;
      margin: 0 auto;
      font-size: 28rpx;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 600;
      color: #373447;
      margin-bottom: 20rpx;
    }

    .modeOf_Payment-box {
      .modeOf_Payment_scroll {
        display: flex;
        // justify-content: space-around;
        width: 690rpx;
        margin: 0 auto;

        .modeOf_Payment_box {
          margin: 0 20rpx;
          opacity: 1;

          image {
            width: 280rpx;
            height: 230rpx;
            border-radius: 10rpx;
          }

          // 确定
          .confircard {
            opacity: 0.6;
          }

          .modeOf_Payment_box_btn {
            width: 280rpx;
            height: 230rpx;
            border-radius: 10rpx;
          }

          .modeOf_Payment_box_name {
            font-size: 25rpx;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 600;
            color: #373447;
            margin: 10rpx 0;
          }
        }
      }

      // 礼品卡弹框
      .gift_box {
        width: 600rpx;
        height: 940rpx;
        background: #ffffff;
        border-radius: 52rpx;
        background: #ffffff;

        .gift_box_clear {
          padding-top: 30rpx;
          width: 560rpx;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;

          .gift_box_clear_left {
            width: 40rpx;
            height: 40rpx;
          }

          .gift_box_clear_right {
            width: 40rpx;
            height: 40rpx;
          }
        }

        .gift_contentBox {
          width: 600rpx;
          margin: 0 auto;
          text-align: center;

          .gift_contentBox_title {
            width: 220rpx;
            // height: 42rpx;
            font-size: 30rpx;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
            color: #1a1a1a;
            line-height: 42rpx;
            margin: 20rpx auto;
          }

          .gift_contentBox_box {
            width: 570rpx;
            height: 690rpx;
            margin: 0 auto;

            .gift_contentBox_boxContent {
              text-align: left;
            }
          }

          .gift_contentBox_btn {
            width: 246rpx;
            height: 78rpx;
            background: #9fcdff;
            border-radius: 39rpx;
            margin: 0 auto;
            margin-top: 15rpx;

            .gift_contentBox_btn_name {
              width: 78rpx;
              height: 40rpx;
              font-size: 28rpx;
              text-align: center;
              font-family: PingFangSC-Medium, PingFang SC;
              font-weight: 500;
              color: #ffffff;
              line-height: 35rpx;
              margin: 0 auto;
              padding: 5rpx 0;
            }
          }
        }
      }
    }

    .modeOf_Payment_order {
      display: flex;
      justify-content: space-between;
      width: 666rpx;
      // height: 140rpx;
      margin: 0 auto;
      line-height: 140rpx;
      margin-top: 55rpx;

      .modeOf_Payment_order_money {
        font-size: 30rpx;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 550;
        color: #373447;
        margin-top: 40rpx;
      }

      .modeOf_Payment_order_play {
        margin-top: 35rpx;
        background-color: #9fcdff;
        width: 220rpx;
        height: 95rpx;
        border-radius: 70rpx;

        .modeOf_Payment_order_play_name {
          margin: 5rpx auto;
          font-size: 28rpx;
          text-align: center;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 540;
          color: #ffffff;
          line-height: 35rpx;
          padding-top: 10rpx;
        }
      }
    }
  }
}
</style>

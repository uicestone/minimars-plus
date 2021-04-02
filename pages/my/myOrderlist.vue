<template>
  <div class="orderLlist">
    <div
      style="
        width: 100%;
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
      "
    >
      <div style="width: 100%">
        <tabs
          :list="tabsList"
          lineColor="#4A5BED"
          itemColor="#405BE6"
          v-model="active"
          @input="tabsChange"
        ></tabs>
      </div>
      <!-- 已点餐 -->
      <view class="one" v-show="list1 == 0">
        <view class="haveOrder_box" v-if="QRCodeHide">
          <!-- scan a QR code -->
          <view class="haveOrder_scan_box">
            <view class="haveOrder_scan">
              <view class="haveOrder_scan-code"></view>
              <view class="haveOrder_scan_content">您还没有点餐 快去点点东西吧</view>
              <view class="haveOrder_scan_btn">
                <span>去点单</span>
              </view>
            </view>
          </view>
        </view>
        <view class="accomplish_border" v-if="QRCodeHide == false">
          <view class="accomplish_box" v-for="(i, t) in ReservedOrders" :key="t">
            <view class="accomplish_top">
              <view class="accomplish_top_title_box">
                <view class="accomplish_top_title">
                  <view class="accomplish_top_titlename">{{ i.store.name }}</view>
                  <span class="accomplish_top_date">{{ i.updatedAt }}</span>
                </view>
                <view class="accomplish_top_btn_box">
                  {{ i.status }}
                  <image src="../../static/images/111.png" class="accomplish_top_btn" />
                </view>
              </view>
            </view>
            <view class="accomplish_contentbox" @click="open()">
              <view class="accomplish_contentbox_left">
                <scroll-view scroll-x="true" class="modeOf_Payment-box">
                  <view class="modeOf_Payment_scroll">
                    <view class="modeOf_Payment_box" v-for="(item, index) in i.items" :key="index">
                      <image :src="item.productImageUrl" />
                    </view>
                  </view>
                </scroll-view>
              </view>
              <view class="accomplish_contentbox_right">
                <view>共{{ i.items.length }}件</view>
                <view class="accomplish_contentbox_right_money">
                  ￥
                  <span>0</span>
                </view>
              </view>
            </view>
          </view>
        </view>
      </view>
      <!-- 已预约 -->
      <view class="one" v-show="list1 == 1">
        <view class="appointment_box" v-for="(item, index) in ReservedOrders" :key="index">
          <view class="appointment_box_title">
            <view>{{ item.date }}</view>
            <view style="font-size: 28rpx">{{ item.status }}</view>
          </view>
          <view class="appointment_box_name">
            <view class="appointment_box_nameTitle">{{ item.title }}</view>
            {{ item.kidsCount }}小孩{{ item.adultsCount }}大人
          </view>
        </view>
      </view>
      <!-- 已完成 -->
      <view class="one" v-show="list1 == 2">
        <view class="accomplish_border">
          <view class="accomplish_box" v-for="(item, index) in ReservedOrders" :key="index">
            <view class="accomplish_top">
              <view class="accomplish_top_title_box">
                <view class="accomplish_top_title">
                  <view class="accomplish_top_titlename">{{ item.title }}</view>
                  <span class="accomplish_top_date">{{ item.date }}</span>
                </view>
                <view class="accomplish_top_btn_box">
                  {{ item.status }}
                  <image src="../../static/images/111.png" class="accomplish_top_btn" />
                </view>
              </view>
            </view>
            <view class="accomplish_contentbox" @click="open()">
              <view class="accomplish_contentbox_left">
                <scroll-view scroll-x="true" class="modeOf_Payment-box">
                  <view class="modeOf_Payment_scroll">
                    <view class="modeOf_Payment_box">
                      <image src="../../static/images/224.jpg" />
                    </view>
                  </view>
                </scroll-view>
              </view>
              <view class="accomplish_contentbox_right">
                <view>共一件</view>
                <view class="accomplish_contentbox_right_money">
                  ￥
                  <span>395.9</span>
                </view>
              </view>
            </view>
          </view>
          <!-- two -->
          <!-- <view class="accomplish_box">
						<view class="accomplish_top">
							<view class="accomplish_top_title_box">
								<view class="accomplish_top_title">
									<view class="accomplish_top_titlename">
										长宁天山店
									</view>
									<span class="accomplish_top_date">2020-12-18 18:24:29</span>
								</view>
								<view class="accomplish_top_btn_box">
									已完成
									<image src="../../static/images/111.png" class="accomplish_top_btn" />
								</view>
							</view>
						</view>
						<view class="accomplish_contentbox" @click="open()">
							<view class="accomplish_contentbox_left">
								<scroll-view scroll-x="true" class="modeOf_Payment-box">
									<view class="modeOf_Payment_scroll">
										<view class="modeOf_Payment_box" v-for="(item,index) in 3" :key="index">
											<image src="../../static/images/224.jpg" />
										</view>
									</view>
								</scroll-view>
							</view>
							<view class="accomplish_contentbox_right">
								<view>共三件</view>
								<view class="accomplish_contentbox_right_money">￥<span>395.9</span></view>
							</view>
						</view>
					</view>
          <!-- 详情  弹框-->
          <uni-popup ref="popup" type="center">
            <view class="gift_box">
              <view class="gift_box_clear">
                <view class="gift_box_clear_left">长宁天山店</view>
                <image
                  class="gift_box_clear_right"
                  src="../../static/images/clear.png"
                  @click="close()"
                />
              </view>
              <view class="listdetail_box" v-for="(item, index) in 3" :key="index">
                <view class="listdetail_box_content">
                  <image src="../../static/images/224.jpg" class="listdetail_box_contentimg" />
                  <view class="listdetail_box_content_titlebox">
                    <view class="listdetail_box_content_titlebox_left">
                      <view class="listdetail_box_content_titlebox_left_name">猪肋排</view>
                      <view class="listdetail_box_content_titlebox_left_number">X 1</view>
                    </view>
                    <view class="listdetail_box_content_titlebox_right">¥ 140</view>
                  </view>
                </view>
              </view>
              <view class="gift_box_clear count_box">
                <view class="gift_box_clear_left"></view>
                <view class="count_box_right">总计 ¥ 560</view>
              </view>
            </view>
          </uni-popup>
        </view>
      </view>
      <view class="one" v-show="list1 == 3">
        <view class="appointment_box" v-for="(item, index) in ReservedOrders" :key="index">
          <view class="appointment_box_title">
            <view>{{ item.date }}</view>
            <view style="font-size: 28rpx">{{ item.status }}</view>
          </view>
          <view class="appointment_box_name">
            <view class="appointment_box_nameTitle">{{ item.title }}</view>
            {{ item.kidsCount }}小孩{{ item.adultsCount }}大人
          </view>
        </view>
      </view>
    </div>
  </div>
</template>

<script>
import uniPopup from "@/components/uni-popup/uni-popup.vue";
import tabs from "@/components/tabs/tabs.vue";
export default {
  components: {
    tabs,
    uniPopup,
  },
  data() {
    return {
      orderlists: [],
      list1: 0,
      tabsList: [
        {
          title: "已点餐",
        },
        {
          title: "已预约",
        },
        {
          title: "已完成",
        },
        {
          title: "已取消",
        },
      ],
      active: 0,
      ReservedOrders: [], //已取消   已完成  已预约
      QRCodeHide: true, //点餐二维码显示隐藏
    };
  },
  onLoad(option) {
    if (option.active) {
      this.active = 1;
      this.list1 = 1;
    }
    this.getdetail("food");
    this.list1 = 0;
  },
  methods: {
    tabsChange(e) {
      if (this.active == 0) {
        console.log("已点餐");
        this.getdetail("food");
        this.list1 = 0;
      } else if (this.active == 1) {
        this.getdetail("play", "booked"); //已预约this
        this.list1 = 1;
        console.log("已预约");
      } else if (this.active == 2) {
        this.getdetail("play", "finishedd"); //已完成
        this.list1 = 2;
        console.log("已完成");
      } else if (this.active == 3) {
        this.getdetail("play", "canceled"); //已取消
        this.list1 = 3;
        console.log("已取消");
      }
    },
    open() {
      this.$refs.popup.open();
    },
    close() {
      this.$refs.popup.close();
    },
    getdetail(type, status) {
      let info = {};
      if (status) {
        info = {
          type,
          status,
        };
      } else {
        info = {
          type,
        };
      }
      this.$axios.getRequest("/booking", info).then((res) => {
        this.ReservedOrders = res; //获取订单列表
        //判断数组是否有长度
        if (this.ReservedOrders.length) {
          this.QRCodeHide = false;
          console.log("数组有长度，二维码隐藏");
        } else {
          this.QRCodeHide = true;
          console.log("数组为空，二维码显示");
        }

        // console.log(this.ReservedOrders,"this.ReservedOrders")
        res.forEach((r, index) => {
          if (r.status == "pending") {
            r.status = "待付款";
          } else if (r.status == "booked") {
            r.status = "已确认";
          } else if (r.status == "in_service") {
            r.status = "已入场";
          } else if (r.status == "pending_refund") {
            r.status = "待撤销";
          } else if (r.status == "finished") {
            r.status = "已完成";
          } else if (r.status == "canceled") {
            r.status = "已取消";
          }
        });
      });
    },
  },
};
</script>

<style lang="less">
.orderLlist {
  width: 750rpx;
  min-height: 100vh;
  background-color: #f8f8f8;

  // 已点餐
  .haveOrder_box {
    .haveOrder_scan_box {
      .haveOrder_scan {
        text-align: center;
        margin-top: 220rpx;

        .haveOrder_scan-code {
          width: 300rpx;
          height: 300rpx;
          margin: 0 auto;
          background: #efefef;
          margin-bottom: 30rpx;
        }

        .haveOrder_scan_content {
          width: 168rpx;
          height: 68rpx;
          font-size: 24rpx;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #666666;
          line-height: 34rpx;
          margin: 0 auto;
        }

        .haveOrder_scan_btn {
          width: 276rpx;
          height: 114rpx;
          background: #9fcdff;
          box-shadow: 0rpx 4rpx 4rpx 2rpx rgba(0, 0, 0, 0.05);
          border-radius: 57rpx;
          margin: 0 auto;
          margin-top: 50rpx;

          span {
            width: 108rpx;
            height: 50rpx;
            font-size: 36rpx;
            font-family: PingFangSC-Semibold, PingFang SC;
            font-weight: 600;
            color: #ffffff;
            line-height: 100rpx;
          }
        }
      }
    }

    .accomplish_border {
      .accomplish_box {
        border: 1px solid red;
        margin-top: 20rpx;
        width: 710rpx;
        height: 320rpx;
        background: #ffffff;
        border-radius: 20rpx;

        .accomplish_top {
          margin-right: 20rpx;
          margin-left: 20rpx;
          padding-top: 25rpx;

          .accomplish_top_title_box {
            height: 100rpx;
            display: flex;
            justify-content: space-between;

            .accomplish_top_title {
              .accomplish_top_titlename {
                font-size: 30rpx;
                font-family: PingFangSC-Medium, PingFang SC;
                font-weight: 500;
                color: #222222;
              }

              span {
                font-size: 20rpx;
                font-family: PingFangSC-Regular, PingFang SC;
                font-weight: 400;
                color: #666666;
              }
            }

            .accomplish_top_btn_box {
              width: 128rpx;
              height: 36rpx;
              font-size: 26rpx;
              font-family: PingFangSC-Regular, PingFang SC;
              font-weight: 400;
              color: #666666;
              line-height: 125rpx;

              .accomplish_top_btn {
                width: 10rpx;
                height: 20rpx;
                margin-left: 20rpx;
              }
            }
          }
        }

        .accomplish_contentbox {
          margin-right: 20rpx;
          margin-left: 20rpx;
          margin-top: 25rpx;
          display: flex;
          justify-content: space-between;

          .accomplish_contentbox_left {
            width: 450rpx;

            .modeOf_Payment-box {
              .modeOf_Payment_scroll {
                display: flex;
                // width: 690rpx;
                margin: 0 auto;

                .modeOf_Payment_box {
                  margin: 0 10rpx 0 0;

                  image {
                    width: 120rpx;
                    height: 120rpx;
                    border-radius: 10rpx;
                  }
                }
              }
            }
          }

          .accomplish_contentbox_right {
            margin-top: 80rpx;
            width: 210rpx;
            display: flex;
            justify-content: space-between;

            view {
              width: 72rpx;
              height: 34rpx;
              font-size: 24rpx;
              font-family: PingFangSC-Regular, PingFang SC;
              font-weight: 400;
              color: #666666;
              line-height: 34rpx;
            }

            .accomplish_contentbox_right_money {
              width: 114rpx;
              height: 48rpx;
              font-size: 22rpx;
              font-family: PingFangSC-Medium, PingFang SC;
              font-weight: 500;
              color: #222222;
              line-height: 32rpx;

              span {
                font-size: 34rpx;
              }
            }
          }
        }
      }
    }
  }

  // 已预约
  .appointment_box {
    margin: 20rpx 0;
    width: 650rpx;
    height: 160rpx;
    background: #ffffff;
    border-radius: 20rpx;
    padding: 15rpx;

    .appointment_box_title {
      display: flex;
      justify-content: space-between;
      margin: 15rpx 5rpx 10rpx 5rpx;

      view {
        height: 44rpx;
        font-size: 32rpx;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #666666;
        line-height: 44rpx;
      }
    }

    .appointment_box_name {
      height: 84rpx;
      font-size: 30rpx;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 550;
      color: #222222;
      line-height: 42rpx;

      .appointment_box_nameTitle {
        width: 470rpx;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
  }

  //已完成
  .accomplish_border {
    // 详情弹框
    .gift_box {
      width: 602rpx;
      min-height: 808rpx;
      background: #ffffff;
      border-radius: 38rpx;

      .gift_box_clear {
        padding-top: 30rpx;
        width: 540rpx;
        margin: 35rpx auto;
        display: flex;
        justify-content: space-between;

        .gift_box_clear_left {
          width: 150rpx;
          height: 42rpx;
          font-size: 30rpx;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: #222222;
          line-height: 42rpx;
        }

        .gift_box_clear_right {
          width: 40rpx;
          height: 40rpx;
        }

        .count_box_right {
          width: 162rpx;
          height: 42rpx;
          font-size: 30rpx;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: #0d0d0d;
          line-height: 42rpx;
        }
      }

      .count_box {
        padding-bottom: 25rpx;
      }

      .listdetail_box {
        width: 540rpx;
        margin: 0 auto;

        .listdetail_box_content {
          margin-top: 40rpx;
          display: flex;
          justify-content: space-between;

          .listdetail_box_contentimg {
            width: 100rpx;
            height: 100rpx;
            border-radius: 20rpx;
          }

          .listdetail_box_content_titlebox {
            width: 410rpx;
            display: flex;
            justify-content: space-between;

            .listdetail_box_content_titlebox_left {
              .listdetail_box_content_titlebox_left_name {
                width: 90rpx;
                height: 42rpx;
                font-size: 30rpx;
                font-family: PingFangSC-Regular, PingFang SC;
                font-weight: 400;
                color: #0d0d0d;
                line-height: 42rpx;
              }

              .listdetail_box_content_titlebox_left_number {
                width: 40rpx;
                height: 42rpx;
                font-size: 26rpx;
                font-family: PingFangSC-Medium, PingFang SC;
                font-weight: 500;
                color: #999999;
                line-height: 75rpx;
              }
            }

            .listdetail_box_content_titlebox_right {
              height: 42rpx;
              font-size: 30rpx;
              font-family: PingFangSC-Medium, PingFang SC;
              font-weight: 500;
              color: #0d0d0d;
              line-height: 42rpx;
            }
          }
        }
      }
    }

    .accomplish_box {
      margin-top: 20rpx;
      width: 710rpx;
      height: 320rpx;
      background: #ffffff;
      border-radius: 20rpx;

      .accomplish_top {
        margin-right: 20rpx;
        margin-left: 20rpx;
        padding-top: 25rpx;

        .accomplish_top_title_box {
          height: 100rpx;
          display: flex;
          justify-content: space-between;

          .accomplish_top_title {
            .accomplish_top_titlename {
              font-size: 30rpx;
              font-family: PingFangSC-Medium, PingFang SC;
              font-weight: 500;
              color: #222222;
            }

            span {
              font-size: 20rpx;
              font-family: PingFangSC-Regular, PingFang SC;
              font-weight: 400;
              color: #666666;
            }
          }

          .accomplish_top_btn_box {
            width: 128rpx;
            height: 36rpx;
            font-size: 26rpx;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #666666;
            line-height: 125rpx;

            .accomplish_top_btn {
              width: 10rpx;
              height: 20rpx;
              margin-left: 20rpx;
            }
          }
        }
      }

      .accomplish_contentbox {
        margin-right: 20rpx;
        margin-left: 20rpx;
        margin-top: 25rpx;
        display: flex;
        justify-content: space-between;

        .accomplish_contentbox_left {
          width: 450rpx;

          .modeOf_Payment-box {
            .modeOf_Payment_scroll {
              display: flex;
              // width: 690rpx;
              margin: 0 auto;

              .modeOf_Payment_box {
                margin: 0 10rpx 0 0;

                image {
                  width: 120rpx;
                  height: 120rpx;
                  border-radius: 10rpx;
                }
              }
            }
          }
        }

        .accomplish_contentbox_right {
          margin-top: 80rpx;
          width: 210rpx;
          display: flex;
          justify-content: space-between;

          view {
            width: 72rpx;
            height: 34rpx;
            font-size: 24rpx;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #666666;
            line-height: 34rpx;
          }

          .accomplish_contentbox_right_money {
            width: 114rpx;
            height: 48rpx;
            font-size: 22rpx;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
            color: #222222;
            line-height: 32rpx;

            span {
              font-size: 34rpx;
            }
          }
        }
      }
    }
  }
}
</style>

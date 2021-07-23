import store from "../store/index.js";
import axios from "./request.js";
import { createOrder } from "./wechat.js";

export async function create(body = {}, paymentGateway = "") {
  uni.showLoading();
  const booking = await axios.postRequest(
    "/booking" + (paymentGateway ? `?paymentGateway=${paymentGateway}` : ""),
    body
  );
  uni.hideLoading();
  const wechatPayment = booking.payments.find((p) => p.gateway === "wechatpay");
  if (wechatPayment) {
    await createOrder(wechatPayment.payArgs);
  } else if (booking.status === "pending") {
    uni.showToast({
      title: "订单创建失败",
      icon: "none",
    });
  }
  paymentSuccess(booking);
}

export function paymentSuccess(booking) {
  let toTab = 0;
  if (booking.type === "food" && booking.status === "in_service") {
    toTab = 0;
  } else if (["in_service", "booked"].includes(booking.status)) {
    toTab = 1;
  } else if (booking.status === "canceled") {
    toTab = 3;
  } else {
    toTab = 2;
  }

  uni.redirectTo({
    url: "/pages/my/bookings?active=" + toTab,
    success() {
      store.state.booking.foodCart = [];
    },
  });
}

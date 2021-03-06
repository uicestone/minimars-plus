import store from "../store/index.js";
import axios from "./request.js";
import { createOrder } from "./wechat.js";
import sleep from "./sleep";

export async function create(
  body = {},
  paymentGateway = "",
  useBalance = true
) {
  uni.showLoading();
  const booking = await axios.postRequest(
    `/booking?useBalance=${useBalance}` +
      (paymentGateway ? `&paymentGateway=${paymentGateway}` : ""),
    body
  );
  await sleep(1500);
  uni.hideLoading();
  const wechatPayment = booking.payments.find((p) => p.gateway === "wechatpay");
  if (wechatPayment) {
    try {
      await createOrder(wechatPayment.payArgs);
    } catch (e) {
      await axios.putRequest("/booking/" + booking.id, { status: "canceled" });
      throw e;
    }
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
  if (
    booking.type === "food" &&
    !["finished", "in_service"].includes(booking.status)
  ) {
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

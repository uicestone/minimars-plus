import axios from "./request.js";
import { createOrder } from "./wechat.js";

export async function create(body = {}, atStore = null) {
  let url = "/card";

  if (atStore) {
    url += `?atStore=${atStore}`;
  }

  uni.showLoading();
  const card = await axios.postRequest(url, body);
  uni.hideLoading();

  const wechatPayment = card.payments.find((p) => p.gateway === "wechatpay");

  if (wechatPayment) {
    await createOrder(wechatPayment.payArgs);
  } else if (card.status === "pending") {
    uni.showToast({
      title: "订单创建失败",
      icon: "none",
    });
  }

  paymentSuccess(card);
}

export function paymentSuccess(card) {
  let url = "/pages/my/cards";
  if (card.type === "coupon") {
    url += "?type=coupon";
  }
  uni.redirectTo({
    url,
  });
}

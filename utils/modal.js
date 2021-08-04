export function alert(title, content, confirmText = "确定") {
  return new Promise((resolve) => {
    uni.showModal({
      title,
      content,
      confirmText,
      showCancel: false,
      success: resolve,
    });
  });
}

export function confirm(
  title,
  content,
  confirmText = "确定",
  confirmColor = "",
  cancelText = "取消"
) {
  return new Promise((resolve, reject) => {
    uni.showModal({
      title,
      content,
      confirmText,
      confirmColor: confirmColor || "#92ffac",
      cancelText,
      cancelColor: "#646a6d",
      showCancel: true,
      success({ confirm }) {
        if (confirm) {
          resolve();
        } else {
          reject();
        }
      },
    });
  });
}

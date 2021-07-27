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
  cancelText = "取消"
) {
  return new Promise((resolve, reject) => {
    uni.showModal({
      title,
      content,
      confirmText,
      cancelText,
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

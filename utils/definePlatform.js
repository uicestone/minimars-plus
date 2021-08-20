export function definePlatform() {
  let platform = "unknown";

  // #ifdef MP-WEIXIN
  platform = "wechat";
  // #endif

  // #ifdef MP-TOUTIAO
  platform = "byte";
  // #endif

  return platform;
}

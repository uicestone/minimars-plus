<script>
import { sync } from "vuex-pathify";
import { login as wechatLogin } from "@/utils/wechat";
import loadFont from "@/utils/loadFont";

export default {
  computed: {
    auth: sync("auth"),
    config: sync("config"),
  },
  async onLaunch() {
    console.log("App Launch on platform:", this.$platform);
    try {
      uni.showLoading({ mask: true });

      const [config, stores] = await Promise.all([
        this.$axios.getRequest("/config"),
        this.$axios.getRequest("/store"),
      ]);

      this.config.common = config;
      this.config.stores = stores;

      loadFont("Gotham", 300, "Gotham-Light.woff2");
      loadFont("Gotham", 500, "Gotham-Medium.woff2");
      loadFont("Gotham", 900, "Gotham-Ultra.woff2");

      if (!this.auth.token) {
        const auth = await wechatLogin();
        Object.assign(this.auth, auth);
      } else {
        const user = await this.getAuthUser();
        this.auth.user = user;
      }

      this.auth.isNew = !this.auth.user.mobile;

      this.auth.onMobileSet.then(() => {
        const { slug = undefined } = this.config.common.welcomeRewardCard;
        if (!this.auth.isNew || !slug) return;
        setTimeout(() => {
          uni.navigateTo({ url: "../card/buy?slug=" + slug });
          this.auth.isNew = false;
        }, 2e3);
      });

      this.$launched();

      uni.hideLoading();
    } catch (e) {
      console.error(e);
    }
  },
  onShow() {
    console.log("App Show");
  },
  onHide() {
    console.log("App Hide");
  },
  methods: {
    async getAuthUser() {
      const user = await this.$axios.getRequest("/auth/user");
      console.log("Get auth user:", user);
      return user;
    },

    // 自适应富文本内图片宽度
    fixRichTextImg(content) {
      return content.replace(
        /\<img/gi,
        '<img style="max-width:100%;height:auto;display:block;"'
      );
    },
  },
};
</script>

<style>
@import url("./utils/all.min.css");
page {
  --theme--main-color: #92ffac;
  --theme--deputy-color: #b9dcfc;
  --theme--font-size-s: 22rpx;
  --theme--font-size-m: 28rpx;
  --theme--font-size-l: 36rpx;
  --theme--font-main-color: #646a6d;
  --theme--font-deputy-color: #aaaeaf;
  --theme--bg-main-color: #edeeef;
  --theme--font-weight-light: 300;
  --theme--font-weight-medium: 500;
  --theme--border-radius: 20rpx;
  --theme--box-shadow: 3rpx 3rpx 8rpx 3rpx rgba(0, 0, 0, 0.1);
}

* {
  margin: 0;
  padding: 0;
}

html {
  font-weight: var(--theme--font-weight-medium);
  font-size: var(--theme--font-size-m);
  color: var(--theme--font-main-color);
  font-family: Gotham, "PingFang SC", sans-serif;
}
</style>

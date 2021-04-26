<script>
import { sync } from "vuex-pathify";
import wechatLogin from "@/utils/wechatLogin";

export default {
  computed: {
    auth: sync("auth"),
  },
  async onLaunch() {
    console.log("App Launch");
    //全局配置
    this.config = await this.$axios.getRequest("/config");

    try {
      uni.showLoading({ mask: true });
      if (!this.auth.token) {
        const auth = await wechatLogin();
        Object.assign(this.auth, auth);
      } else {
        const user = await this.getAuthUser();
        this.auth.user = user;
      }
      // this.$launched();
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
  },
};
</script>

<style>
/*每个页面公共css */
* {
  margin: 0;
  padding: 0;
}
</style>

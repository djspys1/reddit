<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "app",
  components: {
    // Home
  },
  computed: {
    ...mapGetters([
      "isLogin"
    ])
  },

  created() {
    this.$store.dispatch("InitContract").then(() => {
        if (!this.isLogin && this.$route.name !== "login") {
          this.$router.replace({ name: "login" });
        }
      })
      .catch(() => {
        this.$router.replace({ name: "login" });
      })
  }
}
</script>

<style lang="less">
	@import "./assets/css/index.less";
</style>

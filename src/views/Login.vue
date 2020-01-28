<template>
  <div class="login">
    <div class="login-header">
      <img class="login-header-logo" src="../assets/images/gray_near_logo.svg" alt="reddit logo" />
      <p><span role="img" aria-label="fish">🐟</span>welcome to use reddit<span role="img" aria-label="fish">🐟</span></p>
      <p><span role="img" aria-label="chain">⛓</span> this is created by nisen <span role="img" aria-label="chain">⛓</span></p>
      <img src="../assets/images/near.svg" class="app-logo margin-logo" alt="logo" />
    </div>
    <div id="signed-out-flow" class="login-footer">
      <button class="sign-in-button" @click="readySign">Sign-in</button>
    </div>
  </div>
</template>

<script>

export default {
  name: "login",
  data() {
    return {};
  },
  watch: {
    isLogin(val) {
      if (val) {
        this.$router.push({ name: "home" }).catch(e => {console.log(e)});
      }
    }
  },
  methods: {
    readySign() {
      this.$store.dispatch("InitContract").then(() => {
        this.sign();
      });
    },
    sign() {
      this.$store.dispatch("doWork");
    }
  }
};
</script>

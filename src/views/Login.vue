<template>
  <div>
    <div class="image-wrapper">
      <img style="width:33%;" src="../assets/gray_near_logo.svg" alt="reddit logo" />
      <p><span role="img" aria-label="fish">🐟</span>welcome to use reddit<span role="img" aria-label="fish">🐟</span></p>
      <p><span role="img" aria-label="chain">⛓</span> this is created by nisen <span role="img" aria-label="chain">⛓</span></p>
      <img src="../assets/near.svg" class="App-logo margin-logo" alt="logo" />
      <p id="speech" class="speech"></p>
    </div>
    <div id="signed-out-flow" class="d-none">
      <button id="sign-in-button" @click="signIn">Sign-in</button>
    </div>
  </div>
</template>

<script>

export default {
  name: "login",
  data() {
    return {}
  },
  methods: {
    signIn() {
      this.$store.dispatch("doWork").then(() => {
        this.$router.push({name: 'home'})
      })
    }
  }
}
</script>

<style lang="less" scoped>
.image-wrapper {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
}
.d-none {
  text-align: center;
}
.App-logo {
  animation: App-logo-spin infinite 20s linear;
  pointer-events: none;
}

.margin-logo {
  margin: 20px;
}

@keyframes App-logo-spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

button {
  padding: 5px;
  color: #0072CE;
  border-radius: 10px;
  border: 3px solid #0072CE;
}

button:hover {
  cursor: pointer;
  color: white;
  background: #0072CE;
}

.speech {
  font-size: 1.5rem;
  color: #0072CE;
  text-shadow: 1px 1px #D1CCBD;
}
</style>

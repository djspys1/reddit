<template>
  <Row class="vote">
    <Row class="up" @click="awesome"><Icon type="md-arrow-round-up"/></Row>
    <Row class="up-number">{{ voteNumber }}</Row>
    <Row class="down" @click="low"><Icon type="md-arrow-round-down"/></Row>
  </Row>
</template>

<script>
export default {
  name: "Vote",
  props: {
    voteNumber: {
      default: 0
    }
  },
  methods: {
    // 赞
    awesome() {
      this.$store.dispatch("userLike")
    },
    // 踩
    low() {
      this.$store.dispatch("userLike")
    }
  }
}
</script>

<style lang="less" scoped>
.vote {
  width: 50px;
  text-align: center;
  .up,
  .down {
    cursor: pointer;
  }
}
</style>

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
    },
    item: null
  },
  methods: {
    // 赞
    awesome() {
      this.$store.dispatch("UserLikeOrNot", {id: this.item.id, like_or_not: 1})
    },
    // 踩
    low() {
      this.$store.dispatch("UserLikeOrNot", {id: this.item.id, like_or_not: -1})
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

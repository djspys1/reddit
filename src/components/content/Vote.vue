<template>
  <Row class="vote">
    <Row class="up"><Icon @click="awesome" :color="awesomeColor" type="md-arrow-round-up"/></Row>
    <Row class="up-number" :style="numberColor">{{ item.likes }}</Row>
    <Row class="down"><Icon :color="lowColor" @click="low" type="md-arrow-round-down"/></Row>
  </Row>
</template>

<script>
export default {
  name: "Vote",
  props: {
    item: null
  },
  computed: {
    awesomeColor() {
      if (this.item.likes === "1") {
        return "red"
      } else {
        return "black"
      }
    },
    lowColor() {
      if (this.item.likes === "-1") {
        return "blue"
      } else {
        return "black"
      }
    },
    numberColor() {
      if (this.item.likes === "1") {
        return "color: red"
      } else if (this.item.likes === "-1") {
        return "color: blue"
      } else {
        return "color: black"
      }
    }
  },
  methods: {
    // 赞
    awesome() {
      let data = {}
      if (this.item.likes === "1") {
        data = {
          id: this.item.post_id,
          like_or_not: 0
        }
      } else {
        data = {
          id: this.item.post_id,
          like_or_not: 1
        }
      }
      this.$store.dispatch("UserLikeOrNot", data).then(res => {
        if (res === 0) {
          this.$emit('changeVote' )
        }
      })
    },
    // 踩
    low() {
      let data = {}
      if (this.item.likes === "-1") {
        data = {
          id: this.item.post_id,
          like_or_not: 0
        }
      } else {
        data = {
          id: this.item.post_id,
          like_or_not: -1
        }
      }
      this.$store.dispatch("UserLikeOrNot", data).then(res => {
        if (res === 0) {
          this.$emit('changeVote')
        }
      })
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

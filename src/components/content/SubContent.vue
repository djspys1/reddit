<template>
  <List>
    <ListItem v-for="item in lists" :key="item.id">
      <Row style="width: 100%;height: 50px;">
        <i-col style="line-height: 50px;" :span="2" :offset="1">
          <Button type="primary" @click="subscription(item)">订阅</Button>
        </i-col>
        <i-col :span="20">
          <div class="sub-name">{{ item.name || "默认名称" }}</div>
          <div class="sub-description">{{ item.description }}</div>
        </i-col>
      </Row>
    </ListItem>
  </List>
</template>

<script>
export default {
  name: "SubContent",
  data() {
    return {
      lists: []
    };
  },
  watch: {
    "$store.state.contract"(val) {
      if (val && val.contractId) {
        this.getSubs();
      }
    }
  },
  created() {
    if (this.$store.state.contract && this.$store.state.contract.contractId) {
      this.getSubs();
    }
  },
  methods: {
    /**
     * 获取栏目列表
     */
    getSubs() {
      this.lists = []
      this.$store.dispatch("GetSubReddits").then(res => {
        res.forEach(item => {
          this.$store.dispatch("GetSubReddit", item).then(response => {
            this.lists.push(response[0]);
          });
        });
      });
    },
    /**
     * 订阅栏目
     */
    subscription(item) {
      this.$Spin.show({
        render: h => {
          return h("div", [
            h("Icon", {
              class: "demo-spin-icon-load",
              props: {
                type: "ios-loading",
                size: 18
              }
            }),
            h("div", "订阅中")
          ]);
        }
      });
      this.$store
        .dispatch("PostSubReddit", { subreddit_id: item.id })
        .then(res => {
          if (res) {
            this.getSubs();
            this.$Spin.hide();
          } else {
            this.$Spin.hide();
            this.$Message.error("订阅失败");
          }
        })
        .catch(() => {
          this.$Message.error("网络错误");
        });
    }
  }
};
</script>

<style lang="less" scoped>
.sub-name {
  color: blue;
}
</style>

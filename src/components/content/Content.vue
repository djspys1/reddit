<template>
  <div class="content">
    <Row>
      <i-col :span="20">
        <Row>
          <i-col :span="24" class="content-tab">
            <div class="spacer">
              <span class="dropdown-title lightdrop">popular in: </span>
              <div class="dropdown lightdrop">
                <span class="selected">Everywhere</span>
                <Icon type="md-arrow-dropdown" />
              </div>
            </div>
          </i-col>
        </Row>
        <List>
          <ListItem v-for="item in 10" :key="item">
            {{ item }}
            <vote :vote-number="voteNumber"></vote>
            文本列表
          </ListItem>
        </List>
      </i-col>
      <i-col :span="4"></i-col>
    </Row>
  </div>
</template>

<script>
import Vote from "./Vote";
export default {
  name: "Content",
  data() {
    return {
      voteNumber: 0
    };
  },
  created() {
    this.getPosts()
    this.getVotes()
  },
  methods: {
    // 获取帖子列表
    getPosts() {
      this.$store.dispatch("GetPosts")
    },
    // 获取点赞数量，此处暂用假数据替代
    getVotes() {
      this.voteNumber =  parseInt(Math.random() * (1000 - 1 + 1) + 1, 10);
    }
  },
  components: { Vote }
};
</script>

<style lang="less" scoped>
.content {
  &-tab {
    border-bottom: 1px dotted gray;
    padding: 5px 10px;
    margin: 5px;
    overflow: hidden;
    font-size: 12px;
    .spacer {
      display: flex;
      .selected {
        text-decoration: underline;
      }
    }
  }
}
</style>

<template>
  <div class="content">
    <Row>
      <i-col :span="20">
        <List>
          <ListItem v-for="item in 10" :key="item">
            {{ item }}
            <vote :vote-number="voteNumber" :item="item"></vote>
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
      voteNumber: 0,
      lists: []
    };
  },
  watch: {
    "$store.state.contract"(val) {
      if (val && val.contractId) {
        this.getPosts();
      }
    }
  },
  created() {
    if (this.$store.state.contract && this.$store.state.contract.contractId) {
      this.getPosts();
    }
  },
  methods: {
    // 获取帖子列表
    getPosts() {
      this.$store.dispatch("GetPosts").then(res => {
        if (res.objs === null || res.objs.length === 0) {
          this.$Message.info("去订阅感兴趣的subreddits!");
        } else {
          const obj_ids = res.objs;
          console.log(obj_ids)
          obj_ids.forEach(item => {
            this.getPost(item)
          });
        }
      });
    },
    /**
     * 获取单个帖子内容
     * @param item
     */
    getPost(item) {
      this.$store.dispatch("GetPost", { id: item }).then(resDetail => {
        console.log(item)
        console.log(resDetail)
        if (resDetail && resDetail.length) {
          const SubmitLikeObj = resDetail[0];
          this.getPostTitles(item, SubmitLikeObj)
        } else {
          this.$Message.info(`该帖子id:${item} 获取失败`);
        }
      });
    },
    // 获取帖子title
    getPostTitles(item, SubmitLikeObj) {
      this.$store
        .dispatch("GetPostTitle", { id: SubmitLikeObj.submit_id })
        .then(resTitle => {
          if (resTitle.length === 0) {
            this.$Message.error(`获取帖子id:${item}对应的title失败`);
          } else {
            const r = resTitle[0]; // 这里本来应该返回单个对象，但由于某些限制，总是用数组包装后返回
            console.log(r);
          }
        });
    },
    // 获取点赞数量，此处暂用假数据替代
    getVotes() {
      this.voteNumber = parseInt(Math.random() * (1000 - 1 + 1) + 1, 10);
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

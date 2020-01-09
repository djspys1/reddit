<template>
  <div class="content">
    <Row>
      <i-col :span="20">
        <List>
          <ListItem v-for="item in lists" :key="item.post_id">
            {{ item.post_id }}
            <vote :item="item" @changeVote="getPosts"></vote>
            {{item.title}}
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
      this.lists = []
      this.$store.dispatch("GetPosts").then(res => {
        if (res.objs === null || res.objs.length === 0) {
          this.$Message.info("去订阅感兴趣的subreddits!");
        } else {
          const obj_ids = res.objs;
          obj_ids.forEach(item => {
            this.$store.dispatch("GetPost", { id: item }).then(resDetail => {
              if (resDetail && resDetail.length) {
                const SubmitLikeObj = resDetail[0];
                this.$store
                  .dispatch("GetPostTitle", { id: SubmitLikeObj.submit_id })
                  .then(resTitle => {
                    if (resTitle.length === 0) {
                      this.$Message.error(`获取帖子id:${item}对应的title失败`);
                    } else {
                      const r = resTitle[0]; // 这里本来应该返回单个对象，但由于某些限制，总是用数组包装后返回
                      this.lists.push({
                        ...r,
                        post_id: item,
                        like_or_not: SubmitLikeObj.like_or_not,
                      })
                    }
                  });
              } else {
                this.$Message.info(`该帖子id:${item} 获取失败`);
              }
            });
          });
        }
      });
    },
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

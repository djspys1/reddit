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
    return {};
  },
  computed: {
    voteNumber() {
      return parseInt(Math.random() * (1000 - 1 + 1) + 1, 10);
    }
  },
  methods: {
    // this.$store.dispatch()
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

<template>
  <div class="publish-post">
    <Row>
      <i-col :span="12" :offset="6">
        <Form
            ref="formValidate"
            :model="formItem"
            :label-width="100"
            :rules="ruleValidate"
        >
          <FormItem label="标题" prop="title">
            <i-input v-model="formItem.title" placeholder="请输入名称"></i-input>
          </FormItem>
          <FormItem label="栏目" prop="subreddit_id">
            <Select v-model="formItem.subreddit_id">
              <Option v-for="list in lists" :key="list.id" :value="list.id">{{list.name || '无名称'}}</Option>
            </Select>
          </FormItem>
          <FormItem label="类型" prop="type">
            <Select v-model="formItem.type">
              <Option value="0">文本</Option>
              <Option value="1">超链接</Option>
            </Select>
          </FormItem>
          <FormItem>
            <Button style="margin-left: 50px" type="default" @click="back()"
            >返回</Button
            >
            <Button type="primary" style="margin-left: 40px" @click="publish('formValidate')"
            >创建</Button
            >
          </FormItem>
        </Form>
      </i-col>
    </Row>
  </div>
</template>

<script>
export default {
  name: "publish",
  data() {
    return {
      formItem: {
        title: "",
        subreddit_id: "",
        type: "",
      },
      ruleValidate: {
        title: [{ required: true, message: "请输入名称", trigger: "blur" }],
        subreddit_id: [
          { required: true, message: "请选择栏目", trigger: "change" }
        ],
        type: [
          { required: true, message: "请输入类型", trigger: "change" }
        ],
      },
      lists: []
    }
  },
  created() {
    if (this.$store.state.contract && this.$store.state.contract.contractId) {
      this.getSubs()
    }
  },
  watch: {
    "$store.state.contract"(val) {
      if (val && val.contractId) {
        this.getSubs()
      }
    }
  },
  methods: {
    publish(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
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
                h("div", "提交中")
              ]);
            }
          });
          this.$store
            .dispatch("PostPosts", this.formItem)
            .then(res => {
              this.$Spin.hide();
              if (res === 0) {
                this.$router.push({ name: "home" });
              } else if (res === 1) {
                this.$Message.error("栏目不存在");
              } else {
                this.$Message.error("网络错误");
              }
            })
            .catch(() => {
              this.$Spin.hide();
            });
        } else {
          this.$Message.error("请检查提交内容");
        }
      });
    },
    back() {
      this.$router.back()
    },
    getSubs() {
      this.$store.dispatch("GetSubReddits").then(res => {
        res.forEach(item => {
          this.$store.dispatch("GetSubReddit", item).then(response => {
            this.lists.push(response[0])
          })
        })
      })
    }
  }
}
</script>

<style lang="less" scoped>
.publish-post {
  margin-top: 60px;
}
</style>

<template>
  <div class="sub-reddit">
    <Row>
      <i-col :span="12" :offset="6">
        <Form
          ref="formValidate"
          :model="formItem"
          :label-width="100"
          :rules="ruleValidate"
        >
          <FormItem label="name" prop="name">
            <i-input v-model="formItem.name" placeholder="请输入名称"></i-input>
          </FormItem>
          <FormItem label="description" prop="description">
            <i-input
              v-model="formItem.description"
              type="textarea"
              :autosize="{ minRows: 2, maxRows: 5 }"
              placeholder="请描述文本"
            ></i-input>
          </FormItem>
          <FormItem>
            <Button style="margin-left: 50px" type="default" @click="back()"
            >返回</Button
            >
            <Button type="primary" style="margin-left: 40px" @click="createSub('formValidate')"
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
  name: "SubReddit",
  data() {
    return {
      formItem: {
        name: "",
        description: ""
      },
      ruleValidate: {
        name: [{ required: true, message: "请输入名称", trigger: "blur" }],
        description: [
          { required: true, message: "请输入描述", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    createSub(name) {
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
            .dispatch("CreateSubReddit", this.formItem)
            .then(res => {
              this.$Spin.hide();
              if (res === 0) {
                this.$router.push({ name: "home" });
              } else if (res === 1) {
                this.$Message.info("该栏目名称已存在，请勿重复提交");
              } else {
                this.$Message.info("网络错误");
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
    }
  }
};
</script>

<style lang="less" scoped>
.sub-reddit {
  margin-top: 60px;
}
</style>

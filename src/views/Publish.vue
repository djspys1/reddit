<template>
  <div class="publish-post">
    <Row>
      <i-col :span="12" :offset="6">
        <Form :model="formItem" :label-width="80">
          <FormItem label="name">
            <i-input v-model="formItem.input" placeholder="请输入名称"></i-input>
          </FormItem>
          <FormItem label="description">
            <i-input v-model="formItem.textarea" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请描述文本"></i-input>
          </FormItem>
          <FormItem style="text-align: center">
            <Button type="primary" @click="publish">Create</Button>
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
        input: "",
        textarea: ""
      }
    }
  }
}
</script>

<style lang="less" scoped>
.publish-post {
  margin-top: 60px;
}
</style>

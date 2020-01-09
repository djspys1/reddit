<template>
  <div>
    <Layout>
      <Header></Header>
      <Content v-if="currentTab === '1'"></Content>
      <SubContent v-if="currentTab === '2'"></SubContent>
      <Footer></Footer>
    </Layout>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Header from "../components/header/Header.vue";
import Content from "../components/content/Content";
import Footer from "../components/Footer";
import SubContent from "../components/content/SubContent";

export default {
  name: "Home",
  components: {
    SubContent,
    Footer,
    Content,
    Header
  },
  computed: {
    ...mapState([
      "currentTab"
    ])
  }
  // async created() {
  //   await this.$store.dispatch("InitContract")
  // }
}
</script>

<style scoped>

</style>

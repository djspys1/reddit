<template>
  <div>
    <Layout>
      <Header></Header>
      <Content></Content>
      <Footer></Footer>
    </Layout>
  </div>
</template>

<script>
import Header from "../components/header/Header.vue";
import Content from "../components/content/Content";
import Footer from "../components/Footer";

export default {
  name: "Home",
  components: {
    Footer,
    Content,
    Header
  }
}
</script>

<style scoped>

</style>

<template>
  <div class="header">
<!--    <div class="header-top">我的看板-->
<!--      <Icon type="md-arrow-dropdown"/>-->
<!--    </div>-->
    <div class="header-bottom">
      <a href="/" class="logo" title="">reddit.com</a>
      <ul class="tab-menu">
        <li
            v-for="tab in tabs"
            @click="changeTab(tab)"
            :class="{selected: tab.id === currentTab}"
            :key="tab.id">{{tab.name}}
        </li>
      </ul>
    </div>
    <div class="header-bottom-right">
      <router-link tag="div" class="create" :to="{ name: 'subReddit'}">创建栏目</router-link>
      <router-link tag="div" class="publish" :to="{ name: 'publish'}">发布帖子</router-link>
      <div class="sign" @click="signOut">{{loginName}}</div>
    </div>

  </div>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      tabs: [
        {id: "1", name: '帖子'},
        {id: "2", name: '栏目'}
      ],
    }
  },
  computed: {
    loginName() {
      return this.$store.getters.isLogin ? "sign out" : "sign in";
    },
    currentTab() {
      return this.$store.state.currentTab
    }
  },
  methods: {
    changeTab(tab) {
      this.$store.dispatch('ChangeTab', tab.id)
    },
    signOut() {
      this.$store.dispatch("doWork").then(() => {
        this.$router.push({name: "login"})
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .header {
    font-size: 12px;
    border-bottom: 1px solid #5f99cf;
    position: relative;
    background-color: #cee3f8;
    z-index: 99;

    &-top {
      background-color: #f0f0f0;
      white-space: nowrap;
      text-transform: uppercase;
      border-bottom: 1px solid gray;
      font-size: 90%;
      height: 18px;
      line-height: 18px;
    }

    &-bottom {
      .logo {
        text-indent: -9999px;
        background-image: url(../../assets/spirit.png);
        background-position: 0px -1323px;
        background-repeat: no-repeat;
        height: 40px;
        width: 120px;
        display: inline-block;
        vertical-align: bottom;
        margin-bottom: 3px;
      }

      &-right {
        position: absolute;
        display: flex;
        right: 0px;
        bottom: 0px;
        padding: 4px;
        line-height: 12px;
        .publish, .sign, .create {
          margin: 0 10px;
          width: 60px;
          height: 20px;
          line-height: 20px;
          text-align: center;
          background-color: #EFF7FF;
          border-radius: 7px;
          cursor: pointer;
        }
      }

    }

    .tab-menu {
      list-style-type: none;
      white-space: nowrap;
      display: inline-block;
      margin: 5px 0 0 5px;
      vertical-align: bottom;

      & li {
        display: inline;
        font-weight: bold;
        margin: 0px 3px;
        padding: 2px 6px 0 6px;
        cursor: pointer;
      }

      .selected {
        color: orangered;
        background-color: white;
        border: 1px solid #5f99cf;
        border-bottom: 1px solid white;
        z-index: 100;
      }
    }
  }


</style>

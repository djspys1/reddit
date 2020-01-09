import Vue from "vue";
import Vuex from "vuex";

const nearlib = require("nearlib");
import nearConfig from "./config";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    near: null,
    walletAccount: null,
    accountId: null,
    contract: null,
    currentTab: "1" // 当前tab项 1帖子，2栏目
  },
  getters: {
    isLogin(state) {
      return (state.walletAccount && state.walletAccount.isSignedIn()) || false;
    }
  },
  actions: {
    ChangeTab(context, id) {
      context.commit('CHANGE_TAB', id)
    },
    async InitContract(context) {
      const near = await nearlib.connect(
        Object.assign(
          {
            deps: {
              keyStore: new nearlib.keyStores.BrowserLocalStorageKeyStore()
            }
          },
          nearConfig("development")
        )
      );
      context.commit("CHANGE_NEAR", near);
      const walletAccount = new nearlib.WalletAccount(near);
      context.commit("CHANGE_WALLET_ACCOUNT", walletAccount);
      const accountId = walletAccount.getAccountId();
      context.commit("CHANGE_ACCOUNT_ID", accountId);
      const contract = await near.loadContract(nearConfig("development").contractName, {
        viewMethods: [
          // verid
          "getAllSubreddits",

          "getSeeSubmits",

          "getSubreddits",
          "getSubmits",
          "getSubredditDetail",
          "getSubmitDetail",
          "getSeeSubmitDetail",
          "getsubscribeSubreddits",

          // test
          "testGet1",
          "testGet2",
          "testGet3"
        ],
        // Change methods can modify the state. But you don't receive the returned value when called.
        changeMethods: [
          "welcome",
          "postSubreddit",
          "postSubmit",
          "subscribeSubreddit",
          "likeSubmitLikeObj"
        ],
        sender: accountId
      });
      context.commit("CHANGE_CONTRACT", contract);
    },
    async doWork(context) {
      if (context.getters.isLogin) {
        await context.dispatch("signedOutFlow");
      } else {
        await context.dispatch("signedInFlow");
      }
    },
    async signedOutFlow(context) {
      // await context.state.contract.welcome({ name: context.state.accountId });
      await context.state.walletAccount.signOut();
      // 体验太差，去掉
      // window.location.replace(window.location.origin + window.location.pathname);
    },

    async signedInFlow(context) {
      await context.state.walletAccount.requestSignIn(
        nearConfig("development").contractName,
        "Welcome to NEAR"
      );
    },
    /**
     * 创建栏目
     * @param context
     * @param data 栏目数据
     * @constructor
     */
    CreateSubReddit(context, data) {
      return context.state.contract.postSubreddit(data)
    },
    // 获取所有栏目
    GetSubReddits(context) {
      return context.state.contract.getAllSubreddits({})
    },

    /**
     * 订阅栏目
     * @param context
     * @param data
     * @constructor
     */
    PostSubReddit(context, data) {
      return context.state.contract.subscribeSubreddit(data)
    },
    /**
     * 获取单个栏目
     * @param context
     * @param id
     * @returns {Q.Promise<any> | * | Q.Promise<T | never> | PromiseLike<T | never> | Promise<T | never>}
     * @constructor
     */
    GetSubReddit(context, id) {
      return context.state.contract.getSubredditDetail({"id": id})
    },
    // #. 用户发布某个帖子
    PostPosts(context, data) {
      const param = {
        title: data.title,
        subreddit_id: data.subreddit_id,
        type: Number(data.type),
      }
      return context.state.contract.postSubmit(param)
    },
    // 获取用户能看见的的Submit ids
    GetPosts(context) {
      return context.state.contract.getSeeSubmits({"user": context.state.accountId})
    },
    /**
     * 获取单个帖子信息
     * @param context
     * @param data
     * @constructor
     */
    GetPost(context, data) {
      context.state.contract.getSeeSubmitDetail(data)
    },
    /**
     * 获取帖子title
     * @param context
     * @param data
     * @constructor
     */
    GetPostTitle(context, data) {
      context.state.contract.getSubmitDetail(data)
    },
    /**
     * 用户评价
     * @param context
     * @param data
     * @constructor
     */
    UserLikeOrNot(context, data) {
      context.state.contract.likeSubmitLikeObj(data)
    }

  },
  mutations: {
    CHANGE_NEAR(state, payload) {
      state.near = payload;
    },
    CHANGE_WALLET_ACCOUNT(state, payload) {
      state.walletAccount = payload;
    },
    CHANGE_ACCOUNT_ID(state, payload) {
      state.accountId = payload;
    },
    CHANGE_TAB(state, payload) {
      state.currentTab = payload;
    },
    CHANGE_CONTRACT(state, payload) {
      state.contract = payload;
    }
  }
});

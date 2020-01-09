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
    contract: null
  },
  getters: {
    isLogin(state) {
      return (state.walletAccount && state.walletAccount.isSignedIn()) || false;
    }
  },
  actions: {
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
    // # 获取用户能看到的帖子
    // 获取用户能看见的的Submit ids
    GetPosts(context) {
      context.state.contract.getSeeSubmits({"user": context.state.accountId}).then(response => {
        if (response.objs == null || response.objs.length == 0 ) {
          // 该用户没有内容
          // 去订阅界面
          console.log("去订阅感兴趣的subreddits!")
        } else {
          const obj_ids = response.objs; // obj_ids 为SubmitLikeObj 的id列表
          console.log("obj_ids", obj_ids)

          // 循环获取每个SubmitLikeObj内容
          for (var i=0; i<obj_ids.length; i++) {
            window.contract.getSeeSubmitDetail({"id": obj_ids[i]}).then(response => {
              if (response == null || response.length == 0) {
                console.log("不应该发生")
              } else{
                var SubmitLikeObj = response[0];
                // 再根据submit id 去获取具体的title
                window.contract.getSubmitDetail({"id": SubmitLikeObj.submit_id}).then(response => {
                  if (response.length == 0) {
                    console.log("没有该id对应的submit")
                  } else {
                    const r = response[0]; // 这里本来应该返回单个对象，但由于某些限制，总是用数组包装后返回

                    console.log("-------");
                    console.log("用户:", window.accountId);
                    console.log("SubmitLikeObj id:", SubmitLikeObj.id);
                    console.log("喜不喜欢:", SubmitLikeObj.like_or_not);
                    console.log("submit id", SubmitLikeObj.submit_id);

                    console.log("-");
                    console.log("submit id:", r.id);
                    console.log("submit title:", r.title);
                    console.log("submit 显示文字还是超链接:", r.type);
                    console.log("submit 栏目:", r.subreddit_id);
                    console.log("submit 创建者:", r.creator);
                    console.log("submit 喜欢数量:", r.likes);
                    console.log("submit 评论ids列表:", r.comment_ids);
                  }
                })
              }
            })
          }
        }
      })
    },
    // 用户点赞点踩什么的
    UserLike(context) {
      const submit_like_obj_id = 5;
      const like_or_not = 1;
      context.state.contract.likeSubmitLikeObj({"id": submit_like_obj_id.toString(),"like_or_not":like_or_not}).then(response => {
              console.log('response', response)
      })
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
    CHANGE_CONTRACT(state, payload) {
      state.contract = payload;
    }
  }
});

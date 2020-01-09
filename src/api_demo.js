/**
 * Created by nisen on 2020/1/9.
 */

// Initializing contract
async function InitContract() {
  console.log('nearConfig', nearConfig);

  // Initializing connection to the NEAR DevNet.
  window.near = await nearlib.connect(Object.assign({ deps: { keyStore: new nearlib.keyStores.BrowserLocalStorageKeyStore() } }, nearConfig));

  // Initializing Wallet based Account. It can work with NEAR DevNet wallet that
  // is hosted at https://wallet.nearprotocol.com
  window.walletAccount = new nearlib.WalletAccount(window.near);

  // Getting the Account ID. If unauthorized yet, it's just empty string.
  window.accountId = window.walletAccount.getAccountId();

  // Initializing our contract APIs by contract name and configuration.
  window.contract = await near.loadContract(nearConfig.contractName, { // eslint-disable-line require-atomic-updates
    // NOTE: This configuration only needed while NEAR is still in development
    // View methods are read only. They don't modify the state, but usually return some value.
    viewMethods: [
      // verid
      'getAllSubreddits',

      'getSeeSubmits',

      'getSubreddits',
      'getSubmits',
      'getSubredditDetail',
      'getSubmitDetail',
      'getSeeSubmitDetail',
      'getsubscribeSubreddits',

      // test
      'testGet1',
      'testGet2',
      'testGet3'

    ],
    // Change methods can modify the state. But you don't receive the returned value when called.
    changeMethods: [
      'welcome',
      'postSubreddit',
      'postSubmit',
      'subscribeSubreddit',
      'likeSubmitLikeObj',
    ],
    // Sender is the account ID to initialize transactions.
    sender: window.accountId,
  });

}

// Using initialized contract
async function doWork() {
  // Based on whether you've authorized, checking which flow we should go.
  if (!window.walletAccount.isSignedIn()) {
    signedOutFlow();
  } else {
    signedInFlow();
  }
}

// Function that initializes the signIn button using WalletAccount
function signedOutFlow() {
  // Displaying the signed out flow container.
  document.getElementById('signed-out-flow').classList.remove('d-none');
  // Adding an event to a sing-in button.
  document.getElementById('sign-in-button').addEventListener('click', () => {
    window.walletAccount.requestSignIn(
      // The contract name that would be authorized to be called by the user's account.
      window.nearConfig.contractName,
      // This is the app name. It can be anything.
      'Welcome to NEAR'
    );
  });
}

// Main function for the signed-in flow (already authorized by the wallet).
function signedInFlow() {
  // Displaying the signed in flow container.
  document.getElementById('signed-in-flow').classList.remove('d-none');

  console.log("window.accountId", window.accountId)
  // window.contract.welcome({}).then(response => {
  //     document.getElementById('speech').innerText = response.text
  //     console.log(response)
  //
  // });



  // 这里写上接口调用示例
  // 并且做一些测试

  // // #. 用户创建某个栏目subreddit
  // window.contract.postSubreddit({"name": "subreddit3", "description","this is description"}).then(response => {
  //
  //     if (response == 0) {
  //         console.log("发表成功")
  //     } else if (response == 1) {
  //         console.log("name重复")
  //     } else {
  //         console.log("不应该发生！")
  //     }
  // })




  // // # 获取用户能订阅的栏目列表
  // // 先获取所有的栏目id
  // window.contract.getAllSubreddits({}).then(response => {
  //     console.log("所有id：", response)
  //
  //     // 遍历id，获取每个subreddit内容
  //     for (var idx in response) {
  //         var id = response[idx];
  //         window.contract.getSubredditDetail({"id":id}).then(response => {
  //             console.log('response',response)
  //             if (response == null || response.length == 0 ) {
  //
  //                 console.log("有栏目id但无具体信息，不应该发生")
  //
  //             } else {
  //                 let r = response[0];
  //                 console.log("------------");
  //                 console.log("栏目id", r.id);
  //                 console.log("栏目name", r.name);
  //                 console.log("栏目creator", r.creator);
  //                 console.log("栏目下的帖子id", r.submit_ids);
  //             }
  //         })
  //
  //     }
  // })

  // // # 用户查询自己创建的栏目
  // window.contract.getSubreddits({"user": window.accountId}).then(response => {
  //     console.log("user_id", window.accountId)
  //     console.log("用户创建的Subreddit ids：", response)
  //
  //     // response.subreddit_ids 有可能是[] 或者 null
  //
  //     // 遍历id，获取每个subreddit内容
  //     for (var i=0; i < response.subreddit_ids.length;i++) {
  //         let id = response.subreddit_ids[i];
  //
  //
  //         window.contract.getSubredditDetail({"id":id}).then(response => {
  //             if (response == null || response.length == 0 ) {
  //             // 系统没有栏目
  //             console.log("去创建subreddits!")
  //
  //         } else {
  //             let r = response[0];
  //             console.log("------")
  //             console.log("栏目id", r.id);
  //             console.log("栏目name", r.name);
  //             console.log("栏目creator", r.creator);
  //             console.log("栏目下的帖子id", r.submit_ids);
  //         }
  //     })
  //
  // }
  //
  // })

//     // 用户订阅栏目
//     window.contract.subscribeSubreddit({"subreddit_id": "2"}).then(response => {
//         console.log('response', response)
//     })
//
//     window.contract.subscribeSubreddit({"subreddit_id": "3"}).then(response => {
//         console.log('response', response)
// })


//     // 用户查看自己订阅的栏目
//     window.contract.getsubscribeSubreddits({"user": window.accountId}).then(response => {
//         console.log("订阅的Subreddits id", response.subreddit_ids)
//
//         // 遍历id，获取每个subreddit内容
//         for (var i=0; i < response.subreddit_ids.length;i++) {
//             let id = response.subreddit_ids[i];
//
//             window.contract.getSubredditDetail({"id":id}).then(response => {
//                 if (response == null || response.length == 0 ) {
//                 // 系统没有栏目
//                 console.log("去关注subreddits!")
//
//             } else {
//                 let r = response[0];
//                 console.log("------")
//                 console.log("栏目id", r.id);
//                 console.log("栏目name", r.name);
//                 console.log("栏目creator", r.creator);
//                 console.log("栏目下的帖子id", r.submit_ids);
//             }
//         })
//
//     }
//
//     })



  // // #. 用户发布某个帖子
  // type: 0: link, 1:text
  // window.contract.postSubmit({"title": "title4","type":"0","subreddit_id": "3"}).then(response => {
  //
  //     if (response == 0) {
  //         console.log("发表成功")
  //     } else if (response == 1) {
  //         console.log("subreddit_id不存在")
  //     } else {
  //         console.log("不应该发生！")
  //     }
  // })



  // // # 用户查询自己发表的帖子
  // window.contract.getSubmits({"user": window.accountId}).then(response => {
  //     console.log("所有创建的帖子id：", response.submit_ids)
  //
  //     // response.submit_ids 有可能是[] 或者 null
  //
  //     // 遍历id，获取每个submit内容
  //     for (var i=0; i< response.submit_ids.length; i++) {
  //         var id = response.submit_ids[i];
  //         window.contract.getSubmitDetail({"id":id}).then(response => {
  //             if (response == null || response.length == 0 ) {
  //             // 系统没有栏目
  //             console.log("去创建subreddits!")
  //
  //         } else {
  //             let r = response[0];
  //             console.log("----------");
  //             console.log("帖子id", r.id);
  //             console.log("帖子title", r.title);
  //             console.log("帖子creator", r.creator);
  //             console.log("帖子栏目", r.subreddit_id);
  //             console.log("帖子总体喜欢数目likes", r.likes);
  //             console.log("帖子comment_ids", r.comment_ids);
  //         }
  //     })
  //
  //     }
  // })



  // // # 获取用户能看到的帖子
  // // 获取用户能看见的的Submit ids
  // window.contract.getSeeSubmits({"user":window.accountId}).then(response => {
  //
  //     if (response.objs == null || response.objs.length == 0 ) {
  //         // 该用户没有内容
  //         // 去订阅界面
  //         console.log("去订阅感兴趣的subreddits!")
  //     } else {
  //         var obj_ids = response.objs; // obj_ids 为SubmitLikeObj 的id列表
  //         console.log("obj_ids", obj_ids)
  //
  //         // 循环获取每个SubmitLikeObj内容
  //         for (var i=0; i<obj_ids.length; i++) {
  //             window.contract.getSeeSubmitDetail({"id": obj_ids[i]}).then(response => {
  //                 if (response == null || response.length == 0) {
  //                     console.log("不应该发生")
  //                 } else{
  //                         var SubmitLikeObj = response[0];
  //
  //                         // 再根据submit id 去获取具体的title
  //                         window.contract.getSubmitDetail({"id": SubmitLikeObj.submit_id}).then(response => {
  //                             if (response.length == 0) {
  //                             console.log("没有该id对应的submit")
  //                         } else {
  //                             var r = response[0]; // 这里本来应该返回单个对象，但由于某些限制，总是用数组包装后返回
  //
  //                             console.log("-------");
  //                             console.log("用户:", window.accountId);
  //                             console.log("SubmitLikeObj id:", SubmitLikeObj.id);
  //                             console.log("喜不喜欢:", SubmitLikeObj.like_or_not);
  //                             console.log("submit id", SubmitLikeObj.submit_id);
  //
  //                             console.log("-");
  //                             console.log("submit id:", r.id);
  //                             console.log("submit title:", r.title);
  //                             console.log("submit 显示文字还是超链接:", r.type);
  //                             console.log("submit 栏目:", r.subreddit_id);
  //                             console.log("submit 创建者:", r.creator);
  //                             console.log("submit 喜欢数量:", r.likes);
  //                             console.log("submit 评论ids列表:", r.comment_ids);
  //                         }
  //                     })
  //                 }
  //             })
  //         }
  //
  //
  //     }
  // })


  // // 用户点赞
  // var submit_like_obj_id = 5;
  // var like_or_not = 1;
  // window.contract.likeSubmitLikeObj({"id": submit_like_obj_id.toString(),"like_or_not":like_or_not}).then(response => {
  //         console.log('response', response)
  // })


  // TODO 评论时间有余再做




  // Adding an event to a sign-out button.
  document.getElementById('sign-out-button').addEventListener('click', () => {
    walletAccount.signOut();
    // Forcing redirect.
    window.location.replace(window.location.origin + window.location.pathname);
  });

}

// Loads nearlib and this contract into window scope.
window.nearInitPromise = InitContract()
  .then(doWork)
  .catch(console.error);

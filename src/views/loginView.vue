<script setup lang="ts">
  import { ref, onMounted } from "vue";
  import { useRouter } from "vue-router";
  import BScroll from "better-scroll"; //导入Better scroll核心
  import { showToast } from "vant";
  import "vant/es/toast/style";
  import axios from "axios";
  import md5 from "js-md5";
  interface resType {
    data: {
      name: string;
      code: number;
    };
  }
  // QQ昵称+头像 https://cloud.qqshabi.cn/api/qqinfo.php?qq=3118590779
  // QQ昵称+头像 https://api.szfx.top/qqinfo/?qq=3118590779
  // QQ昵称+头像 https://api.usuuu.com/qq/3118590779
  // QQ头像 https://q.qlogo.cn/headimg_dl?dst_uin=3118590779&spec= (1~5)
  let router = useRouter();
  //---------------正则表达式---------------
  let passwordReg = /^(?=.*[A-Z])(?=.*\d)[^]{6,16}$/;
  let accountReg = /^\d{3,12}$/;
  //--------------当前激活标签页---------------
  let active = ref(0);
  //---------------bs实例化相关-----------
  let loginView = ref();
  let bs = ref({}); //Better scroll实例化后对象的存储
  onMounted(() => {
    bs.value = new BScroll(loginView.value, {
      click: true,
    });
  });
  //----------登录页面------------------------
  let account = ref("");
  let password = ref("");
  // 登录函数
  let login = () => {
    if (!account.value || !password.value) {
      showToast("アカウントやパスワードを空にしてはいけません");
      return;
    } else if (!accountReg.test(account.value)) {
      showToast("アカウントが規格外です");
      return;
    } else if (!passwordReg.test(password.value)) {
      showToast("パスワードが規格外です");
      return;
    } else {
      let accountData = JSON.parse(
        localStorage.getItem(`user${account.value}`) + ""
      );
      if (accountData && accountData.password === md5(password.value)) {
        showToast("紙桜へようこそです!");
        localStorage.setItem("userId", account.value);
        router.push({
          name: "home",
        });
      } else showToast("アカウントやパスワードが間違っています");
    }
  };
  //----------注册页面------------------------
  let account1 = ref("");
  let password1 = ref("");
  let password2 = ref("");
  //注册函数
  let register = async () => {
    if (!accountReg.test(account1.value)) {
      // QQID输入不符合要求
      showToast(`アカウントは3~11桁の数字です\nQQで登録してください`);
      return;
    } else if (password1.value === "" || password2.value === "") {
      // 密码为空
      showToast(`パスワードは空です`);
      return;
    } else if (password1.value != password2.value) {
      // 两次输入的密码不一致
      showToast(`2回入力したパスワードが一致しません`);
      return;
    } else if (!passwordReg.test(password1.value)) {
      // 输入的密码不符合规范(6~16位数字或字母,必须包含一个大写字母)
      showToast("パスワードが規格外です");
      return;
    } else if (localStorage.getItem(`user${account1.value}`)) {
      // 用户已存在
      showToast(`アカウントを作成しました\nログインしてください`);
      return;
    } else {
      // 成功创建
      let res = <resType>(
        await axios.get(
          `https://cloud.qqshabi.cn/api/qqinfo.php?qq=${account1.value}`
        )
      );
      if (res.data.code === -1 || !res)
        showToast(`QQIDに問い合わせませんでした`);
      else {
        showToast(`紙桜へようこそです!\n登録しますよ!`);
        // 因为没爬取到登录相关接口.因此一切的与账号信息或登陆相关都做本地数据存储与伪请求
        localStorage.setItem(
          `user${account1.value}`,
          JSON.stringify({
            name: res.data.name,
            id: account1.value,
            password: md5(password1.value),
            watchingHistory: [], //历史已看,第一位为当前在看
            collection: [], //已收藏漫画
          })
        );
        localStorage.setItem(`userId`, account1.value);
        router.push({ name: "home" });
      }
    }
  };
</script>
<template>
  <div
    class="w-100 h-100 loginView"
    style="background: url(@/img/)"
    ref="loginView">
    <!-- 登录页滚动核心 -->
    <div class="overflow-hidden" style="min-height: calc(100% + 1px)">
      <!-- 头部图片信息 -->
      <div class="ps-5 pe-5 mb-3" style="margin-top: 30%">
        <img src="@/img/logo.png" class="w-100 h-100 rounded-3" />
        <div class="mt-3 text-center fs-5">
          すばらしさは、紙上に咲く桜の花のように、手に取ることができます。
        </div>
      </div>
      <van-tabs v-model:active="active">
        <van-tab title="登録する" class="pt-4">
          <input
            v-model="account"
            type="text"
            placeholder="ID入力をお願いします"
            maxlength="11"
            class="insetShadow-4-4" />
          <el-input
            v-model="password"
            type="password"
            placeholder="パスワードをお願いします"
            maxlength="12"
            minlength="6"
            show-password
            class="insetShadow-3-5" />
          <div
            class="mx-auto rounded-pill text-center fs-3 pt-2 pb-2 insetShadow-9-8 bg-pink"
            style="width: 80%"
            @click="login">
            登録する
          </div>
        </van-tab>
        <van-tab title="きにゅう" class="pt-4">
          <input
            type="text"
            v-model="account1"
            placeholder="QQIDで登録をお願いします"
            maxlength="11"
            class="insetShadow-3-5" />
          <el-input
            v-model="password1"
            type="password"
            placeholder="6~18桁の数字とアルファベットです"
            maxlength="12"
            minlength="6"
            show-password
            class="insetShadow-3-5" />
          <el-input
            v-model="password2"
            type="password"
            placeholder="いにしあるが必要です"
            maxlength="12"
            minlength="6"
            show-password
            class="insetShadow-3-5" />
          <div
            class="mx-auto rounded-pill text-center fs-3 bg-success pt-2 pb-2 insetShadow-9-8"
            style="width: 80%"
            @click="register">
            きにゅう
          </div>
        </van-tab>
      </van-tabs>
    </div>
    <!-- 头部返回按钮 -->
    <back-component class="position-fixed"></back-component>
  </div>
</template>
<style lang="scss">
  .loginView {
    --jianXi: 12px;
    --van-tabs-nav-background: rgba(0, 0, 0, 0.3);
    --van-tabs-bottom-bar-width: calc(50% - var(--jianXi));
    --van-tabs-bottom-bar-height: calc(
      var(--van-tabs-line-height) - var(--jianXi)
    );
    --van-tabs-bottom-bar-color: var(--van-primary-color);
    --van-tabs-bottom-bar-color: rgba(255, 255, 255, 0.3);
    --van-tab-active-text-color: white;
    --van-tab-text-color: var(--bs-body-color);
    --van-tab-font-size: 18px;
    div[id^="van-tabs-1"] {
      z-index: 3;
    }
    .van-tabs__wrap {
      border-radius: 99999px;
      width: 80%;
      margin: auto;
    }
    .van-tabs__line {
      margin-bottom: calc(var(--jianXi) * 0.5);
    }
    input {
      font-size: 18px;
      transition: all 1s;
    }
    input::placeholder {
      color: var(--bs-danger-text-emphasis);
    }
    .el-input,
    input[type="text"]:not([class="el-input__inner"]) {
      background: rgba(0, 0, 0, 0.3);
      border: none;
      outline: none;
      border-radius: 9999px;
      display: block;
      width: 80%;
      margin: auto;
      margin-bottom: 30px;
      position: relative;
    }
    input[type="text"]:not([class="el-input__inner"]),
    .el-input__wrapper {
      padding: 20px 0;
      padding-left: 20px;
    }
    .el-input__wrapper {
      width: 100%;
      height: 100%;
      background: transparent;
      border: none;
      box-shadow: none;
    }
    .el-input__suffix {
      margin-right: 20px;
    }
  }
</style>
<style lang="scss" scoped>
  .bg-pink {
    background: rgb(230, 133, 181);
  }
</style>

<script setup lang="ts">
  import { ref, onMounted } from "vue";
  import BScroll from "better-scroll"; //导入Better scroll核心
  import { showToast } from "vant";
  import "vant/es/toast/style";
  import { getQQInfo } from "@/api/QQinfo";
  //-------------正则表达式---------------
  let passwordReg = /^(?=.*[A-Z])(?=.*\d)[^]{6,16}$/;
  let accountReg = /^\d{3,11}$/;
  //-----当前激活标签页
  let active = ref(0);
  //---------------bs实例化相关-----------
  let loginView: any = ref<object | null>(null);
  let bs = ref({}); //Better scroll实例化后对象的存储
  onMounted(() => {
    bs.value = new BScroll(loginView.value, {
      click: true,
    });
  });
  //----------注册页面------------------------
  let account1 = ref("");
  let password1 = ref("");
  let password2 = ref("");
  let userInfoDatabase =
    JSON.parse(localStorage.getItem("userInfoDatabase") + "") || [];

  let register = async () => {
    if (!accountReg.test(account1.value)) {
      showToast(`アカウントは3~11桁の数字です
      QQで登録してください`);
    } else if (password1.value === "" || password2.value === "") {
      showToast(`パスワードは空です`);
    } else if (password1.value != password2.value) {
      showToast(`2回入力したパスワードが一致しません`);
    } else if (!passwordReg.test(password1.value)) {
      showToast("パスワードが規格外です");
    } else {
      let res = await getQQInfo(account1.value);
      if (res) {
        showToast(`紙桜へようこそです!
  登録しますよ!`);
        // 因为没爬取到登录相关接口.因此一切的与账号信息或登陆相关都做本地数据存储与伪请求
        userInfoDatabase.push({
          id: account1.value,
          password: password1.value,
        });
        password1.value = password2.value = account1.value = "";
        active.value = 0;
      } else {
        showToast(`QQIDに問い合わせませんでした`);
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
    <div class="overflow-hidden" style="min-height: calc(100% + 5px)">
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
            type="text"
            placeholder="ID入力をお願いします"
            maxlength="11"
            class="insetShadow-4-4" />
          <el-input
            v-model="password1"
            type="password"
            placeholder="パスワードをお願いします"
            maxlength="12"
            minlength="6"
            show-password
            class="insetShadow-3-5" />
          <div
            class="mx-auto rounded-pill text-center fs-3 pt-2 pb-2 insetShadow-9-8 bg-pink"
            style="width: 80%"
            @click="register">
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
    <div class="ps-3 position-fixed top-0 w-100">
      <i class="bi bi-arrow-left-short" @click="$router.go(-1)"></i>
    </div>
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

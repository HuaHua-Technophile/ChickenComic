<script setup lang="ts">
  import { ref, onMounted } from "vue";
  import BScroll from "better-scroll"; //导入Better scroll核心

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
</script>
<template>
  <div
    class="w-100 h-100 loginView"
    style="background: url(@/img/)"
    ref="loginView">
    <!-- 登录页滚动核心 -->
    <div style="min-height: calc(100% + 5px)">
      <!-- 头部图片信息 -->
      <div class="ps-5 pe-5" style="margin-top: 30%">
        <img src="@/img/logo.png" class="w-100 h-100 rounded-3" />
        <div class="mt-3 text-center fs-5">
          すばらしさは、紙上に咲く桜の花のように、手に取ることができます。
        </div>
      </div>

      <van-tabs v-model:active="active">
        <van-tab title="登録する">
          <input type="text" name="" id="" placeholder="请输入您的腾讯id" />
        </van-tab>
        <van-tab title="きにゅう">内容 2</van-tab>
      </van-tabs>
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
  }
</style>

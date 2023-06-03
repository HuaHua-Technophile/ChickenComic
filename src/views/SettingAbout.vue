<script setup lang="ts">
  import { ref, onMounted } from "vue";
  import BScroll from "better-scroll"; //导入Better scroll核心
  import { useGlobalStore } from "../stores/counter";

  let settingAbout: any = ref<object | null>(null);
  let bs = ref({}); //Better scroll实例化后对象的存储

  onMounted(() => {
    bs.value = new BScroll(settingAbout.value, {
      click: true,
    });
  });

  let { theme, changeTheme }: any = useGlobalStore();
</script>

<template>
  <div ref="settingAbout" class="settingAbout w-100 h-100 noScrollBar">
    <!-- 滚动内容 -->
    <div class="ps-3 pe-3 overflow-hidden" style="min-height: 105vh">
      <!-- 头部图片信息 -->
      <div class="ps-5 pe-5" style="margin-top: 150px">
        <img src="@/img/logo.png" class="w-100 h-100 rounded-3" />
        <div class="mt-3 text-center fs-5">
          すばらしさは、紙上に咲く桜の花のように、手に取ることができます。
        </div>
      </div>
      <!-- 夜间模式切换 -->
      <div
        class="form-check form-switch pt-3 pb-3 bg-body-secondary rounded-pill fs-5 mb-3 insetShadow"
        style="margin-top: 130px; --bs-bg-opacity: 0.5">
        <input
          class="form-check-input"
          type="checkbox"
          role="switch"
          id="flexSwitchCheckDefault"
          style="margin-left: -1.5rem"
          :checked="theme == 'dark'"
          @click="changeTheme" />
        <label class="form-check-label ms-3" for="flexSwitchCheckDefault"
          >ナイトモードです</label
        >
      </div>
      <!-- 关于 -->
      <div
        class="ps-3 pe-3 bg-body-secondary rounded-pill fs-5 pt-2 pb-2 mb-3"
        style="--bs-bg-opacity: 0.5">
        <i class="bi bi-info-square fs-3 ms-3 me-4"></i>
        <span>紙桜漫画についてです</span>
      </div>
      <!-- 隐私协议 -->
      <div
        class="ps-3 pe-3 bg-body-secondary rounded-pill fs-5 pt-2 pb-2 mb-3"
        style="--bs-bg-opacity: 0.5">
        <i class="bi bi-shield-lock fs-3 ms-3 me-3"></i>
        <span>プライバシー協定です</span>
      </div>
      <!-- 检查更新 -->
      <div
        class="ps-3 pe-3 bg-body-secondary rounded-pill fs-5 pt-2 pb-2 mb-3"
        style="--bs-bg-opacity: 0.5">
        <i class="bi bi-arrow-repeat fs-3 ms-3 me-4"></i>
        <span>更新をチェックします</span>
      </div>
      <!-- 版本号 -->
      <div class="text-center opacity-50">Versions 1.0.1 Beta</div>
    </div>
  </div>
</template>
<style lang="scss">
  .insetShadow {
  }
</style>

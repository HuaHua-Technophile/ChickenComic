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

  let { theme, changeTheme } = useGlobalStore();
</script>

<template>
  <div
    ref="settingAbout"
    class="settingAbout w-100 h-100 noScrollBar d-flex justify-content-center">
    <!-- 滚动内容 -->

    <ul class="list-group fs-7 w-100 mx-4">
      <li
        class="d-flex align-items-center opacity-75 bg-light p-3 mt-5 rounded-4 d-flex justify-content-between">
        <div class="des">
          <h6 class="m-0">夜间模式</h6>
          <p class="m-0 fs-10 opacity-75">开启夜间模式，夜间阅读不伤眼</p>
        </div>
        <div class="form-check form-switch">
          <input
            class="form-check-input"
            type="checkbox"
            role="switch"
            id="flexSwitchCheckChecked"
            @click="changeTheme"
            checked />
        </div>
      </li>
      <li
        class="d-flex align-items-center opacity-75 bg-light p-3 mt-5 rounded-4 d-flex justify-content-between">
        <div class="des">
          <h6 class="m-0">夜间模式</h6>
          <p class="m-0 fs-10 opacity-75">开启夜间模式，夜间阅读不伤眼</p>
        </div>
        <div class="form-check form-switch">
          <input
            class="form-check-input"
            type="checkbox"
            role="switch"
            id="flexSwitchCheckChecked"
            @click="changeTheme"
            checked />
        </div>
      </li>
      <li
        class="d-flex align-items-center opacity-75 bg-light p-3 mt-5 rounded-4 d-flex justify-content-between">
        <div class="des">
          <h6 class="m-0">夜间模式</h6>
          <p class="m-0 fs-10 opacity-75">开启夜间模式，夜间阅读不伤眼</p>
        </div>
        <div class="form-check form-switch">
          <input
            class="form-check-input"
            type="checkbox"
            role="switch"
            id="flexSwitchCheckChecked"
            @click="changeTheme"
            checked />
        </div>
      </li>
    </ul>
  </div>
</template>

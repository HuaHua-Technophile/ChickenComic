<script setup lang="ts">
  import { useGlobalStore } from "@/stores/counter";
  import { storeToRefs } from "pinia";
  // ---------用户信息-------------
  const S = useGlobalStore();
  let { userInfo } = storeToRefs(S);
  let userId = localStorage.getItem("userId");
  if (userId) {
    userInfo.value = JSON.parse(localStorage.getItem(`user${userId}`) + "");
  }
</script>

<template>
  <div class="home">
    <!-- 滚动内容 -->
    <div style="min-height: calc(100% + 2px)">
      <!-- 用户信息/设置 -->
      <div></div>
    </div>
  </div>
</template>

<style lang="scss"></style>

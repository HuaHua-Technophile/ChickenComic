<script setup lang="ts">
  import { useUserInfoStore } from "@/stores/userInfo";
  import { storeToRefs } from "pinia";
  // ---------用户信息-------------
  let { userInfo, Logged } = storeToRefs(useUserInfoStore());
  let userId = localStorage.getItem("userId");
  if (userId) {
    Logged.value = true;
    userInfo.value = JSON.parse(localStorage.getItem(`user${userId}`) + "");
  }
</script>

<template>
  <div class="home">
    <!-- 滚动内容 -->
    <div style="min-height: calc(100% + 1px)">
      <!-- 用户信息/设置 -->
      <div></div>
    </div>
  </div>
</template>

<style lang="scss"></style>

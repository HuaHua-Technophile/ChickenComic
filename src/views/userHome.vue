<script setup lang="ts">
  import { getUserInfo } from "@/api/userInfo";
  import { useGlobalStore } from "@/stores/counter";
  //用户信息----------------
  let S = useGlobalStore();
  if (S.userInfo) {
  } else {
  }
</script>
<template>
  <div></div>
</template>

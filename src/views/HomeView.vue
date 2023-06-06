<script setup lang="ts">
  import { useGlobalStore } from "@/stores/counter";
  // ----主题测试-------
  const S = useGlobalStore();
  const { changeTheme } = S;
</script>

<template>
  <div class="home">
    <div class="alert alert-danger" @click="changeTheme">bs测试</div>
  </div>
</template>

<style lang="scss"></style>

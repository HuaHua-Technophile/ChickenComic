<script setup lang="ts">
  import { useGlobalStore } from "@/stores/counter";
  const S = useGlobalStore();
  const { theme } = S;
</script>

<template>
  <div class="w-100 h-100">
    <router-view></router-view>
  </div>
</template>

<style lang="scss"></style>

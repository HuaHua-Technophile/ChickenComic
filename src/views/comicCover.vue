<script setup lang="ts">
  import { useRoute } from "vue-router";
  // 从路由传参获取当前页面漫画的id
  const route = useRoute();
  const { id } = route.query;
  console.log(id);
</script>

<template>
  <div>{{ id }}</div>
</template>

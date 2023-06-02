<script setup lang="ts">
  import { onMounted, ref } from "vue";
  import { getHomeFeed } from "@/api/home";

  onMounted(async () => {
    let result: any = ref<object>(
      await getHomeFeed({ pageNum: 1, pageSize: 20 })
    );
    console.log(result.value.data.feeds[0].image);
  });
</script>

<template>
  <div class="home">
    <!-- <img :src="result.value.data.feeds[0].image" alt="" /> -->
    <h1>Home</h1>
    <div class="alert alert-danger">bs测试</div>
  </div>
</template>

<style lang="scss"></style>

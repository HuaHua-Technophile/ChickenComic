<script setup lang="ts">
  import { onMounted, ref, toRefs } from "vue";
  import { getHomeFeed } from "@/api/home";

  let result: any = ref<object | null>(null);
  onMounted(async () => {
    result.value = await getHomeFeed({ pageNum: 1, pageSize: 20 });
    console.log(result.value.data.feeds[0].image);
  });
</script>

<template>
  <div class="home">
    <h1>Home</h1>
    <div class="alert alert-danger">bs测试</div>
    <div>
      <img :src="result?.data.feeds[0].image" alt="" />
    </div>
  </div>
</template>

<style lang="scss"></style>

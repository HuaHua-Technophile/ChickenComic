<script setup lang="ts">
  import { onMounted } from "vue";
  import { getHomeFeed } from "@/api/home";

  onMounted(async () => {
    let data: any = await getHomeFeed({ pageNum: 2, pageSize: 20 });
    console.log(data);
  });
</script>

<template>
  <div class="home">这是一个home</div>
</template>

<style lang="scss"></style>

<script setup lang="ts">
  import { onMounted, ref, toRefs } from "vue";
  import { getHomeFeed } from "@/api/home";
  import { useGlobalStore } from "@/stores/counter";
  // ----主题测试-------
  const S = useGlobalStore();
  const { changeTheme } = S;
  let result: any = ref<object | null>(null);
  onMounted(async () => {
    result.value = await getHomeFeed({ pageNum: 1, pageSize: 20 });
    console.log(result.value.data.feeds[0].image);
  });
</script>

<template>
  <div class="home">
    <div class="alert alert-danger" @click="changeTheme">bs测试</div>
  </div>
</template>

<style lang="scss"></style>

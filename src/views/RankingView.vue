<script setup lang="ts">
  import { ref } from "vue";
  import { getListRank, getRankInfo } from "@/api/ranking";

  let listRankData: any = ref<object>({});
  const getListRankData = async () => {
    listRankData.value = await getListRank();
    console.log(listRankData.value);
  };

  getListRankData();
</script>

<template>
  <div class="RankingView"></div>
</template>

<style lang="scss"></style>

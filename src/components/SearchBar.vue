<script setup lang="ts">
  import { useRouter } from "vue-router";

  const router = useRouter();

  // 跳转到搜索页
  const toSearchInput = () => {
    router.push("SearchInput");
  };
</script>

<template>
  <div
    class="toSearchArea px-4 mt-5"
    style="width: 100%; height: 48px"
    @click="toSearchInput">
    <!-- 搜索框 -->
    <div
      class="searchBar h-100 d-flex rounded-pill align-items-center px-3 insetShadow-4-4"
      style="
        background-image: radial-gradient(
          circle,
          transparent 0%,
          transparent 40%,
          rgba(255, 255, 255, 0.2) 100%
        );
      ">
      <!-- 搜索icon -->
      <div class="searchIcon text-center" style="width: 10%">
        <i class="bi bi-search fs-6 opacity-50"></i>
      </div>
      <!-- 搜索tip -->
      <div class="toSearch fs-7 flex-grow-1 text-center opacity-50">
        search manga
      </div>
      <!-- 占位 -->
      <div class="slotArea" style="width: 10%"></div>
    </div>
  </div>
</template>

<style lang="scss"></style>

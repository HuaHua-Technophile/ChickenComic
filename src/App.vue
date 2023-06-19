<script setup lang="ts">
  import { useRoute } from "vue-router";
  import ComicReadBar from "./components/ComicReadBar.vue";

  const route = useRoute();
</script>
<template>
  <div class="w-100 h-100 position-relative">
    <!-- <router-view v-slot="{ Component }">
      <transition name="view">
        <component :is="Component" />
      </transition>
    </router-view> -->
    <router-view></router-view>
    <!-- 悬浮播放器 -->
    <comic-read-bar v-if="!route.meta.comicReadShow"></comic-read-bar>
  </div>
</template>
<style lang="scss"></style>

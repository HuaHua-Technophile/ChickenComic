<template>
  <div class="ps-3 top-0 w-100 text-light t-shadow-3 d-flex align-items-center">
    <div @click="$router.go(-1)">
      <i class="bi bi-arrow-left-short"></i>
    </div>
    <div class="flex-grow-1">
      <slot name="searchInput"></slot>
    </div>
  </div>
</template>
<style lang="scss">
  .bi.bi-arrow-left-short {
    font-size: 45px;
  }
</style>

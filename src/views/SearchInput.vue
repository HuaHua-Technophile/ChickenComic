<script setup lang="ts">
  import { ref } from "vue";
  import { showToast } from "vant";
  const value = ref("");
  const onSearch = (val: any) => showToast(val);
  const onCancel = () => showToast("取消");
</script>

<template>
  <div ref="SearchInput" class="SearchInput w-100 h-100 noScrollBar">
    <form action="/">
      <van-search
        v-model="value"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="onCancel"
        background="transparent"
        :shape="'round'" />
    </form>
  </div>
</template>
<style lang="scss">
  .SearchInput {
    // color: ;
  }
</style>

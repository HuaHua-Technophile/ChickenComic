<script lang="ts">
  import { defineComponent, ref } from "vue";
  export default defineComponent({
    setup() {
      let show: any = ref(false);
      console.log(show.value);
    },
  });
</script>

<template>
  <div class="installView">
    <div class="content">
      <ul class="list-group">
        <li class="list-group-item">
          选项一
          <i class="bi bi-chevron-right"></i>
        </li>
        <li class="list-group-item list-group-item-dark">
          A simple dark list group item
        </li>
      </ul>
    </div>
  </div>
</template>

<style>
  .installView {
    background-color: #fff;
  }
</style>

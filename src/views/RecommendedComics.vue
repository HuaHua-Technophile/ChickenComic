<script setup lang="ts">
  import { ref } from "vue";
  import { getRecommend, getHomeRecommend } from "../api/RecommendedComics";
  // 推荐漫画列表
  interface arr {
    value: Array<object>;
  }
  let RecommendList: arr = ref<never[]>([]);
  console.log(RecommendList.value);
  // ---------------获取推荐漫画数据3条----------------
  const getRecommendFun = async () => {
    let data = await getRecommend();
    RecommendList.value.push(...data.data);
  };
  getRecommendFun();
  // -------------获取推荐漫画数据10条--------------
  const getHomeRecommendFun = async () => {
    let data = await getHomeRecommend();
    RecommendList.value.push(...data.data.list);
    RecommendList.value.pop();

    console.log(RecommendList.value);
  };
  getHomeRecommendFun();
</script>
<template>
  <div class="RecommendedComics w100 g-100">
    <back-component class="position-fixed"></back-component>
    <p>
      暂无<br />
      订阅作品<br />
      惊喜探索<br />
      更多作品盲盒<br />
      等你开启<br />
    </p>
    <div class="contentList d-flex w-100 height">
      <ul class="">
        <li
          style="
            background-image: url('https://i0.hdslb.com/bfs/manga-static/accd35013c082cb622fb8749c86aec3bd4fb9253.jpg');
          "></li>
      </ul>
      <ul>
        <li
          style="
            background-image: url('https://i0.hdslb.com/bfs/manga-static/accd35013c082cb622fb8749c86aec3bd4fb9253.jpg');
          "></li>
      </ul>
      <ul>
        <li
          style="
            background-image: url('https://i0.hdslb.com/bfs/manga-static/accd35013c082cb622fb8749c86aec3bd4fb9253.jpg');
          "></li>
      </ul>
    </div>
  </div>
</template>
<style>
  ul {
    flex: 1;
  }
  li {
    height: 300px;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }
</style>

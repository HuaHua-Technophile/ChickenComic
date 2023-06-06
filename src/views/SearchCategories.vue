<script setup lang="ts">
  import { ref, onMounted } from "vue";
  import { useGlobalStore } from "../stores/counter";
  import { getSearchResult } from "../api/search";
  //主题切换
  let { theme, changeTheme }: any = useGlobalStore();
  let keyWord: any = ref(null);
  keyWord.value = "我退的孩子";

  //获取搜索结果
  const getSearchResultFun = async () => {
    let data = await getSearchResult({
      keyWord: "我退的孩子",
      order: -1,
    });
    console.log("data==》", data);
  };
  onMounted(() => {
    getSearchResultFun();
  });

  const reSearch = () => {
    console.log("click");
  };
  const value1 = ref(-1);
  const value2 = ref("-1");
  const value3 = ref("-1");
  const option1 = [
    { text: "默认排序", value: -1 },
    { text: "人气推荐", value: 0 },
    { text: "更新时间", value: 1 },
    { text: "上架时间", value: 2 },
  ];
  const option2 = [
    { text: "全部", value: "-1" },
    { text: "热血", value: "热血" },
    { text: "古风", value: "古风" },
    { text: "玄幻", value: "玄幻" },
    { text: "奇幻", value: "奇幻" },
    { text: "悬疑", value: "悬疑" },
    { text: "都市", value: "都市" },
    { text: "历史", value: "历史" },
    { text: "武侠仙侠", value: "武侠仙侠" },
    { text: "游戏竞技", value: "游戏竞技" },
    { text: "悬疑灵异", value: "悬疑灵异" },
    { text: "架空", value: "架空" },
    { text: "青春", value: "青春" },
    { text: "西幻", value: "游戏竞技" },
    { text: "现代", value: "现代" },
    { text: "正能量", value: "正能量" },
    { text: "科幻", value: "科幻" },
  ];
  const option3 = [
    { text: "全部", value: "-1" },
    { text: "连载", value: "连载" },
    { text: "完结", value: "完结" },
    { text: "免费", value: "免费" },
    { text: "付费", value: "付费" },
  ];
</script>
<template>
  <div class="SearchCategories">
    <!-- :class="[theme == 'dark' ? 'bg-black' : 'bg-white']" -->
    <div class="searchInput" @click="reSearch">
      <form action="/">
        <van-search
          v-model="keyWord"
          placeholder="请输入作者名/作品名/类型"
          background="transparent"
          autocomplete="off"
          :class="[theme == 'dark' ? 'searchDark' : 'searchLight']" />
      </form>
    </div>
    <van-dropdown-menu :z-index="10" class="my-3">
      <van-dropdown-item v-model="value1" :options="option1" />
      <van-dropdown-item v-model="value2" :options="option2" />
      <van-dropdown-item v-model="value3" :options="option3" />
    </van-dropdown-menu>
    <div class="searchResultList">
      <ul>
        <li class="d-flex mt-4">
          <div class="img-box mx-3">
            <img
              src="https://i0.hdslb.com/bfs/manga-static/8cc4d8b73742d255c3e5d8843fdff9eaff4ead19.jpg@100w_100h.jpg"
              alt="" />
          </div>
          <div class="details d-fles">
            <div class="name my-2">我推的孩子</div>
            <div class="fs-10">作者列表</div>
            <div class="fs-10">都市</div>
            <div class="fs-10">连载中</div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<style lang="scss">
  .van-dropdown-menu__bar {
    opacity: 0.7;
    color: #fff;
  }
  .van-cell--clickable {
    .van-cell__value {
      display: none;
    }
  }
  .searchResultList {
    .keywords {
      color: red;
    }
  }
  .searchDark {
    --van-search-content-background: transparent;
    --van-field-input-text-color: rgb(254, 254, 254);
  }
  .searchLight {
    --van-search-content-background: transparent;
    --van-field-input-text-color: rgb(1, 1, 1);
  }
  .van-popup--top {
    display: flex;
    justify-content: space-between;

    flex-wrap: wrap;
  }
  .van-cell {
    width: 25%;
    text-align: center;
  }
</style>

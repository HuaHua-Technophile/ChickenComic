<script setup lang="ts">
  import { ref, onMounted, watchEffect } from "vue";
  import { useGlobalStore } from "../stores/counter";
  import { getSearchReferral } from "@/api/search";
  import { useRouter, useRoute } from "vue-router";

  //搜索框
  const value = ref("");

  // watchEffect(() => {
  //   console.log(value.value);
  // });

  // 搜索历史
  let searchHistoryData: any = ref([]);
  //获取历史记录数据;
  const starHistory = () => {
    if (!localStorage.getItem("searchHistory")) {
      localStorage.setItem(
        "searchHistory",
        JSON.stringify(searchHistoryData.value)
      );
    } else {
      searchHistoryData.value = JSON.parse(
        localStorage.getItem("searchHistory") || "[]"
      );
    }
  };
  starHistory();
  //添加搜索历史
  const searchFun = () => {
    searchHistoryData.value.push(value.value);
    localStorage.setItem(
      "searchHistory",
      JSON.stringify(searchHistoryData.value)
    );
  };
  //清除历史记录
  const clearHistory = () => {
    searchHistoryData.value = [];
    localStorage.setItem(
      "searchHistory",
      JSON.stringify(searchHistoryData.value)
    );
  };

  //获取热门搜索
  let searchReferral: any = ref([]);
  const getSearchReferralFun = () => {
    getSearchReferral({ num: 12 }).then((data: any) => {
      searchReferral = data.data.splice(1, 10);
    });
  };

  getSearchReferralFun();
  onMounted(() => {
    getSearchReferralFun();
  });
  //主题切换
  let { theme, changeTheme }: any = useGlobalStore();

  // 返回home主页
  let router: any = useRouter();
  let route: any = useRoute();
  const backHome = () => {
    router.push("/home");
  };
</script>

<template>
  <div ref="SearchInputView" class="SearchInput w-100 h-100 noScrollBar">
    <!-- 搜索框 -->
    <div class="search d-flex align-items-center">
      <i class="bi bi-arrow-left-short" @click="backHome"></i>
      <div
        class="searchInput bg-body rounded-pill flex-grow-1 me-3 pl-2"
        :class="[theme === 'light' ? 'bg-opacity-75' : 'bg-opacity-50']">
        <form action="/">
          <van-search
            v-model="value"
            placeholder="请输入搜索关键词"
            :autofocus="true"
            background="transparent"
            @search="searchFun"
            :shape="'round'"
            :class="[theme == 'dark' ? 'searchDark' : 'searchLight']" />
        </form>
      </div>
    </div>
    <!-- 搜索历史 -->
    <div class="searchHistory px-3" v-if="!value">
      <div class="d-flex justify-content-between align-items-center">
        <p class="my-2">搜索历史</p>
        <i class="bi bi-trash3 opacity-50" @click="clearHistory"></i>
      </div>
      <ul class="d-flex flex-wrap">
        <li
          class="bg-body px-3 py-2 rounded-pill fs-10 bg-opacity-75 me-2 mt-2"
          v-for="(item, index) in searchHistoryData"
          :key="index">
          {{ item }}
        </li>
      </ul>
    </div>
    <!-- 热门搜索 -->
    <div class="searchReferral mt-5" v-if="!value">
      <div class="d-flex justify-content-between align-items-center">
        <p class="my-2 ml-3">热门搜索</p>
      </div>
      <ul class="mt-3 text-body d-flex flex-wrap w-100">
        <li
          class="d-flex align-items-center mb-3 px-3 noScrollBar w-50"
          v-for="(item, index) in searchReferral"
          :key="item.season_id">
          <span class="index fs-2">{{ index + 1 }}</span>
          <img
            :src="item.vertical_cover + '@100w_100h.jpg'"
            alt=""
            class="pr-3 d-block" />
          <div class="synopsis flex-group-1 noScrollBar">
            <h4 class="fs-9 m-0 one-txt-cut">{{ item.title }}</h4>
            <p class="fs-10 m-0 mt-1 opacity-50 one-txt-cut">
              {{ item.styles[0] }}
            </p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<style lang="scss">
  .search {
    box-sizing: border-box;
    padding: 10px 0;
  }
  .searchDark {
    --van-search-content-background: transparent;
    --van-field-input-text-color: rgb(254, 254, 254);
  }
  .searchLight {
    --van-search-content-background: transparent;
    --van-field-input-text-color: rgb(1, 1, 1);
  }
  .van-search {
    padding: 0;
  }
  .searchReferral {
    img {
      width: 4rem;
    }
    h4 {
      width: 5rem;
    }
    span.index {
      display: block;
      width: 2rem;
    }
    li {
      &:nth-child(1) {
        .index {
          color: red;
        }
      }
      &:nth-child(2) {
        .index {
          color: rgb(241, 132, 7);
        }
      }
      &:nth-child(3) {
        .index {
          color: rgb(238, 185, 87);
        }
      }
    }
  }
</style>

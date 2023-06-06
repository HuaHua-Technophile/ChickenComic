<script setup lang="ts">
  import { ref } from "vue";
  import { useGlobalStore } from "../stores/counter";
  import { getSearchReferral, getSuggestedWord } from "@/api/search";
  import { useRouter, useRoute } from "vue-router";

  //搜索框
  let value = ref("");
  let isFocus = ref(false);
  //搜索框聚焦
  const focusFun = () => {
    isFocus.value = true;
  };
  // 搜索框失去焦点
  const blurFun = () => {
    isFocus.value = false;
  };

  // 获取搜索建议词
  let suggestedWord = ref(null);
  const getSuggestedWordFun = async () => {
    let data = await getSuggestedWord({ term: value.value });
    if (data) {
      suggestedWord.value = data.data;
    }
  };
  let time: any = null;
  const inputKeyWord = () => {
    if (value.value !== "") {
      clearTimeout(time);
      time = setTimeout(() => {
        getSuggestedWordFun();
      }, 500);
    } else {
      suggestedWord.value = null;
    }
  };

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
  let defaultKeyword: any = ref([]);
  const getSearchReferralFun = async () => {
    let data = await getSearchReferral({ num: 12 });
    defaultKeyword.value = data.data[0].title;
    searchReferral.value = data.data?.slice(1, 11);
  };

  getSearchReferralFun();

  //主题切换
  let { theme, changeTheme }: any = useGlobalStore();

  // 返回home主页
  let router: any = useRouter();
  let route: any = useRoute();
  const backHome = () => {
    router.go(-1);
  };
</script>

<template>
  <div
    ref="SearchInputView"
    class="SearchInput w-100 h-100 noScrollBar position-relative">
    <!-- 搜索框 -->
    <div class="search d-flex flex-column align-items-star">
      <i class="bi bi-arrow-left-short" @click="backHome"></i>
      <div
        class="ms-4 transition-5 mt-2"
        :class="[isFocus ? 'opacity-0' : 'opacity-1']">
        <h3 class="fs-3">你想搜</h3>
        <h3 class="fs-3">什么作品呢？</h3>
      </div>
      <div
        class="searchInput position-absolute flex-grow-1 py-2 transition-5"
        :class="[
          theme == 'dark' ? 'bg-black' : 'bg-white',
          isFocus ? 'focus' : '',
        ]">
        <form action="/">
          <van-search
            v-model.trim="value"
            placeholder="请输入作者名/作品名/类型"
            background="transparent"
            @search="searchFun"
            @focus="focusFun"
            @blur="blurFun"
            autocomplete="off"
            @update:model-value="inputKeyWord"
            :class="[theme == 'dark' ? 'searchDark' : 'searchLight']" />
        </form>
      </div>
    </div>
    <!-- 搜索历史 -->
    <div
      class="searchHistory mt-5 px-3"
      :class="[isFocus ? 'opacity-0' : 'opacity-1']"
      v-if="!value && searchHistoryData.length != 0">
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
    <div
      class="searchReferral mt-5 transition-5"
      :class="[isFocus ? 'opacity-0' : 'opacity-1']"
      v-if="!value">
      <div class="d-flex justify-content-between align-items-center">
        <p class="my-2 ms-3">热门搜索</p>
      </div>
      <ul class="mt-3 text-body d-flex flex-wrap w-100">
        <li
          class="d-flex align-items-center mb-3 ps-3 noScrollBar w-50"
          v-for="(item, index) in searchReferral"
          :key="item.season_id">
          <div class="index fs-2">{{ index + 1 }}</div>
          <img
            :src="item.vertical_cover + '@100w_100h.jpg'"
            alt=""
            class="pe-2 d-block" />
          <div class="synopsis fles-group-1 noScrollBar">
            <h4 class="fs-9 m-0 one-txt-cut">{{ item.title }}</h4>
            <p class="fs-10 m-0 mt-1 opacity-50 one-txt-cut">
              {{ item.styles[0] }}
            </p>
          </div>
        </li>
      </ul>
    </div>
    <!-- 搜索建议词 -->
    <div class="SearchSuggestWord position-absolute" v-if="isFocus">
      <ul>
        <li class="py-3" v-for="(item, index) in suggestedWord" :key="index">
          <i class="bi bi-search"></i>
          <span class="ps-2" v-html="item"></span>
        </li>
      </ul>
    </div>
  </div>
</template>
<style lang="scss">
  .search {
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
  .searchInput {
    top: 160px;
    width: 80%;
  }
  .focus {
    width: 100%;
    top: 67.5px;
    transition: all, 0.5s;
  }

  .searchReferral {
    img {
      width: 4rem;
    }
    h4 {
      max-width: 6rem;
    }
    div.index {
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

  em.keyword {
    color: red;
  }

  .SearchSuggestWord {
    top: 150px;
  }
</style>

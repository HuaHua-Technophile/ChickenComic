<script setup lang="ts">
  import { ref, onMounted, onUnmounted } from "vue";
  import { useGlobalStore } from "../stores/counter";
  import BScroll from "better-scroll"; //导入Better scroll核心
  import { getSearchReferral, getSuggestedWord } from "@/api/search";
  import { useRouter } from "vue-router";
  // -----------定时器ID数组------------
  let timeId = ref<Array<number>>([]);
  // -----------路由-------------
  let router: any = useRouter();
  //------------Better scroll实例化-----------
  let SearchInput: any = ref<object | null>(null);
  let bs = ref({});
  onMounted(() => {
    bs.value = new BScroll(SearchInput.value, {
      click: true,
    });
  });
  // ---------搜索框------------
  let keyword = ref(""); //关键词
  let isFocus = ref(false); //是否聚焦
  //--------搜索框聚焦/失去焦点-----------
  const focusFun = () => {
    isFocus.value = true;
  };
  const blurFun = () => {
    timeId.value.push(
      setTimeout(() => {
        isFocus.value = false;
      }, 200)
    );
  };
  // -----------获取搜索建议词----------
  let suggestedWord = ref(null);
  const getSuggestedWordFun = async () => {
    let data = await getSuggestedWord({ term: keyword.value });
    if (data) {
      suggestedWord.value = data.data;
      console.log(data);
    }
  };
  let time: any = null;
  const inputKeyWord = () => {
    if (keyword.value !== "") {
      clearTimeout(time);
      time = setTimeout(() => {
        getSuggestedWordFun();
      }, 400);
    } else {
      suggestedWord.value = null;
    }
  };
  //-----------获取历史记录数据-----------
  let searchHistoryData: any = ref([]);
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
  //-----------添加搜索历史----------
  const searchHistoryAdd = () => {
    let index = searchHistoryData.value.findIndex(
      (item: any) => item == keyword.value
    );
    if (index === -1) {
      searchHistoryData.value.push(keyword.value);
      localStorage.setItem(
        "searchHistory",
        JSON.stringify(searchHistoryData.value)
      );
    }
  };
  //------------清除历史记录-------------
  const clearHistory = () => {
    searchHistoryData.value = [];
    localStorage.setItem(
      "searchHistory",
      JSON.stringify(searchHistoryData.value)
    );
  };
  //------------获取热门搜索---------
  let searchReferral: any = ref([]);
  let defaultKeyword: any = ref([]);
  const getSearchReferralFun = async () => {
    let data = await getSearchReferral({ num: 12 });
    defaultKeyword.value = data.data[0].title;
    searchReferral.value = data.data?.slice(1, 11);
  };
  getSearchReferralFun();

  //---------主题切换----------
  let { theme }: any = useGlobalStore();
  //点击热搜跳转
  const openContentView = (id: number) => {
    router.push({
      path: "/comicCover",
      query: {
        id: id,
      },
    });
  };
  const toSearchResult = (word: string) => {
    keyword.value = word
      .replace(/<em class="keyword"\>/g, "")
      .replace(/\<\/em>/g, "");
    searchHistoryAdd();
    // 跳转搜索结果
    router.push({
      path: "/SearchCategories",
      query: {
        keyword: keyword.value,
      },
    });
  };
  // ------------搜索框回车 -----------
  const enterSearch = () => {
    if (keyword.value !== "") {
      toSearchResult(keyword.value);
    }
  };
  // 清除定时器
  onUnmounted(() => {
    timeId.value.forEach((item: number) => {
      clearTimeout(item);
    });
  });
</script>
<template>
  <div ref="SearchInput" class="SearchInput w-100 h-100 noScrollBar">
    <!-- 滚动核心 -->
    <div style="min-height: calc(100% + 1px); padding-top: 67.5px">
      <!-- 头部 -->
      <div
        class="position-relative overflow-hidden"
        style="padding-bottom: 50px">
        <!-- 搜索页头部文本 -->
        <transition name="sideDown">
          <div class="py-3 ps-4" v-show="!isFocus">
            <h1 class="fs-3 mb-0">
              ようこそ<br />
              何を探すんですか?
            </h1>
          </div>
        </transition>
        <!-- 搜索输入框 -->
        <div
          class="searchInputDom py-2 transition-5 position-absolute"
          :class="[
            theme == 'dark' ? 'bg-black' : 'bg-white',
            isFocus ? 'active' : '',
          ]">
          <form action="/">
            <van-search
              v-model.trim="keyword"
              placeholder="请输入作者名/作品名/类型"
              background="transparent"
              @search="searchHistoryAdd"
              @keydown.enter="enterSearch"
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
        class="searchHistory mt-3 px-3"
        :class="[isFocus ? 'opacity-0' : 'opacity-1']"
        v-if="!keyword && searchHistoryData.length != 0">
        <div class="d-flex justify-content-between align-items-center">
          <p class="my-2">搜索历史</p>
          <i class="bi bi-trash3 opacity-50" @click="clearHistory"></i>
        </div>
        <ul class="d-flex flex-wrap">
          <li
            class="bg-body px-3 py-2 rounded-pill fs-10 bg-opacity-75 me-2 mt-2"
            v-for="(item, index) in searchHistoryData"
            :key="index"
            @click="toSearchResult(item)">
            {{ item }}
          </li>
        </ul>
      </div>
      <!-- 热门搜索 -->
      <transition name="sideDown">
        <div class="searchReferral mt-4 transition-5" v-show="!isFocus">
          <div class="d-flex justify-content-between align-items-center">
            <p class="my-2 ms-3">热门搜索</p>
          </div>
          <ul class="mt-3 text-body d-flex flex-wrap w-100">
            <li
              class="d-flex align-items-center mb-3 ps-3 noScrollBar w-50"
              v-for="(item, index) in searchReferral"
              :key="item.season_id"
              @click="openContentView(item.season_id)">
              <div class="index fs-2">{{ index + 1 }}</div>
              <img
                :src="item.vertical_cover + '@100w_100h.jpg'"
                alt=""
                class="pe-2 d-block" />
              <div class="synopsis fles-group-1 noScrollBar">
                <h4 class="fs-9 m-0 van-ellipsis">{{ item.title }}</h4>
                <p class="fs-10 m-0 mt-1 opacity-50 van-ellipsis">
                  {{ item.styles[0] }}
                </p>
              </div>
            </li>
          </ul>
        </div>
      </transition>
      <!-- 搜索建议词 -->
      <div class="SearchSuggestWord position-absolute" v-if="isFocus">
        <ul>
          <li
            class="py-3"
            v-for="(item, index) in suggestedWord"
            :key="index"
            @click="toSearchResult(item)">
            <i class="bi bi-search"></i>
            <span class="ps-2" v-html="item"></span>
          </li>
        </ul>
      </div>
    </div>
    <!-- 返回 -->
    <back-component class="position-fixed"></back-component>
  </div>
</template>
<style lang="scss">
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
  .searchInputDom {
    width: 80%;
    top: 87.88px;
  }
  .searchInputDom.active {
    top: 0;
    width: 100%;
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

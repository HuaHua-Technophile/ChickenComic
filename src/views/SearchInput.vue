<script setup lang="ts">
  import { ref, onMounted, onUnmounted } from "vue";
  import { useThemeStore } from "../stores/theme";
  import BScroll from "better-scroll"; //导入Better scroll核心
  import ObserveDOM from "@better-scroll/observe-dom"; //ObserveDOM插件
  import { getSearchReferral, getSuggestedWord } from "@/api/search";
  import { useRouter } from "vue-router";
  import debounce from "lodash/debounce"; //导入lodash防抖

  // -----------定时器ID数组------------
  let timeId: Array<number> = [];
  // -----------路由-------------
  let router = useRouter();
  // ------------Better scroll实例化-----------
  let SearchInput = ref();
  BScroll.use(ObserveDOM); // 自动重载插件
  let bs = ref({});
  onMounted(() => {
    bs.value = new BScroll(SearchInput.value, {
      click: true,
      observeDOM: true,
    });
  });
  // ------------搜索框------------
  let keyword = ref(""); //关键词
  let isFocus = ref(false); //搜索框是否聚焦
  // --------搜索框聚焦/失去焦点-----------
  const focusFun = () => {
    isFocus.value = true;
  };
  const blurFun = () => {
    timeId.push(
      setTimeout(() => {
        isFocus.value = false;
        keyword.value = "";
        suggestedWord.value = [];
      }, 310) //需要设定延时器,否则失焦后数组立马清空,无法点击搜索建议词进行跳转
    );
  };
  // -----------获取搜索建议词----------

  let suggestedWord = ref();
  const getSuggestedWordFun = async () => {
    let data = await getSuggestedWord({ term: keyword.value });
    if (data) suggestedWord.value = data.data;
  };
  const inputKeyWord = debounce(function () {
    if (keyword.value != "") getSuggestedWordFun();
    else suggestedWord.value = null;
  }, 500);
  //-----------历史记录数据初始化-----------
  let searchHistoryData = ref<Array<string>>([]);
  const initializationHistory = () => {
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
  initializationHistory();
  //-----------添加搜索历史----------
  const searchHistoryAdd = () => {
    let index = searchHistoryData.value.findIndex(
      (item) => item == keyword.value
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
  let searchReferral = ref<Array<{ season_id: number }>>([]);
  let defaultKeyword = ref([]);
  const getSearchReferralFun = async () => {
    let data = await getSearchReferral({ num: 12 });
    console.log(data);
    defaultKeyword.value = data.data[0].title;
    searchReferral.value = data.data?.slice(1, 11);
  };
  getSearchReferralFun();
  //---------主题切换----------
  let { theme } = useThemeStore();
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
      path: "/SearchResults",
      query: {
        keyword: keyword.value,
      },
    });
  };
  // ------------搜索框回车 -----------
  const enterSearch = debounce(function () {
    if (keyword.value != "") {
      toSearchResult(keyword.value);
    }
  }, 300);
  // 销毁前清除定时器
  onUnmounted(() => {
    timeId.forEach((item) => {
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
        style="padding-bottom: calc(50px + 3px)">
        <!-- 搜索页头部文本 -->
        <transition name="sideDown">
          <div class="py-3 ps-4 fs-3 t-shadow-2" v-show="!isFocus">
            ようこそ<br />
            何を探すんですか?
          </div>
        </transition>
        <!-- 搜索输入框 -->
        <div
          class="searchInputDom py-2 transition-5 position-absolute bg-opacity-50 insetShadow-2-2"
          :class="[
            theme == 'light' ? 'bg-white' : 'bg-black',
            isFocus ? 'active' : 'rounded-2',
          ]">
          <form action="/">
            <van-search
              v-model.trim="keyword"
              placeholder="作者名/作品名/ジャンルを入力します"
              background="transparent"
              @search="searchHistoryAdd"
              @keydown.enter="enterSearch"
              @focus="focusFun"
              @blur="blurFun"
              autocomplete="off"
              @update:model-value="inputKeyWord"
              :class="[theme == 'light' ? 'searchLight' : 'searchDark']" />
          </form>
        </div>
      </div>
      <!-- 搜索历史 -->
      <transition name="sideDown">
        <div
          v-show="!isFocus && searchHistoryData.length != 0"
          class="searchHistory mt-3 px-3">
          <div
            class="d-flex justify-content-between align-items-center opacity-50">
            <p class="my-2">検索履歴です</p>
            <i class="bi bi-trash3" @click="clearHistory"></i>
          </div>
          <ul class="d-flex flex-wrap">
            <li
              class="bg-body rounded-pill fs-7 bg-opacity-50 me-3 mb-2 insetShadow-2-2"
              style="padding: 3px 13px"
              v-for="(item, index) in searchHistoryData"
              :key="index"
              @click="toSearchResult(item)">
              {{ item }}
            </li>
          </ul>
        </div>
      </transition>
      <!-- 热门搜索 -->
      <transition name="sideDown">
        <div class="searchReferral mt-4 transition-5" v-show="!isFocus">
          <p class="my-2 ms-3 opacity-50">人気検索</p>
          <ul class="w-100 mt-3 text-body d-flex flex-wrap">
            <di第v】
              class="w-50 mb-2 d-flex align-items-center"
              v-for="(item, index) in searchReferral"
              :key="item.season_id"
              @click="openContentView(item.season_id)">
              <!-- 排序 人气搜索前标号 -->
              <div
                class="index text-center flex-shrink-0"
                :class="[index < 3 ? 'fw-bold fs-1' : 'fs-4']">
                {{ index + 1 }}
              </div>
              <!-- 漫画Item -->
              <comic-item-component
                :comicInfo="item"
                :imgWidth="70.4"
                :fontSize="14.5"></comic-item-component>
            </div>
          </ul>
        </div>
      </transition>
      <!-- 搜索建议词 -->
      <transition name="sideUp100">
        <ul v-if="isFocus" class="position-absolute" style="top：150px">
          <li
            class="p-3 d-flex align-items-center"
            v-for="(item, index) in suggestedWord"
            :key="index"
            @click="toSearchResult(item + '')">
            <i class="bi bi-search fs-5 me-3"></i>
            <span v-html="item"></span>
          </li>
        </ul>
      </transition>
    </div>
    <!-- 返回 -->
    <back-component class="position-fixed"></back-component>
  </div>
</template>
<style lang="scss" scoped>
  .van-search {
    padding: 0;
  }
</style>
<style lang="scss">
  .searchDark {
    --van-search-content-background: transparent;
    --van-field-input-text-color: rgb(254, 254, 254);
  }
  .searchLight {
    --van-search-content-background: transparent;
    --van-field-input-text-color: rgb(1, 1, 1);
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
      width: 4.4rem;
      margin-right: 5px;
    }
    div.index {
      width: 1.8rem;
    }
    & li:nth-child(1) .index {
      color: rgb(255, 23, 112) !important;
    }
    & li:nth-child(2) .index {
      color: rgb(241, 132, 7) !important;
    }
    & li:nth-child(3) .index {
      color: rgb(238, 185, 87) !important;
    }
  }
  .van-field__control::placeholder {
    color: rgba(var(--bs-body-color-rgb), 0.5);
    text-shadow: 0 0 3px rgba(var(--bs-body-color-rgb), 0.3);
  }
</style>

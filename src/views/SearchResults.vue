<script setup lang="ts">
  import { ref, onMounted, computed, watchEffect } from "vue";
  import { getSearchResult } from "../api/search";
  import BScroll from "better-scroll"; //导入Better scroll核心
  import ObserveImage from "@better-scroll/observe-image"; //导入自动重新计算Better scroll
  import throttle from "lodash/throttle"; //Lodash节流
  import { useRouter, useRoute } from "vue-router";
  import Pullup from "@better-scroll/pull-up";
  let router = useRouter();
  let route = useRoute();
  // ---------------- 上拉加载更多-------------
  let pageNumber = ref(1);
  let handelFunction = throttle(() => {
    if (loadFlag) {
      pageNumber.value++;
      getSearchResultFun();
    }
    bs.value.finishPullUp();
    bs.value.refresh();
  }, 500);
  //------------------better scroll实例化相关-----------
  BScroll.use(Pullup);
  BScroll.use(ObserveImage);
  let searchResultList = ref();
  let bs = ref(); //Better scroll实例化后对象的存储
  onMounted(() => {
    bs.value = new BScroll(searchResultList.value, {
      click: true,
      observeImage: {
        debounceTime: 500, // ms
      },
      pullUpLoad: true,
    });
    bs.value.on("pullingUp", handelFunction);
  });
  //---------- 搜索框关键词 -------------
  let keyWord = ref("我推的孩子");
  watchEffect(() => {
    keyWord.value = route.query.keyword + "";
  });
  // --------若没有该分类数据，自动加载下一页进行匹配----------
  const findDataInnextPage = throttle(() => {
    pageNumber.value++;
    tryAgainNum.value++;
    if (tryAgainNum.value <= 20) {
      getSearchResultFun();
    } else {
      loadFlag.value = false;
      tryAgainNum.value = 0;
    }
  }, 500);
  //-----------根据选择获取搜索结果数据-----------
  let newData = ref(0); // 选项后符合条件的数据个数
  let tryAgainNum = ref(0); // 自动加载次数
  let SearchResult = ref<Array<{ id: number }>>([]); // 结果
  let loadFlag = ref(true); // 加载开关
  // 数据请求核心函数
  const getSearchResultFun = async () => {
    let data = await getSearchResult({
      keyWord: keyWord.value,
      order: sort1.value,
      pageNum: pageNumber.value,
      isFinish: isFinshVal.value,
      isFree: isFreeVal.value,
    });
    if (sort2.value == "-1") {
      newData.value += data.data.list.length;
      if (newData.value >= 10) {
        SearchResult.value = SearchResult.value.concat(data.data.list);
        newData.value = 0;
        tryAgainNum.value = 0;
      } else {
        findDataInnextPage();
      }
    } else {
      data.data.list.forEach((n) => {
        let index = n.styles.findIndex((item) => item == sort2.value);
        if (index !== -1) {
          SearchResult.value = SearchResult.value.concat(n);
          newData.value++;
        }
      });
      if (newData.value >= 10) {
        newData.value = 0;
        tryAgainNum.value = 0;
      } else {
        findDataInnextPage();
      }
    }
  };
  //------------作者数据格式处理---------------
  const allAuthors = computed(() => {
    return function (val: Array<string>) {
      let authors: string = "";
      val.forEach((item: string, index) => {
        if (val.length - 1 === index) {
          authors += item;
          return;
        }
        authors += item + "-";
      });
      return authors;
    };
  });
  // --------首次加载默认分类--------
  onMounted(() => {
    getSearchResultFun();
  });
  // ------------分类数据 -------------
  const sort1 = ref(-1);
  const sort2 = ref("-1");
  const sort3 = ref("-1");
  const option1 = [
    { text: "黙認順序付け", value: -1 },
    { text: "人気のおすすめ", value: 0 },
    { text: "更新の時間", value: 1 },
    { text: "店頭に並ぶ時間", value: 2 },
  ];
  const option2 = [
    { text: "全部です", value: "-1" },
    { text: "熱血です", value: "热血" },
    { text: "古代です", value: "古风" },
    { text: "玄幻です", value: "玄幻" },
    { text: "ファンタジー", value: "奇幻" },
    { text: "サスペンス", value: "悬疑" },
    { text: "都市です", value: "都市" },
    { text: "歴史です", value: "历史" },
    { text: "武俠仙俠", value: "武侠仙侠" },
    { text: "ゲーム競技", value: "游戏竞技" },
    { text: "サスペンス", value: "悬疑灵异" },
    { text: "フィクション", value: "架空" },
    { text: "青春です", value: "青春" },
    { text: "西洋幻想", value: "西幻" },
    { text: "現代です", value: "现代" },
    { text: "プラスエネルギー", value: "正能量" },
    { text: "エスエフ", value: "科幻" },
  ];
  const option3 = [
    { text: "全部です", value: "-1" },
    { text: "連載します", value: "连载" },
    { text: "完結です", value: "完结" },
    { text: "無料です", value: "免费" },
    { text: "有料です", value: "付费" },
  ];
  // -----------------选择结果分类-----------------------
  const selectType = () => {
    loadFlag.value = true;
    newData.value = 0;
    pageNumber.value = 1;
    SearchResult.value = [];
    getSearchResultFun();
  };
  // ------根据连载进度/付费分类---------
  let isFinshVal = ref(-1);
  let isFreeVal = ref(-1);
  watchEffect(() => {
    if (sort3.value == "-1") {
      isFinshVal.value = -1;
      isFreeVal.value = -1;
    } else if (sort3.value == "免费") {
      isFreeVal.value = 1;
    } else if (sort3.value == "付费") {
      isFreeVal.value = 0;
    } else if (sort3.value == "连载") {
      isFinshVal.value = 0;
    } else if (sort3.value == "完结") {
      isFinshVal.value = 1;
    }
  });
  // 点击分类结果跳转对应的详情页
  const openContentView = (id: number) => {
    router.push({
      path: "/comicCover",
      query: {
        id: id,
      },
    });
  };
</script>
<template>
  <div class="SearchResults w-100 h-100 d-flex flex-column">
    <!-- 头部 -->
    <back-component>
      <template #searchInput>
        <div
          @click="$router.go(-1)"
          class="d-flex align-items-center py-2 px-3 mx-3 bg-body bg-opacity-50 rounded-pill insetShadow-2-2">
          {{ keyWord }}
        </div>
      </template>
    </back-component>
    <!-- 分类 -->
    <van-dropdown-menu
      :z-index="10"
      class="my-3"
      :overlay="true"
      active-color="#ff1770">
      <van-dropdown-item
        v-model="sort1"
        @change="selectType"
        :options="option1" />
      <van-dropdown-item
        v-model="sort2"
        :options="option2"
        @change="selectType" />
      <van-dropdown-item
        v-model="sort3"
        :options="option3"
        @change="selectType" />
    </van-dropdown-menu>
    <!-- 滚动容器 -->
    <div
      class="searchResultList w-100 flex-grow-1 overflow-hidden"
      ref="searchResultList">
      <!-- 滚动核心 -->
      <ul style="min-height: calc(100% + 1px)">
        <!-- <li
          class="d-flex mt-4 overflow-hidden"
          v-for="item in SearchResult"
          :key="item.id"
          @click="openContentView(item.id)">
          <div class="img-box mx-3">
            <img :src="item.vertical_cover + '@100w_100h.jpg'" alt="" />
          </div>
          <div class="details d-fles w-100">
            <div class="name my-2 " v-html="item.title"></div>
            <div class="fs-10 opacity-75  w-50">
              {{ allAuthors(item.author_name) }}
            </div>
            <div class="fs-10 opacity-75 ">
              {{ allAuthors(item.styles) }}
            </div>
            <div class="fs-10 opacity-75 mt-1">
              {{ item.is_finish === 0 ? "连载中" : "完结" }}
            </div>
          </div>
        </li> -->
        <li v-for="item in SearchResult" :key="item.id"></li>
        <li class="w-100 py-3 text-center">
          <van-loading v-if="loadFlag" />
          <p class="w-100 py-3 text-center opacity-50" v-else>
            これ以上ありません~
          </p>
        </li>
      </ul>
    </div>
  </div>
</template>
<style lang="scss">
  .SearchResults {
    --van-cell-text-color: var(--bs-light);
    --van-dropdown-menu-title-text-color: var(--bs-body-color);
    .van-dropdown-menu__bar,
    .van-dropdown-item__content,
    .van-dropdown-item__option {
      background-color: transparent;
    }
    .van-dropdown-item::after {
      content: "";
      display: block;
      position: absolute;
      width: 100%;
      height: 100%;
      backdrop-filter: blur(10px);
    }
    .van-cell__value {
      // 右侧选中提示的打勾
      display: none;
    }
    .van-popup {
      > .van-cell:last-child::before {
        //利用before，规避vant默认的对末尾item的样式屏蔽
        position: absolute;
        box-sizing: border-box;
        content: " ";
        pointer-events: none;
        right: var(--van-padding-md);
        bottom: 0;
        left: var(--van-padding-md);
        border-bottom: 1px solid var(--van-cell-border-color);
        transform: scaleY(0.5);
      }
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
  }
</style>

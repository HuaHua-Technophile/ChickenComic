<script setup lang="ts">
  import { ref, onMounted, computed, watchEffect, watch } from "vue";
  import { useGlobalStore } from "../stores/counter";
  import { getSearchResult } from "../api/search";
  import BScroll from "better-scroll"; //导入Better scroll核心
  import ObserveImage from "@better-scroll/observe-image"; //导入自动重新计算Better scroll
  import throttle from "lodash/throttle"; //Lodash节流
  import { useRouter, useRoute } from "vue-router";
  import Pullup from "@better-scroll/pull-up";
  let time: any = null; //节流
  let pageNumber = ref(1);
  let handelFunction = () => {
    clearTimeout(time);
    time = setTimeout(() => {
      pageNumber.value++;
      getSearchResultFun();
    }, 500);

    // getSearchResultFun(pageNumber.value);
    bs.value.finishPullUp();
    bs.value.refresh();
  };
  //------------------better scroll实例化相关-----------
  BScroll.use(Pullup);
  BScroll.use(ObserveImage);
  let searchResultList: any = ref<object | null>(null);
  let bs: { on: Function } | any = ref({}); //Better scroll实例化后对象的存储
  onMounted(() => {
    bs.value = new BScroll(searchResultList.value as HTMLElement, {
      click: true,
      observeImage: {
        debounceTime: 500, // ms
      },
      pullUpLoad: true,
    });
    bs.value.on("pullingUp", handelFunction);
  });

  let keyWord: any = ref("我推的孩子");

  // //若没有该分类数据，自动加载下一页进行匹配
  const findDataInnextPage = () => {
    pageNumber.value++;
    getSearchResultFun();
  };
  //-----------获取搜索结果数据-----------

  let newData: any = ref(0);
  let SearchResult: any = ref([]);

  let throttlefun = throttle(findDataInnextPage, 300);
  const getSearchResultFun = async () => {
    let data = await getSearchResult({
      keyWord: "我退的孩子",
      order: value1.value,
      pageNum: pageNumber.value,
      isFinish: isFinshVal.value,
      isFree: isFreeVal.value,
    });
    if (value2.value == "-1") {
      newData.value += data.data.list.length;
      if (newData.value >= 10) {
        SearchResult.value = SearchResult.value.concat(data.data.list);
      } else {
        findDataInnextPage();
        console.log(newData.value, "again");
        newData.value = 0;
      }
    } else {
      data.data.list.forEach((n: any) => {
        let index = n.styles.findIndex((item: any) => item == value2.value);
        if (index !== -1) {
          SearchResult.value = SearchResult.value.concat(n);
          newData.value++;
        }
      });
      if (newData.value >= 10) {
        newData.value = 0;
      } else {
        console.log(newData.value);
        throttlefun();
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

  onMounted(() => {
    getSearchResultFun();
  });
  let { theme, changeTheme }: any = useGlobalStore();

  // 重新输入关键词搜索
  let router: any = useRouter();
  let route: any = useRoute();
  const reSearch = () => {
    router.push("/SearchInput");
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

  // -----------------选择结果分类-----------------------

  const selectType = () => {
    newData.value = 0;
    pageNumber.value = 1;
    SearchResult.value = [];
    getSearchResultFun();
  };

  // 根据连载进度/付费分类
  let isFinshVal = ref(-1);
  let isFreeVal = ref(-1);
  watchEffect(() => {
    if (value3.value == "-1") {
      isFinshVal.value = -1;
      isFreeVal.value = -1;
    } else if (value3.value == "免费") {
      isFreeVal.value = 1;
    } else if (value3.value == "付费") {
      isFreeVal.value = 0;
    } else if (value3.value == "连载") {
      isFinshVal.value = 0;
    } else if (value3.value == "完结") {
      isFinshVal.value = 1;
    }
  });
</script>
<template>
  <div class="SearchCategories w-100 h-100 d-flex flex-column">
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
    <van-dropdown-menu :z-index="10" class="my-3" :overlay="true">
      <van-dropdown-item
        v-model="value1"
        @change="selectType"
        :options="option1" />
      <van-dropdown-item
        v-model="value2"
        :options="option2"
        @change="selectType" />
      <van-dropdown-item
        v-model="value3"
        :options="option3"
        @change="selectType" />
    </van-dropdown-menu>
    <div
      class="searchResultList w-100 flex-grow-1 overflow-hidden"
      ref="searchResultList">
      <ul style="min-height: calc(100% + 5px)">
        <li
          class="d-flex mt-4 overflow-hidden"
          v-for="item in SearchResult"
          :key="item.id">
          <div class="img-box mx-3">
            <img :src="item.vertical_cover + '@100w_100h.jpg'" alt="" />
          </div>
          <div class="details d-fles w-100">
            <div class="name my-2 van-ellipsis" v-html="item.title"></div>
            <div class="fs-10 opacity-75 van-ellipsis w-50">
              {{ allAuthors(item.author_name) }}
            </div>
            <div class="fs-10 opacity-75 van-ellipsis">
              {{ allAuthors(item.styles) }}
            </div>
            <div class="fs-10 opacity-75 mt-1">
              {{ item.is_finish === 0 ? "连载中" : "完结" }}
            </div>
          </div>
        </li>
        <li class="w-100 py-4 text-center">
          <van-loading />
        </li>
      </ul>
    </div>
  </div>
</template>
<style lang="scss">
  .van-dropdown-menu__bar {
    color: #fff;
    background-color: transparent;
  }

  .van-ellipsis {
    color: #fff;
  }
  .van-dropdown-item {
  }
  .van-dropdown-item::after {
    content: "";
    display: block;
    position: absolute;
    width: 100%;
    height: 100%;
    backdrop-filter: blur(10px);
  }
  .van-dropdown-item__option--active {
    .van-cell__title {
      color: red;
    }
  }
  .van-dropdown-item__content {
    background-color: transparent;
  }
  .van-dropdown-item__option {
    background-color: transparent;
    color: #fff;
  }
  .van-cell--clickable {
    .van-cell__value {
      display: none;
    }
  }
  .details {
    em {
      font-style: normal;
    }
    em.keyword {
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

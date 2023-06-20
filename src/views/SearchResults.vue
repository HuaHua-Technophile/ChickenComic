<script setup lang="ts">
  import { ref, onMounted, watchEffect, watch } from "vue";
  import { getSearchResult } from "../api/search";
  import BScroll from "better-scroll"; //导入Better scroll核心
  import ObserveDOM from "@better-scroll/observe-dom"; //导入自动重新计算BS实例
  import { useRoute } from "vue-router";
  import Pullup from "@better-scroll/pull-up";
  let route = useRoute();
  //---------- 搜索框关键词 ----------------
  let keyWord = ref();
  watchEffect(() => {
    keyWord.value = route.query.keyword + "";
  }); //watch 在响应数据初始化时是不会执行回调函数的，watchEffect 在响应数据初始化时就会立即执行回调函数。
  // ------------分类数据 -------------
  const sort1 = ref("-1"); //默认排序/人气排序/更新时间/上架时间
  const sort2 = ref("-1"); //类型
  const sort3 = ref("-1"); //连载/完结
  const sort4 = ref("-1"); //免费/付费
  const option1 = [
    { text: "黙認順序付け", value: "-1" },
    { text: "人気のおすすめ", value: "0" },
    { text: "更新の時間", value: "1" },
    { text: "店頭に並ぶ時間", value: "2" },
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
    { text: "連載します", value: "0" },
    { text: "完結です", value: "1" },
  ];
  const option4 = [
    { text: "全部です", value: "-1" },
    { text: "無料です", value: "0" },
    { text: "有料です", value: "1" },
  ];
  let pageNumber = ref(1);
  let isPullUpLoad = ref(false); // 加载开关,是否显示loading
  let loadFinish = false; //是否加载完毕全部相关漫画数据，用以禁止多余网络请求
  let res = ref<Array<{ styles: Array<string> }>>([]); //请求回来的原始数据
  let domList = ref(); //真正放入dom模板中遍历的数据.因为类型分类的存在,切换分类后直接从res中拿取符合分类结果的item放入domList中
  // -------------数据加载------------
  const SearchResultLoad = async () => {
    let result = await getSearchResult({
      keyWord: keyWord.value,
      order: sort1.value,
      pageNum: pageNumber.value,
      isFinish: sort3.value,
      isFree: sort4.value,
    });
    // 如果数据存在或还有数据(大于0)
    if (result.data.list.length > 0) {
      res.value.push(...result.data.list);
      pageNumber.value++;
      // 如果请求回来不足20条，说明没有下一页了
      if (result.data.list.length < 20) {
        loadFinish = true; //设置为加载完毕
        console.log("进入了");
        bs.value.closePullUp();
      }
    } else {
      loadFinish = true;
      bs.value.closePullUp();
    }
  };
  onMounted(() => {
    SearchResultLoad();
  });
  // -------------根据类型,筛选真实遍历数据------------------
  watchEffect(() => {
    if (sort2.value == "-1")
      domList.value = res.value; //不做筛选，全部放入DOMList遍历
    else {
      console.log("判断到结果变化且不为'全部'");
      domList.value = res.value.filter((i) => i.styles[0] == sort2.value);
    } //做筛选后放入DOMList遍历
  });
  // ---------------- 上拉加载更多-------------
  let pullUpload = () => {
    // 因为bs实例无法调用closePullUp方法关闭上拉回调，因此添加判断：如果没加载完
    if (!loadFinish) {
      isPullUpLoad.value = true;
      SearchResultLoad();
      isPullUpLoad.value = false;
      bs.value.finishPullUp();
    }
  };
  //------------------better scroll实例化相关-----------
  BScroll.use(Pullup);
  BScroll.use(ObserveDOM);
  let searchResultList = ref();
  let bs = ref(); //Better scroll实例化后对象的存储
  onMounted(() => {
    bs.value = new BScroll(searchResultList.value, {
      click: true,
      observeDOM: true, // 开启 observe-dom 插件
      pullUpLoad: true,
    });
    bs.value.on("pullingUp", pullUpload);
  });
  // -----------------选择结果分类-----------------------
  const selectType = () => {
    pageNumber.value = 1; //除了修改"类型",其他都需要重新请求,因此页码归为1
    SearchResultLoad();
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
      <van-dropdown-item v-model="sort2" :options="option2" />
      <van-dropdown-item
        v-model="sort3"
        :options="option3"
        @change="selectType" />
      <van-dropdown-item
        v-model="sort4"
        :options="option4"
        @change="selectType" />
    </van-dropdown-menu>
    <!-- 滚动容器 -->
    <div
      class="searchResultList w-100 flex-grow-1 overflow-hidden"
      ref="searchResultList">
      <!-- 滚动核心 -->
      <ul style="min-height: calc(100% + 1px)" class="px-3">
        <comic-item-component
          v-for="item in domList"
          :key="item.id"
          :comicInfo="item"
          :imgWidth="50"
          :fontSize="18"
          class="mb-2"></comic-item-component>
        <li class="w-100 py-3 text-center">
          <van-loading v-if="isPullUpLoad" />
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
    img {
      margin-right: 15px !important;
    }
  }
</style>

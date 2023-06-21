<script setup lang="ts">
  import { ref, onMounted, toRef } from "vue";
  import { getAllLabel, getClassPage } from "@/api/category";
  import BScroll from "better-scroll"; //导入Better scroll核心
  import ObserveImage from "@better-scroll/observe-image"; //导入自动重新计算Better scroll
  import ObserveDOM from "@better-scroll/observe-dom"; //ObserveDOM插件
  import Pullup from "@better-scroll/pull-up";
  import { useRouter } from "vue-router";
  import throttle from "lodash/throttle"; //Lodash节流
  interface activeListType {
    [name: string]: number;
  }
  interface allLabelType {
    [key: string]: Array<{
      id: number;
      name: string;
    }>;
  }
  interface resultListType {
    season_id: number;
    vertical_cover: string;
    title: string;
    bottom_info: string;
  }
  //------------Better scroll实例化-----------
  let ComicClassification = ref();
  BScroll.use(Pullup);
  BScroll.use(ObserveImage);
  BScroll.use(ObserveDOM); // 自动重载插件
  let bs = ref();
  onMounted(() => {
    bs.value = new BScroll(ComicClassification.value, {
      click: true,
      observeDOM: true,
      observeImage: true,
      pullUpLoad: true,
    });
    bs.value.on("pullingUp", pullUpLoad);
  });
  // -----------分类项--------------
  let allLabel = ref<allLabelType>({
    areas: [],
    orders: [],
    prices: [],
    status: [],
    styles: [],
  });
  let activeList = ref<activeListType>({
    areas: -1,
    orders: -1,
    prices: -1,
    status: -1,
    styles: -1,
  }); //请求参数
  //------------获取分类筛选条件------------------
  const getAllLabelFun = async () => {
    let res = await getAllLabel();
    allLabel.value = res.data;
    for (let key in allLabel.value) {
      allLabel.value[key].unshift({ id: -1, name: "全部" });
    }
  };
  getAllLabelFun();
  // ------------------选择分类更换参数重新请求数据-----------------------
  const selectType = (name: string, id: number) => {
    activeList.value[name] = id;
    // 初始化
    loadFlag.value = true;
    pageNumber.value = 1; //页码归位
    resultList.value = []; //更换分类后清空数据存放
    getClassPageFun(); //获取数据
  };
  // -------------- 获取分类后的漫画数据-------------------
  let pageNumber = ref(1); // 页数
  let resultList = ref<Array<resultListType>>([]); // 存放待遍历数据
  const getClassPageFun = async () => {
    let res = await getClassPage({
      styleId: activeList.value.styles,
      areaId: activeList.value.areas,
      isFinish: activeList.value.status,
      order: activeList.value.orders,
      isFree: activeList.value.prices,
      pageNum: pageNumber.value,
    });
    resultList.value!.push(...res.data);
  };
  getClassPageFun(); //首页加载时请求一次默认数据
  //----------------上啦加载更多----------------
  const findDataInnextPage = throttle(() => {
    pageNumber.value++;
    getClassPageFun();
  }, 2000);
  let pullUpLoad = () => {
    loadFlag.value = true;
    findDataInnextPage();
    bs.value.finishPullUp();
    bs.value.refresh();
  };
  let loadFlag = ref(false); // loading 显示开关
  let activeNames = toRef(["0"]); // 筛选框开关
  onMounted(() => {
    bs.value.on("scrollStart", closeTyoeFun);
  }); //添加滚动事件
  // -------------=筛选框自动缩回----------------
  const closeTyoeFun = () => {
    if (activeNames.value.length !== 1) {
      setTimeout(() => {
        activeNames.value = ["0"];
      }, 300);
    }
  };
  // -------------点击分类结果跳转对应的详情页------------------
  let router = useRouter();
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
  <div
    class="ComicClassification w-100 h-100 noScrollBar"
    ref="ComicClassification">
    <!-- 滚动核心 -->
    <div class="scollContent" style="min-height: calc(100% + 1px)">
      <!-- 分类 -->
      <ul class="allLabel d-flex flex-wrap text-center justify-content-around">
        <li
          class="p-2 bg-body bg-opacity-50 rounded-3 m-2 insetShadow-1-5"
          v-for="item in allLabel.styles"
          :class="{ active: item.id == activeList.styles }"
          :key="item.id"
          @click="selectType('styles', item.id)">
          {{ item.name }}
        </li>
      </ul>
      <!-- 筛选 -->
      <van-collapse v-model="activeNames" :border="false">
        <van-collapse-item title="筛选" name="1">
          <ul class="typeList d-flex mb-3">
            <li
              v-for="item in allLabel.areas"
              :key="item.id"
              class="text-center"
              :class="{ active: item.id == activeList.areas }"
              @click="selectType('areas', item.id)">
              {{ item.name }}
            </li>
          </ul>
          <ul class="typeList d-flex mb-3">
            <li
              v-for="item in allLabel.orders"
              :key="item.id"
              class="text-center"
              :class="{ active: item.id == activeList.orders }"
              @click="selectType('orders', item.id)">
              {{ item.name }}
            </li>
          </ul>
          <ul class="typeList d-flex mb-3">
            <li
              v-for="item in allLabel.prices"
              :key="item.id"
              class="text-center"
              :class="{ active: item.id == activeList.prices }"
              @click="selectType('prices', item.id)">
              {{ item.name }}
            </li>
          </ul>
          <ul class="typeList d-flex">
            <li
              v-for="item in allLabel.status"
              :key="item.id"
              class="text-center"
              :class="{ active: item.id == activeList.status }"
              @click="selectType('status', item.id)">
              {{ item.name }}
            </li>
          </ul>
        </van-collapse-item>
      </van-collapse>
      <!-- 结果 -->

      <div class="resultList">
        <ul class="d-flex flex-wrap">
          <li
            v-for="item in resultList"
            :key="item.season_id"
            @click="openContentView(item.season_id)">
            <img
              :src="item.vertical_cover + '@300w_300h.jpg'"
              alt=""
              class="w-100 mt-3" />
            <div class="fs-8 my-2">
              <van-text-ellipsis :content="item.title" />
            </div>
            <div class="fs-10 opacity-75 mb-3">{{ item.bottom_info }}</div>
          </li>
        </ul>
      </div>
      <!-- loading -->
      <div class="w-100 py-2 text-center">
        <van-loading v-if="loadFlag" />
      </div>
      <!-- 顶部返回 -->
      <back-component class="position-fixed"></back-component>
    </div>
  </div>
</template>

<style lang="scss">
  .allLabel {
    padding-top: 67.5px;
    li {
      width: 20%;
      &:last-child {
        margin-right: 78% !important;
      }
      &.active {
        color: red;
      }
    }
  }
  .van-collapse-item__title,
  .van-collapse-item__content {
    background-color: rgba(var(--bs-body-bg-rgb), 0.5);
  }
  .typeList {
    li {
      width: 20%;
    }
  }
  li.active {
    color: red;
  }

  .resultList {
    li {
      width: 30%;
      margin-left: 2.5%;
    }
  }
  .van-cell__title {
    span {
      font-size: 18px;
    }
  }
</style>

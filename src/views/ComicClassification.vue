<script setup lang="ts">
  import { ref, onMounted, toRef } from "vue";
  import { getAllLabel, getClassPage } from "../api/category";
  import BScroll from "better-scroll"; //导入Better scroll核心
  import ObserveDOM from "@better-scroll/observe-dom"; //ObserveDOM插件
  import Pullup from "@better-scroll/pull-up";
  import { useRouter } from "vue-router";
  import throttle from "lodash/throttle"; //Lodash节流

  //------------Better scroll实例化-----------
  let ComicClassification = ref();
  BScroll.use(Pullup);
  BScroll.use(ObserveDOM); // 自动重载插件
  let bs = ref();
  onMounted(() => {
    bs.value = new BScroll(ComicClassification.value, {
      click: true,
      observeDOM: true,
      pullUpLoad: true,
    });
    bs.value.on("pullingUp", handelFunction);
  });

  // -----------分类项--------------
  interface active {
    value: active | any;
    styles: number;
    areas: number;
    orders: number;
    prices: number;
    status: number;
  }
  let allLabel: any = ref([]);
  //请求参数
  let activeList: active = ref<active | any>({
    styles: -1,
    areas: -1,
    orders: -1,
    prices: -1,
    status: -1,
  });
  //------------获取分了项数据------------------
  interface allLabelData {
    data: object;
  }

  const getAllLabelFun = async () => {
    let data: allLabelData = (await getAllLabel()) as allLabelData;
    allLabel.value = data.data;
    console.log(data);

    for (const key in allLabel.value) {
      allLabel.value[key].unshift({ id: -1, name: "全部" });
    }
  };
  getAllLabelFun();

  // ------------------选择分类更换参数重新请求数据-----------------------
  const selectType = (name: string, id: number) => {
    activeList.value[name] = id;
    // 初始化
    loadFlag.value = true;
    pageNumber.value = 1;
    resultList.value = [];
    getClassPageFun();
  };

  // -------------- 获取分类后的漫画数据-------------------
  // 页数
  let pageNumber = ref(1);
  // 结果
  let resultList: any = ref([]);
  const getClassPageFun = async () => {
    let data: any = await getClassPage({
      styleId: activeList.value.styles,
      areaId: activeList.value.areas,
      isFinish: activeList.value.status,
      order: activeList.value.orders,
      isFree: activeList.value.prices,
      pageNum: pageNumber.value,
    });
    resultList.value = resultList.value.concat(data.data);
  };
  getClassPageFun();

  //----------------上啦加载更多----------------
  const findDataInnextPage = () => {
    pageNumber.value++;
    getClassPageFun();
  };
  let throttleFun = throttle(findDataInnextPage, 2000); //节流
  let handelFunction = () => {
    loadFlag.value = true;
    throttleFun();
    bs.value.finishPullUp();
    bs.value.refresh();
  };
  // loading 显示开关
  const loadFlag = ref(false);
  // 帅选框开关
  const activeNames = toRef(["0"]);
  //添加滚动事件
  onMounted(() => {
    bs.value.on("scrollStart", closeTyoeFun);
  });

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
          class="p-2 bg-body m-2"
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
          <ul class="typeList d-flex">
            <li
              v-for="item in allLabel.areas"
              :key="item.id"
              class="text-center py-3"
              :class="{ active: item.id == activeList.areas }"
              @click="selectType('areas', item.id)">
              {{ item.name }}
            </li>
          </ul>
          <ul class="typeList d-flex">
            <li
              v-for="item in allLabel.orders"
              :key="item.id"
              class="text-center py-3"
              :class="{ active: item.id == activeList.orders }"
              @click="selectType('orders', item.id)">
              {{ item.name }}
            </li>
          </ul>
          <ul class="typeList d-flex">
            <li
              v-for="item in allLabel.prices"
              :key="item.id"
              class="text-center py-3"
              :class="{ active: item.id == activeList.prices }"
              @click="selectType('prices', item.id)">
              {{ item.name }}
            </li>
          </ul>
          <ul class="typeList d-flex">
            <li
              v-for="item in allLabel.status"
              :key="item.id"
              class="text-center py-3"
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
  .van-collapse-item__title {
    background-color: #000;
    opacity: 0.8;
    color: #fff;
  }
  .van-collapse-item__content {
    background-color: #000;
    opacity: 0.6;
    color: #fff;
  }
  .typeList {
    li {
      width: 20%;
      border-radius: 100px;
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

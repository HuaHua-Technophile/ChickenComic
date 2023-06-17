<script setup lang="ts">
  import { ref, onMounted } from "vue";
  import comicItemComponent from "@/components/comicItemComponent.vue";
  import { getListRank, getRankInfo } from "@/api/ranking";
  import { type comicInfoCommonType } from "@/utils/typeing";
  import { register } from "swiper/element/bundle";

  interface listRankDataObjType {
    data?: {
      list: Array<{
        id: number;
        name: string;
      }>;
    };
  }

  interface rankInfoDataType {
    [activeIndex: number]: {
      data?: {
        list: Array<comicInfoCommonType>;
      };
    };
  }

  // -----------------注册swiper-------------------------
  register();
  // ------------------列表数据--------------------
  let listRankDataObj = ref<listRankDataObjType>({});
  //------------------排行榜详情数据-------------------
  let rankInfoData = ref<rankInfoDataType>({}); // 定义变量做数据缓存，方便根据属性名直接查找对应排行榜数组
  const saveArr = ref<Array<number>>([]); // 定义数组，元素中存放列表id做缓存标识
  const getListRankData = async () => {
    listRankDataObj.value = await getListRank();
    let empObj = await getRankInfo({
      id: `${listRankDataObj.value.data!.list[0].id!}`,
      offset: "0",
      subId: "0",
    });
    rankInfoData.value[activeIndex] = empObj;
    saveArr.value.push(listRankDataObj.value.data!.list[0].id);
    // swiper 配置项 (需要在数据获取完初始化配置项)
    const params1 = {
      // array with CSS styles
      pagination: {
        clickable: true,
        renderBullet: (index: number, className: string) => {
          return `<span class="${className}" style="color: rgb(232, 232, 232)">${listRankDataObj.value.data!.list[
            index
          ]?.name.slice(0, 2)}</span>`;
        },
      },
      // 初始化swiper样式
      injectStyles: [
        `.swiper-pagination-vertical.swiper-pagination-bullets{
          top: 0;
          left: 0;
          width: 90px;
          height: 100px;
          transform:none;
      }`,
        `.swiper-pagination-bullet {
          width: 90px;
          height: 50px;
          line-height: 50px;
          border-radius: 0;
          margin: 0 !important;
          background-color: transparent;
          opacity: 1;
      }`,
        `.swiper-pagination-bullet-active {
          background-color: rgba(255, 255, 255, .1);
      }`,
      ],
    };
    // 给swiper注入样式
    Object.assign(sw1.value, params1);
    sw1.value.initialize();
  };

  // --------------swiper实例化-----------------
  const sw1 = ref();
  const sw2 = ref();
  let empObj = null; // 存放getRankInfo接口的返回数据
  let activeIndex = 0; //存放当前slide索引
  onMounted(() => {
    // -------------------发起请求获取列表数据----------------------
    getListRankData();
    // 监听外层swiper的swiper slide是否改变
    sw1.value.addEventListener(
      "swiperBox-slidechange",
      async (event: {
        detail: Array<{
          activeIndex: number;
        }>;
      }) => {
        // swiper slide 改变后执行回调并发送当前排行的请求
        // rankInfoData.value = []; // 清空漫画列表数组，避免视觉上造成覆盖效果
        // console.log(event.detail[0].activeIndex);
        activeIndex = event.detail[0].activeIndex;
        // 判断saveArr中是否存在已缓存标识，不存在则发送请求
        if (
          !saveArr.value.includes(
            listRankDataObj.value.data!.list[event.detail[0].activeIndex].id
          )
        ) {
          empObj = await getRankInfo({
            id: `${
              listRankDataObj.value.data!.list[event.detail[0].activeIndex].id
            }`,
            offset: "0",
            subId: "0",
          });
          // 将每次请求的不同排行榜数据添加到rankInfoData对象中做缓存
          rankInfoData.value[activeIndex] = empObj;
          // 每次做完缓存都在saveArr中添加标识
          saveArr.value.push(
            listRankDataObj.value.data!.list[event.detail[0].activeIndex].id
          );
        }
        // 跳转到里层swiper的第一个slide
        sw2.value[event.detail[0].activeIndex].swiper.slideTo(0, 0);
      }
    );
  });
</script>

<template>
  <div class="RankingView w-100 h-100">
    <!-- 头部返回按钮 -->
    <back-component>
      <template #searchInput>
        <div class="fs-2 text-center">リーダーボード</div>
      </template>
    </back-component>
    <!-- 外层swiper -->
    <swiper-container
      events-prefix="swiperBox-"
      ref="sw1"
      class="mySwiper1 w-100 h-100 overflow-hidden position-relative"
      slides-per-view="auto"
      init="false"
      direction="vertical"
      pagination="true"
      history-key="slide">
      <!-- 每中排行的swiper slide -->
      <swiper-slide
        class="mySwiper-slide"
        :data-history="index"
        style="
          width: 100%;
          height: 100%;
          padding-left: 90px;
          padding-bottom: 60px;
        "
        v-for="(item, index) in listRankDataObj?.data?.list"
        :key="index">
        <!-- 里层swiper -->
        <swiper-container
          ref="sw2"
          class="mySwiper2 w-100 h-100 overflow-hidden position-relative"
          slides-per-view="auto"
          direction="vertical"
          free-mode="true">
          <!-- 每本漫画的 swiper slide -->
          <swiper-slide
            class="comicSlide d-flex mb-2"
            style="width: 100%; height: 140px"
            v-for="(it, idx) in rankInfoData[index]?.data?.list"
            :key="it.id">
            <span
              class="rankNum fs-2 d-flex align-items-center justify-content-center"
              style="width: 13%"
              >{{ idx + 1 }}</span
            >
            <!-- 导入漫画组件 -->
            <comicItemComponent
              :comicInfo="it"
              :img-width="97"></comicItemComponent>
          </swiper-slide>
        </swiper-container>
      </swiper-slide>
    </swiper-container>
  </div>
</template>
<style lang="scss">
  .RankingView img {
    margin-right: 10px !important;
  }
  
  .comicSlide {
    &:nth-child(1) {
      .rankNum {
        color: rgb(255, 23, 112);
        font-size: calc(1.325rem + 0.9vw + 0.6rem) !important;
        font-weight: 800;
      }
    }
    &:nth-child(2) {
      .rankNum {
        color: rgb(241, 132, 7);
        font-size: calc(1.325rem + 0.9vw + 0.4rem) !important;
        font-weight: 700;
      }
    }
    &:nth-child(3) {
      .rankNum {
        color: rgb(238, 185, 87);
        font-size: calc(1.325rem + 0.9vw + 0.2rem) !important;
        font-weight: 600;
      }
    }
  }
</style>

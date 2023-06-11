<script setup lang="ts">
  import { ref, onMounted } from "vue";
  import { useRouter } from "vue-router";
  import comicItemComponent from "@/components/comicItemComponent.vue";
  import { getListRank, getRankInfo } from "@/api/ranking";
  import { register } from "swiper/element/bundle";

  // 导入并使用useRouter
  const router = useRouter();

  // -----------------注册swiper-------------------------
  register();
  // ------------------列表数据--------------------
  let listRankDataObj: any = ref<object>({});
  //------------------排行榜详情数据-------------------
  let rankInfoData: any = ref<object>({});
  const getListRankData = async () => {
    listRankDataObj.value = await getListRank();
    rankInfoData.value = await getRankInfo({
      id: `${listRankDataObj.value.data.list[0].id}`,
      offset: "0",
      subId: "0",
    });
    console.log(rankInfoData.value);
    // swiper 配置项 (需要在数据获取完初始化配置项)
    const params1 = {
      // array with CSS styles
      pagination: {
        clickable: true,
        renderBullet: (index: number, className: string) => {
          return `<span class="${className}" style="color: rgb(232, 232, 232)">${listRankDataObj.value.data.list[
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
  const sw1: any = ref(null);
  onMounted(() => {
    // -------------------发起请求获取列表数据----------------------
    getListRankData();
    // 监听外层swiper的swiper slide是否改变
    sw1.value.addEventListener("swiperBox-slidechange", async (event: any) => {
      // swiper slide 改变后执行回调并发送当前排行的请求
      rankInfoData.value = []; // 清空漫画列表数组，避免视觉上造成覆盖效果
      rankInfoData.value = await getRankInfo({
        id: `${
          listRankDataObj.value.data.list[event.detail[0].activeIndex].id
        }`,
        offset: "0",
        subId: "0",
      });
    });
  });

  // 返回首页
  const toBack = (): void => {
    router.go(-1);
  };
</script>

<template>
  <div class="RankingView w-100 h-100">
    <!-- 头部返回按钮 -->
    <div class="ps-3 w-100 text-light t-shadow-3 d-flex align-items-center">
      <i class="bi bi-arrow-left-short" @click="toBack"></i>
      <div class="fs-2 flex-grow-1 text-center" style="padding-right: 30px">
        リーダーボード
      </div>
    </div>
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
          class="mySwiper2 w-100 h-100 overflow-hidden position-relative"
          slides-per-view="auto"
          direction="vertical"
          free-mode="true">
          <!-- 每本漫画的 swiper slide -->
          <swiper-slide
            class="comicSlide d-flex fs-1"
            style="width: 100%; height: 120px"
            v-for="(it, idx) in rankInfoData.data?.list"
            :key="it.id">
            <em
              class="rankNum text-end d-block"
              style="width: 15%; margin-right: 12px"
              >{{ idx + 1 }}</em
            >
            <!-- 导入漫画组件 -->
            <comicItemComponent
              :comicList="it"></comicItemComponent> </swiper-slide
        ></swiper-container>
      </swiper-slide>
    </swiper-container>
  </div>
</template>
<style lang="scss">
  img[lazy="loading"] {
    /*your style here*/
    opacity: 0;
  }
  img[lazy="error"] {
    /*your style here*/
    opacity: 1;
    transition: 0.6s;
  }
  img[lazy="loaded"] {
    /*your style here*/
    opacity: 1;
    transition: 0.6s;
  }

  .comicSlide {
    &:nth-child(1) {
      .rankNum {
        color: rgba(255, 0, 0);
        font-size: 45px;
        font-weight: 800;
      }
    }
    &:nth-child(2) {
      .rankNum {
        color: rgb(241, 132, 7);
        font-size: 40px;
        font-weight: 700;
      }
    }
    &:nth-child(3) {
      .rankNum {
        color: rgb(238, 185, 87);
        font-size: 35px;
        font-weight: 600;
      }
    }
  }
</style>

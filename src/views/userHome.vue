<script setup lang="ts">
  import BScroll from "better-scroll"; //导入Better scroll核心
  import Pullup from "@better-scroll/pull-up";
  import ObserveDOM from "@better-scroll/observe-dom";
  import NestedScroll from "@better-scroll/nested-scroll";
  import { register } from "swiper/element/bundle";
  import { ref, onMounted, nextTick, watch, onUpdated } from "vue";
  import { storeToRefs } from "pinia";
  import { useUserInfoStore } from "@/stores/userInfo";
  // -----------------用户信息---------------------
  const { userInfo } = storeToRefs(useUserInfoStore());
  console.log(userInfo.value);
  // 获取userHome对象
  let userHome: any = ref<object | null>(null);
  let bscroll2: any = ref<object | null>(null);
  // 实例化bscroll并注册插件
  BScroll.use(Pullup); // 注册上拉懒加载插件
  BScroll.use(ObserveDOM); // 自动重载插件
  BScroll.use(NestedScroll);
  let bs: any = ref<object>({});
  let bs2: any = ref<object>({});
  const bsMounted = () => {
    // 实例化bscroll并配置其配置项
    bs.value = new BScroll(userHome.value as HTMLElement, {
      click: true,
      nestedScroll: {
        groupId: "shared",
      },
    });
    bs2.value = new BScroll(bscroll2.value as HTMLElement, {
      click: true,
      nestedScroll: {
        groupId: "shared",
      },
    });
  };

  // -----------------注册swiper-------------------------
  register();
  const sw: any = ref<object | null>(null);
  const sw2: any = ref<object | null>(null);
  // 实例化bscroll并注册插件
  BScroll.use(Pullup); // 注册上拉懒加载插件
  BScroll.use(ObserveDOM); // 自动重载插件

  onMounted(() => {
    bsMounted();
    // 内层swiper的touchstart及touchend事件触发时对bscroll进行销毁与再次实例化，防止swiper滚动时触发bscroll的滚动
    nextTick(() => {
      // sw2.value.addEventListener("swiperBox-touchstart", () => {
      //   bs.value.destroy();
      // });
      // sw2.value.addEventListener("swiperBox-touchend", () => {
      //   console.log("slide end");
      //   bsMounted();
      // });
    });
  });
</script>
<template>
  <div class="userHome w-100 h-100" ref="userHome">
    <!-- 外部bscroll滚动区域 -->
    <div class="bsContent w-100" style="min-height: calc(100% + 1px)">
      <div class="userInfoArea position-relative" style="height: 30vh">
        <div
          class="info position-absolute start-50 translate-middle-x"
          style="bottom: 12%">
          <div
            class="userCover rounded-3 overflow-hidden"
            style="width: 100px; height: 100px">
            <img src="../img/logo.png" alt="" />
          </div>
          <div class="userName mt-3 text-center">一夜九次郎</div>
        </div>
      </div>
      <!-- 外层swiper -->
      <div class="btnArea d-flex justify-content-center">
        <div
          class="btnL text-center"
          style="width: 100px; height: 50px; line-height: 50px">
          コレクション
        </div>
        <div
          class="btnR text-center"
          style="width: 100px; height: 50px; line-height: 50px">
          レコード破り
        </div>
      </div>
      <swiper-container
        class="mySwiper1 w-100 overflow-hidden position-relative"
        style="height: 55vh; margin-top: 20px; padding-top: 5px"
        events-prefix="swiperFirstBox-"
        ref="sw">
        <swiper-slide style="height: 55vh">
          <!-- 内层swiper -->
          <!-- <swiper-container
            class="mySwiper2 w-100 h-100 overflow-hidden position-relative"
            events-prefix="swiperBox-"
            ref="sw2"
            slides-per-view="auto"
            direction="vertical"
            free-mode="true">
            <swiper-slide v-for="item in 100" :key="item" style="height: 120px">
              <div cl></div>
            </swiper-slide>
          </swiper-container> -->
          <!-- 里层bscroll -->
          <div class="bs2Box" style="height: 100%" ref="bscroll2">
            <div
              class="bscroll2 d-flex flex-wrap"
              style="min-height: calc(100% + 1px)">
              <div
                class="collectItem"
                v-for="(item, index) in userInfo?.collection"
                :key="index"
                style="width: 40%; height: 300px">
                <div class="imageItemBox" style="width: 100%">
                  <img
                    class="imageItem rounded-3"
                    style="
                      width: 100%;
                      box-shadow: 0px 0px 5px
                        rgba(var(--bs-body-color-rgb), 0.5);
                    "
                    v-lazy="item.vertical_cover + '@568w_319h'"
                    alt="" />
                </div>
                <div class="comicTitle text-truncate fs-5 pt-1">
                  {{ item.title }}
                </div>
                <!-- 更新或完结信息 -->
                <div class="finish fs-6 opacity-50">
                  {{ item.last_ord }}話に更新
                </div>
              </div>
            </div>
          </div>
        </swiper-slide>
        <swiper-slide style="height: 50vh">内容</swiper-slide>
      </swiper-container>
      <!-- 返回 -->
      <back-component class="position-fixed"></back-component>
    </div>
  </div>
</template>
<style lang="scss">
  .collectItem {
    &:nth-child(odd) {
      margin: 0 6.66666667%;
    }
  }

  img[lazy="loading"] {
    opacity: 0;
    width: 40% !important;
  }
  img[lazy="error"] {
    opacity: 1;
    transition: 0.6s;
  }
  img[lazy="loaded"] {
    opacity: 1;
    transition: 0.6s;
  }
</style>

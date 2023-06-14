<script setup lang="ts">
  import BScroll from "better-scroll"; //导入Better scroll核心
  import Pullup from "@better-scroll/pull-up";
  import ObserveDOM from "@better-scroll/observe-dom";
  import { register } from "swiper/element/bundle";
  import { ref, onMounted, nextTick, watch, onUpdated } from "vue";
  import { storeToRefs } from "pinia";
  import { useUserInfoStore } from "@/stores/userInfo";
  // -----------------用户信息---------------------
  const { userInfo } = storeToRefs(useUserInfoStore());
  console.log(userInfo.value);
  // 获取userHome对象
  let userHome: any = ref<object | null>(null);
  // 实例化bscroll并注册插件
  BScroll.use(Pullup); // 注册上拉懒加载插件
  BScroll.use(ObserveDOM); // 自动重载插件
  let bs: any = ref<object>({});
  const bsMounted = () => {
    // 实例化bscroll并配置其配置项
    bs.value = new BScroll(userHome.value as HTMLElement, {
      click: true,
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
      sw2.value.addEventListener("swiperBox-touchstart", () => {
        bs.value.destroy();
      });
      sw2.value.addEventListener("swiperBox-touchend", () => {
        console.log("slide end");
        bsMounted();
      });
    });
  });
</script>
<template>
  <div class="userHome w-100 h-100" ref="userHome">
    <!-- 外部bscroll滚动区域 -->
    <div class="bsContent w-100" style="min-height: calc(100% + 1px)">
      <div class="userInfoArea position-relative" style="height: 40vh">
        <div
          class="info position-absolute start-50 translate-middle-x"
          style="bottom: 15%">
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
        <div class="btnL">2</div>
        <div class="btnR">2</div>
      </div>
      <swiper-container
        class="mySwiper1 w-100 overflow-hidden position-relative"
        style="height: 60vh; padding-top: 55px"
        events-prefix="swiperFirstBox-"
        ref="sw">
        <swiper-slide style="height: 60vh">
          <!-- 内层swiper -->
          <swiper-container
            class="mySwiper2 w-100 h-100 overflow-hidden position-relative"
            events-prefix="swiperBox-"
            ref="sw2"
            slides-per-view="auto"
            direction="vertical"
            free-mode="true">
            <swiper-slide v-for="item in 100" :key="item" style="height: 120px">
              {{ item }}
            </swiper-slide>
          </swiper-container>
        </swiper-slide>
        <swiper-slide style="height: 50vh">内容</swiper-slide>
      </swiper-container>
      <!-- 返回 -->
      <back-component class="position-fixed"></back-component>
    </div>
  </div>
</template>
<style lang="scss">
  .van-tab__panel {
    min-height: calc(100% + 1px) !important;
  }
  .van-tabs__wrap {
    border-radius: 99999px;
    width: 80%;
    margin: auto;
  }
  .van-tabs__line {
    margin-bottom: calc(var(--jianXi) * 0.5);
  }
</style>

<script setup lang="ts">
  import BScroll from "better-scroll"; //导入Better scroll核心
  import Pullup from "@better-scroll/pull-up";
  import ObserveDOM from "@better-scroll/observe-dom";
  import NestedScroll from "@better-scroll/nested-scroll";
  import { register } from "swiper/element/bundle";
  import { ref, onMounted } from "vue";
  import { storeToRefs } from "pinia";
  import { useUserInfoStore } from "@/stores/userInfo";
  // -----------------用户信息---------------------
  const { userInfo } = storeToRefs(useUserInfoStore());
  console.log(userInfo.value);
  // 获取userHome对象
  let userHome = ref();
  let bscroll2 = ref();
  // 实例化bscroll并注册插件
  BScroll.use(Pullup); // 注册上拉懒加载插件
  BScroll.use(ObserveDOM); // 自动重载插件
  BScroll.use(NestedScroll);
  let bs = ref();
  let bs2 = ref();
  const bsMounted = () => {
    // 实例化bscroll并配置其配置项
    bs.value = new BScroll(userHome.value as HTMLElement, {
      click: true,
      observeDOM: true,
      nestedScroll: {
        groupId: 1,
      },
    });
    bs2.value = new BScroll(bscroll2.value as HTMLElement, {
      click: true,
      observeDOM: true,
      nestedScroll: {
        groupId: 1,
      },
    });
  };

  // -----------------注册swiper-------------------------
  register();
  const sw = ref();
  // 实例化bscroll并注册插件
  BScroll.use(Pullup); // 注册上拉懒加载插件
  BScroll.use(ObserveDOM); // 自动重载插件

  onMounted(() => {
    bsMounted();
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
            <img
              :src="`https://q.qlogo.cn/headimg_dl?dst_uin=${userInfo.id}&spec=3`"
              alt="" />
          </div>
          <div class="userName mt-3 text-center">{{ userInfo.name }}</div>
        </div>
      </div>
      <!-- 外层swiper -->
      <div class="btnArea d-flex justify-content-center">
        <div
          class="btnL text-center mx-2"
          style="width: 100px; height: 50px; line-height: 50px">
          コレクション
        </div>
        <div
          class="btnR text-center mx-2"
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
        <swiper-slide style="height: 50vh"> </swiper-slide>
      </swiper-container>
      <!-- 返回 -->
      <back-component class="position-fixed"></back-component>
    </div>
  </div>
</template>
<style lang="scss" scoped>
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

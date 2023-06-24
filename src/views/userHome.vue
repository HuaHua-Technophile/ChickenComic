<script setup lang="ts">
  import BScroll from "better-scroll"; //导入Better scroll核心
  import Pullup from "@better-scroll/pull-up";
  import ObserveDOM from "@better-scroll/observe-dom";
  import NestedScroll from "@better-scroll/nested-scroll";
  import { register } from "swiper/element/bundle";
  import { ref, onMounted, nextTick } from "vue";
  import { storeToRefs } from "pinia";
  import { useUserInfoStore } from "@/stores/userInfo";
  import { useRouter } from "vue-router";
  import { showToast } from "vant";
  import "vant/es/toast/style";
  const router = useRouter();

  // -----------------用户信息---------------------
  const { userInfo } = storeToRefs(useUserInfoStore());
  // 获取userHome对象
  let userHome = ref();
  let bscroll2 = ref();
  let bscroll3 = ref();
  // 实例化bscroll并注册插件
  BScroll.use(Pullup); // 注册上拉懒加载插件
  BScroll.use(ObserveDOM); // 自动重载插件
  BScroll.use(NestedScroll);
  let bs = ref();
  let bs2 = ref();
  let bs3 = ref();
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
    bs3.value = new BScroll(bscroll3.value as HTMLElement, {
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
  // ----------------监听swiper变化,改变上方分页器------------------
  let activeIndex = ref(0);
  onMounted(() => {
    bsMounted();
    // 监听swiper的slide改变移动tabs
    nextTick(() => {
      sw.value.addEventListener(
        "swiperFirstBox-slidechange",
        (event: {
          detail: Array<{
            activeIndex: number;
          }>;
        }) => {
          activeIndex.value = event.detail[0].activeIndex;
        }
      );
    });
  });
  //点击收藏跳转播放
  const toRead2 = (index: number, data: {}) => {
    let params = JSON.stringify({
      index,
      data: data,
    });
    router.push({ name: "content", state: { params } }); //注意：此处一定要用params
  };
  // 点击历史记录跳转播放
  const toRead = (res: { index: number; data: object }) => {
    let params = JSON.stringify({
      index: res.index,
      data: res.data,
    });
    router.push({ name: "content", state: { params } }); //注意：此处一定要用params
  };

  // 设置
  const showPopover = ref(false);
  const actions = [
    { text: "歴史を一掃します" },
    { text: "コレクションを一掃します" },
    { text: "ログアウトします" },
  ];
  const onselect = (action: { text: string }) => {
    if (action.text == "歴史を一掃します") {
      userInfo.value?.watchingHistory!.splice(
        0,
        userInfo.value?.watchingHistory!.length
      );
      showToast("除去成功です");
    } else if (action.text == "コレクションを一掃します") {
      userInfo.value?.collection!.splice(0, userInfo.value?.collection!.length);
      showToast("除去成功です");
    } else if (action.text == "ログアウトします") {
      localStorage.removeItem("userId");
      router.push("/");
      showToast("ログアウトしました");
    }
  };

  // 点击tabs改变slide
  const changeBtn = (activeIndex: number) => {
    sw.value.swiper.slideTo(activeIndex);
  };
</script>
<template>
  <div class="userHome w-100 h-100" ref="userHome">
    <!-- 外部bscroll滚动区域 -->
    <div
      class="bsContent w-100 d-flex flex-column"
      style="height: calc(100% + 1px)">
      <!-- 返回 -->
      <back-component class="flex-shrink-0">
        <template #searchInput>
          <div class="d-flex justify-content-end">
            <div class="setup d-inline-block">
              <van-popover
                v-model:show="showPopover"
                :actions="actions"
                placement="bottom-end"
                theme="dark"
                @select="onselect">
                <template #reference>
                  <i class="bi bi-x-octagon fs-4 me-3 mt-3 z-3"></i>
                </template>
              </van-popover>
            </div>
          </div>
        </template>
      </back-component>
      <!-- 用户头像+用户名 -->
      <div
        class="userInfoArea flex-shrink-0 d-flex align-items-center justify-content-center"
        style="height: 190px">
        <div class="info">
          <!-- 头像 -->
          <img
            class="rounded-3"
            style="width: 100px; height: 100px"
            :src="`https://q.qlogo.cn/headimg_dl?dst_uin=${userInfo?.id}&spec=3`" />
          <!-- 用户名 -->
          <div class="userName mt-3 text-center">{{ userInfo?.name }}</div>
        </div>
      </div>
      <!-- 外层swiper的分页器指示 -->
      <div
        class="flex-shrink-0 d-flex position-relative mx-auto rounded-pill"
        style="
          width: 330px;
          height: 45px;
          background: rgba(0, 0, 0, 0.3);
          color: rgb;
        ">
        <!-- 漫画收藏 -->
        <div
          class="px-2 w-50 d-flex align-items-center justify-content-center"
          :class="{ 'text-white': activeIndex == 0 }"
          style="width: 120px"
          @click="changeBtn(0)">
          コレクション
        </div>
        <!-- 阅读历史 -->
        <div
          class="px-2 w-50 d-flex align-items-center justify-content-center"
          :class="{ 'text-white': activeIndex == 1 }"
          style="width: 120px"
          @click="changeBtn(1)">
          レコード破り
        </div>
        <!-- 指示滑块 -->
        <div
          class="position-absolute z-n1 h-100 w-50 transition-4 p-2"
          :class="activeIndex == 0 ? 'start-0' : 'start-50'">
          <div class="w-100 h-100 rounded-pill bg-danger opacity-50"></div>
        </div>
      </div>
      <!-- 下方收藏/阅读历史的横滑swiper -->
      <swiper-container
        class="mySwiper1 flex-grow-1 w-100 mt-4 pt-1 position-relative"
        events-prefix="swiperFirstBox-"
        ref="sw">
        <swiper-slide>
          <!-- 里层bscroll -->
          <div class="bs2Box h-100 w-100">
            <div class="h-100 w-100" ref="bscroll2">
              <div
                class="w-100 bscroll2 d-flex flex-wrap"
                style="min-height: calc(100% + 1px)">
                <div
                  class="collectItem"
                  v-for="(item, index) in userInfo?.collection"
                  :key="index"
                  @click="toRead2(index, item)"
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
          </div>
        </swiper-slide>
        <swiper-slide>
          <div class="bs2Box2 h-100" ref="bscroll3">
            <ul style="min-height: calc(100% + 1px)">
              <li
                class="d-flex align-items-center mb-4"
                v-for="item in userInfo?.watchingHistory"
                :key="item.data.id"
                @click="toRead(item)"
                style="
                  background: linear-gradient(
                    transparent,
                    rgba(var(--bs-body-bg-rgb), 0.5) 20%,
                    rgba(var(--bs-body-bg-rgb), 0.5) 80%,
                    transparent
                  );
                ">
                <img
                  :src="item.data.horizontal_cover"
                  class="w-50 mx-2 rounded-3" />
                <div class="flex-grow-1 overflow-hidden">
                  <div class="text-truncate mb-2">
                    {{ item.data.title }}
                  </div>
                  <div class="opacity-50 fs-8">
                    {{ item.data.ep_list?.length - item.index }} /
                    {{ item.data.ep_list?.length }}を見ます
                  </div>
                </div>
                <i class="bi bi-chevron-right fs-2 me-2"></i>
              </li>
            </ul>
          </div>
        </swiper-slide>
      </swiper-container>
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

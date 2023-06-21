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

  import type { FormItemRule } from "@nutui/nutui/dist/types/__VUE/formitem/types";
  const router = useRouter();

  // -----------------用户信息---------------------
  const { userInfo } = storeToRefs(useUserInfoStore());
  // console.log(userInfo.value);
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

  let slidePag = ref();

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
          if (event.detail[0].activeIndex == 0) {
            slidePag.value.style.left = "0%";
          } else {
            slidePag.value.style.left = "50%";
          }
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
  const toRead = (
    data: {
      title: string;
      horizontal_cover: string;
    },
    index: number
  ) => {
    let params = JSON.stringify({
      index,
      data: data,
    });
    router.push({ name: "content", state: { params } }); //注意：此处一定要用params
  };

  // 设置
  const showPopover = ref(false);
  const actions = [
    { text: "清除历史" },
    { text: "清除收藏" },
    { text: "退出登录" },
  ];
  const onselect = (action: { text: string }) => {
    if (action.text == "清除历史") {
      userInfo.value?.watchingHistory!.splice(
        0,
        userInfo.value?.watchingHistory!.length
      );
      showToast("清楚成功");
    } else if (action.text == "清除收藏") {
      userInfo.value?.collection!.splice(0, userInfo.value?.collection!.length);
      showToast("清楚成功");
    } else if (action.text == "退出登录") {
      // localStorage.clear();
      // userInfo.value = {};

      localStorage.removeItem("userId");
      router.push("/");

      showToast("推出成功");
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
    <div class="bsContent w-100" style="min-height: calc(100% + 1px)">
      <div class="userInfoArea position-relative" style="height: 30vh">
        <div
          class="info position-absolute start-50 translate-middle-x"
          style="bottom: 12%">
          <div
            class="userCover rounded-3 overflow-hidden"
            style="width: 100px; height: 100px">
            <img
              :src="`https://q.qlogo.cn/headimg_dl?dst_uin=${userInfo?.id}&spec=3`"
              alt="" />
          </div>
          <div class="userName mt-3 text-center">{{ userInfo?.name }}</div>
        </div>
      </div>
      <!-- 外层swiper -->
      <div class="btnArea d-flex justify-content-center">
        <div
          class="d-flex justify-content-center position-relative"
          style="width: 240px">
          <div
            class="btnL text-center px-2"
            style="width: 120px; height: 50px; line-height: 50px"
            @click="changeBtn(0)">
            コレクション
          </div>
          <div
            class="btnR text-center px-2"
            style="width: 120px; height: 50px; line-height: 50px"
            @click="changeBtn(1)">
            レコード破り
          </div>
          <span
            class="d-inline-flex px-2 position-absolute rounded-pill"
            ref="slidePag"
            style="
              width: 120px;
              height: 50px;
              background-color: rgba(0, 0, 0, 0.2);
              left: 0%;
              transition: 0.4s;
            "></span>
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
        </swiper-slide>
        <swiper-slide style="height: 50vh">
          <div class="bs2Box2" style="height: 100%" ref="bscroll3">
            <ul style="min-height: calc(100% + 1px)">
              <li
                class="d-flex align-items-center bg-body bg-opacity-75 my-2 overflow-hidden"
                v-for="item in userInfo?.watchingHistory"
                :key="item.id"
                @click="toRead(item.historyComicList, item.historyIndex)">
                <img
                  :src="item.historyComicList.horizontal_cover"
                  alt=""
                  class="w-50 px-2" />
                <div>
                  <div class="fs-6 van-text-ellipsis">
                    {{ item.historyComicList.title }}
                  </div>
                  <div class="opacity-75 fs-8">
                    看到第{{ item.HistoryListLength - item.historyIndex }} 话 /
                    {{ item.HistoryListLength }}话
                  </div>
                </div>
                <i class="bi bi-chevron-right fs-2 flex-grow-1 text-center"></i>
              </li>
            </ul>
          </div>
        </swiper-slide>
      </swiper-container>
      <!-- 返回 -->
      <back-component class="position-fixed">
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

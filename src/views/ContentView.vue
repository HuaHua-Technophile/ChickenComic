<script setup lang="ts">
  import BScroll, { type Options } from "better-scroll"; //导入Better scroll核心
  import Pullup from "@better-scroll/pull-up";
  import Zoom from "@better-scroll/zoom";
  import ObserveImage from "@better-scroll/observe-image";
  import NestedScroll from "@better-scroll/nested-scroll";
  import debounce from "lodash/debounce"; //lodash防抖
  import { showToast } from "vant";
  import "vant/es/toast/style";
  import {
    onBeforeUnmount,
    onMounted,
    ref,
    toRefs,
    nextTick,
    onUpdated,
    watchEffect,
  } from "vue";
  import { useRouter } from "vue-router";
  import { storeToRefs } from "pinia";
  import { useUserInfoStore } from "@/stores/userInfo";
  import { useNowListStore } from "@/stores/nowList";
  import { getImageIndex, getImageToken } from "@/api/content";
  import chapterComponent from "@/components/chapterComponent.vue"; //引入组件
  import { type imgIndexUrl } from "@/utils/typeing";

  interface imgUrlTokenAllType {
    epId?: number;
    item?: { url: string; token: string };
  }

  const router = useRouter();

  // 接收路由信息（包含当前漫画index和所有章节信息）
  let etid_data = JSON.parse(history.state.params);
  let { index, data } = toRefs(etid_data);
  let nowEp = ref(data.value.ep_list[index.value]);
  let chapterListIndex = index.value;

  // 获取漫画章节内容图片&索引
  let oldImgEpList = ref<Array<{ id: number }>>(
    data.value.ep_list.slice(0, data.value.ep_list.length)
  ); // copy一份旧章节数据
  let imgEpList = ref<Array<{ id: number }>>([]); // 章节id数组集合
  let imgIndexUrl = ref<imgIndexUrl>(); // 漫画章节内容图片&索引 api数据
  let imgBaseUrl = ref("https://manga.hdslb.com"); // 漫画章节内容图片拼接地址
  let imgUrlArr = ref<Array<string>>([]); // 漫画章节内容图片数据(整合为数组)
  let imgUrlToken = ref(); // 漫画章节内容图片Token api数据
  let imgUrlTokenAll = ref<Array<imgUrlTokenAllType>>([]); // 漫画所有章节内容图片Token api数据
  const getContentData = async (epId: number) => {
    imgIndexUrl.value = (await getImageIndex({ epId: epId })) as imgIndexUrl; // 请求漫画章节内容图片&索引数据
    // imgBaseUrl.value = imgIndexUrl.value.data.host;
    // 根据图片基地址 图片url 图片格式 拼接为图片token接口的请求参数
    imgUrlArr.value = imgIndexUrl.value!.data.images.map(
      (value) => `${imgBaseUrl.value + value.path}@660w.webp`
    );
    // 批量请求token
    imgUrlToken.value = await getImageToken({
      urls: JSON.stringify(imgUrlArr.value),
    }); // 请求漫画章节内容图片token数据
    imgUrlToken.value.data.forEach((item: { url: string; token: string }) => {
      imgUrlTokenAll.value.push({ item, epId });
    });
  };

  // 初始化章节内容及计数
  let epListindex = 0; // 章节计数
  const getComicEpList = () => {
    imgEpList.value = data.value.ep_list;
    imgEpList.value.reverse();
    // 调用getContentData方法获取章节数据并对数据做处理
    getContentData(nowEp.value.id);
    epListindex = imgEpList.value.findIndex((item) => {
      return item.id == nowEp.value.id;
    });
  };

  getComicEpList(); // 进入内容页调用初始化方法

  // 实例化bscroll并给阅读页添加滚动处理
  BScroll.use(Pullup); // 注册上拉懒加载插件
  BScroll.use(ObserveImage); // 自动重载插件
  BScroll.use(Zoom); // 注册缩放插件
  BScroll.use(NestedScroll); // 注册嵌套bscroll插件
  let zoomOption: boolean | Options = false; // Zoom插件配置项（false为不启用缩放）
  let bs = ref();
  let bs2 = ref();
  let contentVeiw = ref<object>({});
  let isPullUpLoad = ref<boolean>(false);
  // 上拉加载调用此函数，发送下一章请求
  let endList = ref("上拉进入下一章");
  const pullingUpHandler = debounce(async function () {
    isPullUpLoad.value = true;
    if (
      epListindex < imgEpList.value.length &&
      imgEpList.value[epListindex + 1]
    ) {
      epListindex++;
      chapterListIndex--;
      await getContentData(imgEpList.value[epListindex].id); // 上拉加载请求下一章数据
    } else {
      endList.value = "END";
      clearInterval(autoTimer);
    }
    bs.value.finishPullUp();
    isPullUpLoad.value = false;
  }, 1000);

  let timer: number | undefined = undefined;
  // 封装实例化bscroll及其配置项函数
  const bsMounted = () => {
    // 实例化bscroll并配置其配置项
    bs.value = new BScroll(
      contentVeiw.value as HTMLElement,
      {
        click: true,
        pullUpLoad: true,
        // 开启 observe-image 插件
        observeImage: {
          debounceTime: 500,
        },
        freeScroll: true,
        scrollX: true,
        scrollY: true,
        zoom: zoomOption,
        nestedScroll: {
          groupId: 2,
        },
      } as Options
    );
    // 监听上拉事件，执行相应回调函数
    bs.value.on("pullingUp", () => {
      pullingUpHandler();
    });
    bs.value.on("scrollStart", () => {
      showBottom.value = false;
      isShowSlider.value = false;
    });
  };
  onMounted(() => {
    bsMounted();
  });

  // 判断当前阅读的章节
  let boxes = null;
  onUpdated(() => {
    boxes = document.querySelectorAll(".imgItem");
    boxes.forEach((box) => {
      observer.observe(box);
    });
  });
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, index) => {
        chapterListIndex = oldImgEpList.value.findIndex((item) => {
          return String(item.id) == entry.target.getAttribute("dataIndex");
        });
      });
    },
    {
      threshold: [1],
    }
  );
  onBeforeUnmount(() => {
    // 清除延时器
    clearInterval(timer);
  });

  // 操作面板显示与隐藏
  let showBottom = ref<object | boolean>(false); // 操作面板
  let isShowSlider = ref<object | boolean>(false); // 亮度调节
  let speedSelectShow = ref<object | boolean>(false); // 自动播放速度调节
  const showPopup = () => {
    showBottom.value = !showBottom.value;
    if (!showBottom.value) {
      isShowSlider.value = false;
      speedSelectShow.value = false;
    }
  };
  const showSlider = () => {
    isShowSlider.value = !isShowSlider.value;
  };
  // 控制滑块调节亮度
  const value = ref<number>(0);
  let mask = ref();
  const onChange = (value: { style: object }) => {
    mask.value!.style.backgroundColor = `rgba(0, 0, 0, ${-value / 100})`;
  };

  // 根据点击区域触发不同效果
  let contentVeiwHeight = document.body.offsetHeight;
  const upScroll = () => {
    showBottom.value = false;
    isShowSlider.value = false;
    speedSelectShow.value = false;
    if (bs.value.y < -(contentVeiwHeight / 2)) {
      bs.value.scrollBy(0, contentVeiwHeight, 500);
    }
  };
  const downScroll = () => {
    showBottom.value = false;
    isShowSlider.value = false;
    speedSelectShow.value = false;
    bs.value.scrollBy(0, -contentVeiwHeight, 500);
  };

  let { userInfo, Logged } = storeToRefs(useUserInfoStore());
  let isCollection = ref<boolean | undefined>(false);
  watchEffect(() => {
    isCollection.value = userInfo?.value?.collection.some(
      (i) => i.id == data.value.id
    );
  });
  let collect = () => {
    if (Logged && Logged.value) {
      if (isCollection.value) {
        let index = userInfo?.value?.collection.findIndex(
          (i) => i.id == data.value.id
        );
        userInfo?.value?.collection.splice(index as number, 1);
        showToast("好きを取り消す");
      } else {
        userInfo.value?.collection.push(data.value);
        showToast("コレクション成功です");
      }
    } else {
      showToast("未登録です");
      router.push({ name: "login" });
    }
  };
  // 自动播放
  let autoPlayShow = ref(false);
  let autoTimer: number | undefined = undefined;
  const autoTimeSelect = () => {
    speedSelectShow.value = !speedSelectShow.value;
  };

  // 根据选择的播放速度调用函数
  const autoScroll = (speed: number) => {
    speedSelectShow.value = false;
    isShowSlider.value = false;
    autoPlayShow.value = true;
    showToast("オートオープン");
    autoTimer = setInterval(() => {
      if (bs.value.y <= bs.value.maxScrollY) {
        // clearInterval(autoTimer);
        pullingUpHandler();
      }
      downScroll();
    }, speed);
  };

  // 停止自动播放
  const stopAutoScroll = () => {
    autoPlayShow.value = false;
    clearInterval(autoTimer);
  };

  // 开启与关闭缩放功能
  let isScale = ref(false);
  let scaleTip = "ズーム機能が無効になっています";
  const scaleOpen = () => {
    isScale.value = !isScale.value;
    // 手动开启与关闭缩放功能
    zoomOption =
      isScale.value === true
        ? {
            start: 1,
            min: 1,
            max: 2,
            initialOrigin: ["center", "center"],
            minimalZoomDistance: 3,
            bounceTime: 800, // ms
          }
        : false;
    scaleTip =
      isScale.value === true
        ? "ズーム機能が有効"
        : "ズーム機能が無効になっています";
    showToast(scaleTip);
  };

  // 章节列表
  let showListBottom: { value: boolean } = ref(false);
  const showListPopup = () => {
    showListBottom.value = true;
    showPopup();
    // bs.value.destroy();
    nextTick(() => {
      bs2.value = new BScroll(".chapter-warrper", {
        click: true,
        // 开启 observe-image 插件
        observeImage: {
          debounceTime: 500,
        },
        nestedScroll: {
          groupId: 2,
        },
      });
    });
  };
  // 隐藏章节列表
  const enShowListBottom = () => {
    // bsMounted();
    showListBottom.value = false;
  };

  //子组件点击传出方法,阅读不同章节
  let newIndex = 0;
  const readThisChapter = async (index: number) => {
    imgUrlTokenAll.value = [];
    newIndex = imgEpList.value.findIndex((item) => {
      return item.id == oldImgEpList.value[index].id;
    });
    chapterListIndex = index;
    await getContentData(imgEpList.value[newIndex].id);
    epListindex = newIndex;
  };

  // 当前在看漫画章节
  let { nowComicList, nowIndex, nowListLength } = storeToRefs(
    useNowListStore()
  );
  const comicListSave = () => {
    etid_data.index = chapterListIndex;
    nowComicList.value = etid_data;
  };

  // 返回上一页
  const toBack = () => {
    comicListSave();
    router.go(-1);
  };

  // ------------退出时存储历史记录数据----------------

  onBeforeUnmount(() => {
    let userId = localStorage.getItem("userId");
    if (userId) {
      let newHistory = {
        historyComicList: nowComicList.value,
        historyIndex: nowIndex.value,
        HistoryListLength: nowListLength.value,
      };
      if (!localStorage.getItem(`user${userId}`)) {
        localStorage.setItem(`user${userId}`, JSON.stringify([]));
        let nowHistoryLocalStorage = localStorage.getItem(
          `user${userId}`
        ) as string;

        console.log(JSON.parse(nowHistoryLocalStorage));

        // localStorage.setItem(`user${userId}`, JSON.stringify(newHistory));
      }
    }
  });
</script>

<template>
  <div class="contentView w-100 h-100" ref="contentVeiw">
    <!-- 滚动内容 -->
    <div class="contentClient w-100">
      <!-- 每一页内容 -->
      <div
        class="imgItem w-100"
        :dataIndex="item.epId"
        v-for="(item, index) in imgUrlTokenAll"
        :key="index">
        <img
          v-lazy="item.item?.url + '?token=' + item.item?.token"
          class="w-100" />
      </div>
      <!-- 上拉提示 -->
      <div class="pullup-tips text-center">
        <div v-if="!isPullUpLoad" class="before-trigger">
          <span class="pullup-txt">{{ endList }}</span>
        </div>
        <div v-else class="after-trigger">
          <span class="pullup-txt">Loading...</span>
        </div>
      </div>
    </div>
    <!-- 头部返回按钮 -->
    <transition name="fadeIn">
      <div
        class="contentHead position-fixed top-0 w-100 z-3"
        style="
          background: linear-gradient(
            rgba(0, 0, 0, 0.75),
            transparent 87%,
            transparent
          );
        "
        v-show="showBottom">
        <div
          class="ps-3 pe-3 d-flex justify-content-between align-items-center text-light t-shadow-3"
          v-show="isShowSlider">
          <div class="leftIcon d-flex align-items-center">
            <i class="bi bi-arrow-left-short" @click="toBack"></i>
            <span class="epListTitle fs-3"
              >第{{ oldImgEpList.length - chapterListIndex }}話</span
            >
          </div>
          <div
            class="rightIcon fs-3 d-flex justify-content-between align-items-center"
            style="width: 30%">
            <i
              class="bi text-danger fs-3"
              :class="isCollection ? 'bi-heart-fill' : 'bi-heart'"
              style="text-shadow: 1.5px 1.5px 3px rgba(0, 0, 0, 0.5)"
              @click="collect"></i>
            <i class="bi bi-share"></i>
            <i
              class="iconfont icon-fangdajing1 fs-2 scaleIcon"
              style="height: 50%"
              v-show="isScale"
              @click="scaleOpen"></i>
            <i
              class="iconfont icon-fangdajing1 fs-2 noScaleIcon position-relative"
              v-show="!isScale"
              @click="scaleOpen"></i>
          </div>
        </div>
      </div>
    </transition>
    <!-- 章节列表 -->
    <transition name="fadeIn">
      <!-- 蒙版区 -->
      <div
        class="w-100 z-9 position-absolute top-0 bg-dark bg-opacity-75"
        style="height: calc(100vh + 1px)"
        v-if="showListBottom"
        @click="enShowListBottom">
        <!-- 列表区 -->
        <div
          class="h-50 ms-3 me-3 position-absolute bg-dark blur-5 bg-opacity-75 rounded-4 Z-10"
          style="bottom: 2%">
          <chapterComponent
            :detailList="imgEpList"
            :maxHeight="'50vh'"
            :selectIndex="chapterListIndex"
            class="ms-3 me-3"
            @readThisChapter="readThisChapter"></chapterComponent>
        </div>
      </div>
    </transition>
    <!-- 底栏 -->
    <transition name="contract">
      <div
        class="popup position-absolute start-0 end-0 bottom-0 mx-auto mb-3 z-3 overflow-x-hidden text-nowrap"
        style="width: calc(12rem)"
        v-show="showBottom">
        <!-- 亮度调节 -->
        <transition name="sideUp">
          <div
            class="slider mb-2 mx-auto rounded-pill shadow"
            style="width: calc(100% - 1.5rem)"
            v-show="isShowSlider">
            <van-slider
              v-model="value"
              bar-height="2.5vh"
              :min="-75"
              :max="0"
              inactive-color="rgba(0, 0, 0, .2)"
              active-color="#e8e8e8"
              @update:model-value="onChange">
              <template #button>
                <div
                  class="custom-button"
                  style="width: 3vw; height: 3vh"></div>
              </template>
            </van-slider>
          </div>
        </transition>
        <!-- 自动播放秒数设定 -->
        <transition name="sideUp">
          <div class="speedSelectBox mb-2 mx-auto" v-show="speedSelectShow">
            <div
              class="speedSelect mb-2 mx-auto d-flex justify-content-evenly bg-dark rounded-5 blur-5 bg-opacity-75"
              style="width: calc(100% - 1.5rem)">
              <div class="fiveSc" @click="autoScroll(5000)">5s</div>
              <div class="tenSc" @click="autoScroll(10000)">10s</div>
              <div class="fifSc" @click="autoScroll(15000)">15s</div>
            </div>
          </div>
        </transition>
        <!-- 自动播放 -->
        <div
          class="slider fs-3 d-flex justify-content-evenly align-items-center bg-dark rounded-5 blur-5 bg-opacity-75">
          <i class="bi bi-brightness-high" @click="showSlider"></i>
          <i class="bi bi-list" @click="showListPopup"></i>
          <i
            class="bi bi-play-circle"
            v-show="!autoPlayShow"
            @click="autoTimeSelect"></i>
          <i
            class="bi bi-pause-circle"
            v-show="autoPlayShow"
            @click="stopAutoScroll"></i>
        </div>
      </div>
    </transition>
    <!-- 阴影蒙版 -->
    <div
      class="mask position-absolute top-0"
      style="width: 100vw; height: 101%; pointer-events: none"
      ref="mask"></div>
    <!-- 点击判断 -->
    <div
      class="w-100 h-100 position-absolute z-1 top-0 d-flex flex-column"
      @touchstart="stopAutoScroll">
      <div class="headClickArea w-100 flex-grow-1" @click="upScroll"></div>
      <div class="middleClickArea w-100 flex-grow-1" @click="showPopup"></div>
      <div class="footClickArea w-100 flex-grow-1" @click="downScroll"></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  img[lazy="loading"] {
    opacity: 0;
  }
  img[lazy="error"] {
    opacity: 1;
    transition: 0.6s;
  }
  img[lazy="loaded"] {
    opacity: 1;
    transition: 0.6s;
  }
  .contract-enter-active,
  .contract-leave-active {
    transition: all 0.8s cubic-bezier(0.68, -0.55, 0.27, 1.55);
  }
  .contract-enter-from,
  .contract-leave-to {
    width: 0px !important;
  }
  .scaleIcon {
    position: relative;
    font-weight: 600;
  }
  .noScaleIcon {
    font-weight: 600;
    &::after {
      content: "";
      width: 26px;
      height: 2px;
      background-color: rgb(254, 254, 254);
      position: absolute;
      top: 40%;
      left: -9%;
      transform: rotate(-45deg) translateY(-50%);
    }
  }
  .van-overlay {
    height: calc(100% + 1px);
  }
</style>

<script setup lang="ts">
  import BScroll from "better-scroll"; //导入Better scroll核心
  import Pullup from "@better-scroll/pull-up";
  import Zoom from "@better-scroll/zoom";
  import ObserveImage from "@better-scroll/observe-image";
  import { onBeforeUnmount, onMounted, ref } from "vue";
  import { getImageIndex, getImageToken } from "@/api/content";
  import { getComicDetail } from "@/api/comicCover";
  import { useRouter } from "vue-router";

  const etid_data = history.state.params;
  console.log(etid_data);

  if (etid_data != undefined) {
    const value = JSON.parse(etid_data);
    const { index, chapterList } = value;
    console.log(index, chapterList);
  }
  // 定义router
  const router = useRouter();

  // 获取漫画章节内容图片&索引
  let comicDetail: any = ref<object>({}); // 漫画详情数据
  let imgEpList: any = ref<Array<number>>([]); // 章节id数组集合
  let imgIndexUrl: any = ref<object>({}); // 漫画章节内容图片&索引 api数据
  let imgBaseUrl: any = ref<string>("https://manga.hdslb.com"); // 漫画章节内容图片拼接地址
  let imgUrlArr: any = ref<Array<object>>([]); // 漫画章节内容图片数据(整合为数组)
  let imgUrlToken: any = ref<Array<object>>([]); // 漫画章节内容图片Token api数据
  let imgUrlTokenAll: any = ref<Array<object>>([]); // 漫画所有章节内容图片Token api数据
  const getContentData = async (epId: number) => {
    imgIndexUrl.value = await getImageIndex({ epId: epId }); // 请求漫画章节内容图片&索引数据
    // imgBaseUrl.value = imgIndexUrl.value.data.host;
    // 根据图片基地址 图片url 图片格式 拼接为图片token接口的请求参数
    imgUrlArr.value = imgIndexUrl.value.data.images.map(
      (item: { path: string }) => {
        return `${imgBaseUrl.value + item.path}@660w.webp`;
      }
    );
    // 批量请求token
    imgUrlToken.value = await getImageToken({
      urls: JSON.stringify(imgUrlArr.value),
    }); // 请求漫画章节内容图片token数据
    imgUrlToken.value.data.forEach((item: object) => {
      imgUrlTokenAll.value.push(item);
    });
    console.log(imgUrlToken.value);
  };

  const getComicEpList = async () => {
    comicDetail.value = await getComicDetail("25900");
    imgEpList.value = comicDetail.value.data.ep_list;
    imgEpList.value.reverse();
    // 调用getContentData方法获取章节数据并对数据做处理
    getContentData(imgEpList.value[0].id);
  };

  getComicEpList(); // 请求所有章节数据并做处理

  // 实例化bscroll并给阅读页添加滚动处理
  BScroll.use(Pullup); // 注册上拉懒加载插件
  BScroll.use(ObserveImage);
  BScroll.use(Zoom); // 注册缩放插件
  let bs: any = ref<object>({});
  let contentVeiw: any = ref<object>({});
  let isPullUpLoad: any = ref<boolean>(false);
  // 上拉加载调用此函数，发送下一章请求
  let epListindex: { value: number } = ref<number>(1); // 章节计数
  const pullingUpHandler = async () => {
    isPullUpLoad.value = true;
    await getContentData(imgEpList.value[epListindex.value].id); // 上拉加载请求下一章数据
    epListindex.value++;
    bs.value.finishPullUp();
    isPullUpLoad.value = false;
  };

  let timer: any = null;
  onMounted(() => {
    // 实例化bscroll并配置其配置项
    bs.value = new BScroll(contentVeiw.value as HTMLElement, {
      click: true,
      pullUpLoad: {
        threshold: 0,
      },
      // 开启 observe-image 插件
      observeImage: {
        debounceTime: 500,
      },
      freeScroll: true,
      scrollX: true,
      scrollY: true,
      zoom: {
        start: 1,
        min: 1,
        max: 2,
        initialOrigin: ["center", "center"],
        minimalZoomDistance: 3,
        bounceTime: 800, // ms
      },
    });
    // 监听上拉事件，执行相应回调函数
    bs.value.on("pullingUp", pullingUpHandler);
    bs.value.on("scrollStart", () => {
      showBottom.value = false;
      isShowSlider.value = false;
    });
  });

  onBeforeUnmount(() => {
    // 清除延时器
    clearInterval(timer);
  });

  // 操作面板显示与隐藏
  let showBottom: any = ref<object | boolean>(false);
  let isShowSlider: any = ref<object | boolean>(false);
  const showPopup = () => {
    showBottom.value = !showBottom.value;
    if (!showBottom.value) {
      isShowSlider.value = false;
    }
  };
  const showSlider = () => {
    isShowSlider.value = !isShowSlider.value;
  };
  // 控制滑块调节亮度
  const value = ref<number>(0);
  let mask: any = ref<object | null>(null);
  const onChange = (value: any) => {
    mask.value.style.backgroundColor = `rgba(0, 0, 0, ${-value / 100})`;
  };

  // 根据点击区域触发不同效果
  let contentVeiwHeight = document.body.offsetHeight;
  const upScroll = () => {
    showBottom.value = false;
    if (bs.value.y < -(contentVeiwHeight / 2)) {
      console.log(bs.value.y);
      bs.value.scrollBy(0, contentVeiwHeight, 500);
    }
  };
  const downScroll = () => {
    showBottom.value = false;
    bs.value.scrollBy(0, -contentVeiwHeight, 500);
  };

  // 返回上一页
  const toBack = () => {
    router.go(-1);
  };

  // 收藏漫画
  let isLike = ref(false);
  const likeIt = () => {
    isLike.value = !isLike.value;
  };
</script>

<template>
  <div class="contentView w-100 h-100" ref="contentVeiw">
    <!-- 滚动内容 -->
    <div class="w-100">
      <!-- 每一页内容 -->
      <div
        class="imgItem w-100"
        v-for="(item, index) in imgUrlTokenAll"
        :key="index">
        <img v-lazy="item.url + '?token=' + item.token" class="w-100" />
      </div>
      <!-- 上拉提示 -->
      <div class="pullup-tips text-center">
        <div v-if="!isPullUpLoad" class="before-trigger">
          <span class="pullup-txt">上拉进入下一章</span>
        </div>
        <div v-else class="after-trigger">
          <span class="pullup-txt">Loading...</span>
        </div>
      </div>
    </div>

    <!-- 头部 -->
    <!-- 头部返回按钮 -->
    <transition name="fadeIn">
      <div
        class="contentHead position-fixed top-0 w-100 z-3"
        style="
          background-image: linear-gradient(
            rgba(0, 0, 0, 0.75),
            transparent 87%,
            transparent
          );
        "
        v-show="showBottom">
        <div
          class="ps-3 pe-3 d-flex justify-content-between align-items-center text-light t-shadow-3"
          v-show="isShowSlider">
          <i class="bi bi-arrow-left-short" @click="toBack"></i>
          <div
            class="rightIcon fs-3 d-flex justify-content-between align-items-center"
            style="width: 30%">
            <i class="bi bi-heart" v-show="!isLike" @click="likeIt"></i>
            <i
              class="bi bi-heart-fill text-danger"
              v-show="isLike"
              @click="likeIt"></i>
            <i class="bi bi-share"></i>
            <i class="iconfont icon-fangdajing fs-3"></i>
          </div>
        </div>
      </div>
    </transition>
    <!-- 底栏 -->
    <transition name="contract">
      <div
        class="popup position-absolute start-0 end-0 bottom-0 mx-auto mb-3 z-3 overflow-x-hidden text-nowrap"
        style="width: calc(12rem)"
        v-show="showBottom">
        <transition name="sideUp">
          <div
            class="slider mb-2 mx-auto"
            style="width: calc(100% - 1.5rem)"
            v-show="isShowSlider">
            <van-slider
              v-model="value"
              bar-height="2.5vh"
              :min="-75"
              :max="0"
              inactive-color="rgba(0, 0, 0, .2)"
              active-color="#fff"
              @update:model-value="onChange">
              <template #button>
                <div
                  class="custom-button"
                  style="width: 3vw; height: 3vh"></div>
              </template>
            </van-slider>
          </div>
        </transition>
        <div
          class="slider fs-3 d-flex justify-content-evenly align-items-center bg-dark rounded-5 blur-5 bg-opacity-75">
          <i class="bi bi-brightness-high" @click="showSlider"></i>
          <i class="bi bi-list"></i>
          <i class="bi bi-play-circle"></i>
        </div>
      </div>
    </transition>
    <!-- 阴影蒙版 -->
    <div
      class="mask position-absolute top-0"
      style="width: 100vw; height: 101%; pointer-events: none"
      ref="mask"></div>
    <!-- 点击判断 -->
    <div class="w-100 h-100 position-absolute z-1 top-0 d-flex flex-column">
      <div class="headClickArea w-100 flex-grow-1" @click="upScroll"></div>
      <div class="middleClickArea w-100 flex-grow-1" @click="showPopup"></div>
      <div class="footClickArea w-100 flex-grow-1" @click="downScroll"></div>
    </div>
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

  .contract-enter-active,
  .contract-leave-active {
    transition: all 0.8s cubic-bezier(0.68, -0.55, 0.27, 1.55);
  }

  .contract-enter-from,
  .contract-leave-to {
    width: 0px !important;
  }
</style>

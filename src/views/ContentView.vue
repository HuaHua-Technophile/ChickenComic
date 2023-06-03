<script setup lang="ts">
  import BScroll from "better-scroll"; //导入Better scroll核心
  import Pullup from "@better-scroll/pull-up";
  import { nextTick, onBeforeUnmount, onMounted, ref } from "vue";
  import { getImageIndex, getImageToken } from "@/api/content";
  import { getComicDetail } from "@/api/comicCover";

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
    comicDetail.value = await getComicDetail("30125");
    imgEpList.value = comicDetail.value.data.ep_list;
    imgEpList.value.reverse();
    // 调用getContentData方法获取章节数据并对数据做处理
    getContentData(imgEpList.value[0].id);
  };

  getComicEpList();

  // 实例化bscroll并给阅读页添加滚动处理
  BScroll.use(Pullup); // 注册上拉懒加载插件
  let bs: any = ref<object>({});
  let contentVeiw: { value: object } = ref<object>({});
  let isPullUpLoad: any = ref<boolean>(false);
  // 上拉加载调用此函数，发送下一章请求
  let epListindex: { value: number } = ref<number>(1); // 章节计数
  const pullingUpHandler = async () => {
    isPullUpLoad.value = true;
    await getContentData(imgEpList.value[epListindex.value].id); // 上拉加载请求下一章数据
    epListindex.value++;
    bs.value.finishPullUp();
    bs.value.refresh();
    isPullUpLoad.value = false;
  };

  let timer: any = null;
  onMounted(() => {
    // 实例化bscroll并配置其配置项
    bs.value = new BScroll(contentVeiw.value as HTMLElement, {
      scrollY: true,
      click: true,
      pullUpLoad: {
        threshold: 20,
      },
      observeImage: true, // 开启 observe-image 插件
    });
    // 每1000ms重载一次
    nextTick(() => {
      bs.value.refresh();
    });
    // 监听上拉事件，执行相应回调函数
    bs.value.on("pullingUp", pullingUpHandler);
  });

  onBeforeUnmount(() => {
    // 清除延时器
    clearInterval(timer);
  });
</script>

<template>
  <div class="contentView w-100 h-100" ref="contentVeiw">
    <!-- 滚动内容 -->
    <div class="w-100">
      <!-- 每一页内容 -->
      <v-lazy
        v-for="(item, index) in imgUrlTokenAll"
        :key="index"
        :min-height="200">
        <div class="imgItem w-100">
          <img :src="item.url + '?token=' + item.token" class="w-100" />
        </div>
      </v-lazy>
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

    <!-- 顶栏 -->
  </div>
</template>

<style lang="scss"></style>

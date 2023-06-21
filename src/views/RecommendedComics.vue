<script setup lang="ts">
  import { ref, onMounted, onUpdated } from "vue";
  import { getRecommend, getHomeRecommend } from "../api/Recommended";
  import chunk from "lodash/chunk";
  import BScroll from "better-scroll"; //导入Better scroll核心
  import ObserveDOM from "@better-scroll/observe-dom"; //ObserveDOM插件
  import { useRouter } from "vue-router";
  //------------Better scroll实例化-----------
  let RecommendedComics = ref();
  BScroll.use(ObserveDOM); // 自动重载插件
  let bs = ref();
  onMounted(() => {
    bs.value = new BScroll(RecommendedComics.value, {
      probeType: 3,
      click: true,
      observeDOM: true,
    });
  });
  // 推荐漫画列表
  interface arr {
    value: Array<object>;
  }
  let RecommendList: arr = ref<never[]>([]);
  let RecommendLists = ref();
  // ---------------获取推荐漫画数据3条----------------
  const getRecommendFun = async () => {
    let data = await getRecommend();
    RecommendList.value.push(...data.data);
  };
  getRecommendFun();
  // -------------获取推荐漫画数据10条--------------
  const getHomeRecommendFun = async () => {
    let data = await getHomeRecommend();
    RecommendList.value.push(...data.data.list);
    RecommendList.value.pop();
    RecommendLists.value = chunk(RecommendList.value, 4);
  };
  getHomeRecommendFun();
  //-----------滚动效果---------------

  interface position {
    x: number;
    y: number;
  }
  let contentList = ref();
  let topOpacity = ref(0.75);
  let bottomOpacity = ref(0.5);
  let translateY = ref(60);
  let scrollFun = (position: position) => {
    if (position.y <= 0) {
      if (position.y > -130) {
        topOpacity.value = 0.75 + (0.75 * position.y) / 130;
      } else if (position.y > -220) {
        bottomOpacity.value = 0.5 + (0.5 * (position.y + 130)) / 90;
      }
    }
    if (position.y <= 0 && position.y > -220) {
      translateY.value = 60 + 60 * (position.y / 220);
    } else if (position.y < -220) {
      //解决js的误差问题
      translateY.value = 0;
    } else if (position.y > 0) {
      translateY.value = 60;
    }
  };
  onMounted(() => {
    //-------------添加滚动事件----------
    bs.value.on("scroll", scrollFun);
  });
  //--------------获取uldom绑定变量样式
  onUpdated(() => {
    contentList.value.children[3].style.transform = `translateY(${translateY.value}px)`;
    contentList.value.children[4].style.transform = `translateY(${
      2 * translateY.value
    }px)`;
  });

  //--------------跳转详情页------------
  let router = useRouter();
  const goComicCoverPage = (id: number) => {
    console.log(id);
    router.push({
      path: "comicCover",
      query: {
        id: id,
      },
    });
  };
</script>
<template>
  <div
    class="RecommendedComics w-100 h-100 noScrollBar"
    ref="RecommendedComics">
    <!-- 滚动内容 -->
    <div
      class="contentList d-flex"
      ref="contentList"
      style="min-height: calc(100% + 1px)">
      <!-- 头部文本 -->
      <p
        :style="{ opacity: topOpacity }"
        class="fs-2 top fw-bold text-end pe-3 w-100 position-absolute z-n1">
        なし<br />
        作品を購読する<br />
      </p>
      <p
        :style="{ opacity: bottomOpacity }"
        class="fs-2 bottom fw-bold text-end pe-3 w-100 position-absolute z-n1">
        サプライズ探索<br />
        その他の作品<br />
        詳細を開く<br />
      </p>
      <ul v-for="(item, index) in RecommendLists" :key="index">
        <li
          class="w-100 m-1 fw-bold d-flex fs-4 position-relative"
          v-for="card in item"
          :key="card.season_id"
          @click="goComicCoverPage(card.season_id || card.comic_id)">
          <div class="w-100 d-flex justify-content-end">
            <div
              style="
                background: linear-gradient(
                  90deg,
                  transparent,
                  rgba(0, 0, 0, 0.5) 30%,
                  rgba(0, 0, 0, 0.5)
                );
              ">
              <span
                class="text-direction pt-3 fs-1 fw-bold"
                style="
                  font-family: inherit !important;
                  background: linear-gradient(
                    rgb(255, 193, 239),
                    rgb(187, 180, 255)
                  );
                  -webkit-background-clip: text;
                  color: transparent;
                "
                >{{ card.title }}</span
              >
            </div>
          </div>
          <img
            :src="card.vertical_cover + '@300w_300h.jpg'"
            class="w-100 h-100 position-absolute" />
        </li>
      </ul>
    </div>
    <!-- 顶部返回 -->
    <back-component class="position-fixed"></back-component>
  </div>
</template>
<style lang="scss">
  p.top {
    top: 77.5px;
  }
  p.bottom {
    top: 162.5px;
  }
  .contentList {
    padding-top: 227.5px;
  }
  ul {
    flex: 1;
    overflow: hidden;
    &:nth-child(4) {
      transform: translateY(60px);
    }
    &:nth-child(5) {
      transform: translateY(120px);
    }
  }
  li {
    height: 250px;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
  }
  img {
    object-fit: cover;
    z-index: -1;
  }
  .text-direction {
    color: #000;
    font-family: "黑体";
    letter-spacing: 0.4em;
    margin: 0 auto;
    writing-mode: vertical-rl; /*从左向右 从右向左是 writing-mode: vertical-rl;*/
    writing-mode: tb-rl; /*IE浏览器的从左向右 从右向左是 writing-mode: tb-rl；*/
  }
</style>

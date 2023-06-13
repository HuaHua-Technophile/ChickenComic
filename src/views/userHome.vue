<script setup lang="ts">
  import BScroll from "better-scroll"; //导入Better scroll核心
  import Pullup from "@better-scroll/pull-up";
  import ObserveDOM from "@better-scroll/observe-dom";
  import NestedScroll from "@better-scroll/nested-scroll";
  import { ref, onMounted, onUpdated, watch } from "vue";
  import { storeToRefs } from "pinia";
  import { useGlobalStore } from "@/stores/counter";

  // 获取用户信息
  const { userInfo } = storeToRefs(useGlobalStore());
  console.log(userInfo.value);

  // 获取userHome对象
  let userHome: any = ref<object | null>(null);
  let collectBs: any = ref<object | null>(null);
  // 实例化bscroll并注册插件
  BScroll.use(Pullup); // 注册上拉懒加载插件
  BScroll.use(ObserveDOM); // 自动重载插件
  BScroll.use(NestedScroll); // 注册嵌套bscroll插件

  let bs: any = ref<object>({});
  let bs2: any = ref<object>({});
  const bsMounted = () => {
    // 实例化bscroll并配置其配置项
    bs.value = new BScroll(userHome.value as HTMLElement, {
      click: true,
      pullUpLoad: true,
      // 开启 observe-image 插件
      bounce: {
        bottom: false, //阻止底部的上拉回弹动画
      },
      ObserveDOM: true,
      nestedScroll: {
        groupId: 2,
      },
    });
    console.log(collectBs.value.$el);
  };
  onMounted(() => {
    bsMounted();
  });

  // tab组件
  const active = ref(0);
  watch(active, () => {
    console.log("更行了");
    bs2.value = new BScroll(collectBs.value.$el as HTMLElement, {
      click: true,
      pullUpLoad: true,
      // 开启 observe-image 插件
      ObserveDOM: true,
      nestedScroll: {
        groupId: 2,
      },
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
      <van-tabs
        v-model:active="active"
        line-width="50%"
        line-height="44px"
        background="rgba(0, 0, 0, .3)"
        color="rgba(255, 255, 255, .3)"
        title-inactive-color="rgb(232, 232, 232)"
        title-active-color="rgb(232, 232, 232)">
        <van-tab
          class="overflow-hidden"
          :title="'コレクション'"
          ref="collectBs"
          style="height: 50vh">
          <div class="bsItemFirst">
            <div v-for="item in 100" :key="item">{{ item }}</div>
          </div>
        </van-tab>
        <van-tab class="pt-4 px-4" :title="'レコード破り'">内容</van-tab>
      </van-tabs>
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

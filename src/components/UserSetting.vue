<script setup lang="ts">
  import { useRouter } from "vue-router";
  const router = useRouter();
  defineProps<{
    userId: string | null;
    userInfo:
      | {
          id: number;
          name: string;
          collection: Array<{
            vertical_cover: string;
            title: string;
            last_ord: number;
          }>;
        }
      | undefined;
  }>();

  // 跳转到用户主页
  const toUserHome = () => {
    router.push("userHome");
  };
  // 跳转到设置页
  const toSettingAbout = () => {
    router.push("settingAbout");
  };
</script>

<template>
  <!-- 用户信息/设置 -->
  <div class="userArea d-flex px-4 align-items-center mt-4">
    <!-- 用户头像 -->
    <div
      class="userCoverBox flex-shrink-0 me-3"
      style="
        width: 70px;
        height: 70px;
        padding: 4px;
        background: linear-gradient(to right, #8f41e9, #578aef);
        border-radius: 50%;
      "
      @click="toUserHome">
      <div class="userCover">
        <img
          class="notWidthTransition rounded-circle"
          style="width: 100%; height: 100%"
          v-lazy="`https://q.qlogo.cn/headimg_dl?dst_uin=${userId}&spec=3`"
          alt="" />
      </div>
    </div>
    <!-- 用户昵称&签名 -->
    <div class="userMsg flex-grow-1 text-truncate">
      <div class="userName fs-6 text-truncate opacity-50">uid:{{ userId }}</div>
      <div class="subName text-truncate fs-5">
        {{ userInfo?.name }}
      </div>
    </div>
    <!-- 更多 -->
    <div
      class="more flex-shrink-0 d-flex align-items-center justify-content-center"
      style="
        width: 45px;
        height: 45px;
        border-radius: 50%;
        box-shadow: inset 0 0 2px rgba(255, 255, 255, 0.1);
        background-image: linear-gradient(
          -45deg,
          rgba(255, 255, 255, 0.2) 0%,
          transparent 32%,
          transparent 65%,
          rgba(255, 255, 255, 0.2) 100%
        );
      "
      @click="toSettingAbout">
      <i class="bi bi-x-diamond fs-2" style="line-height: 45px"></i>
    </div>
  </div>
</template>

<style lang="scss"></style>

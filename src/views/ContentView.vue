<script setup lang="ts">
  import { ref } from "vue";
  import { getImageIndex, getImageToken } from "@/api/content";

  // 获取漫画章节内容图片&索引
  let imgIndexUrl: any = ref<string | null>(null); // 漫画章节内容图片&索引 api数据
  let imgBaseUrl: any = ref<string | null>(null); // 漫画章节内容图片拼接地址
  let imgUrlArr: any = ref<Array<object> | null>(null); // 漫画章节内容图片数据(整合为数组)
  let imgUrlToken: any = ref<Array<object> | null>(null); // 漫画章节内容图片Token api数据
  const getContentData = async (epId: number) => {
    imgIndexUrl.value = await getImageIndex({ epId: epId }); // 请求漫画章节内容图片&索引数据
    imgBaseUrl.value = imgIndexUrl.value.data.host;
    // 根据图片基地址 图片url 图片格式 拼接为图片token接口的请求参数
    imgUrlArr.value = imgIndexUrl.value.data.images.map(
      (item: { path: string }) => {
        return `${imgBaseUrl.value + item.path}@1000w.webp`;
      }
    );
    // 批量请求token
    imgUrlToken.value = await getImageToken({
      urls: JSON.stringify(imgUrlArr.value),
    }); // 请求漫画章节内容图片token数据
    console.log(imgUrlToken.value);
  };
  getContentData(664941);
</script>

<template>
  <div class="contentView w-100">
    <!-- 每一页内容 -->
    <div
      class="imgItem w-100"
      v-for="(item, index) in imgUrlToken?.data"
      :key="index">
      <img :src="item.url + '?token=' + item.token" class="w-100" />
    </div>
  </div>
</template>

<style lang="scss"></style>

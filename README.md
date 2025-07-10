<h1 align="center" style="color:pink;">「 🌸 紙櫻漫畫 (ChickenComic) 」</h1>

<h4 align="center" style="color:#ED93AD;">霓虹就像紙上綻放的櫻花，觸手可得</h4>

<p align="center">
  <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/HuaHua-Technophile/ChickenComic">
  <img alt="GitHub repo size" src="https://img.shields.io/github/repo-size/HuaHua-Technophile/ChickenComic">
  <a href="https://github.com/HuaHua-Technophile/ChickenComic/stargazers">
    <img alt="GitHub stars" src="https://img.shields.io/github/stars/HuaHua-Technophile/ChickenComic?style=social">
  </a>
</p>

一款基于 VUE3 的单页面**日系**漫画阅读项目, 旨在提供一个美观、流畅、功能丰富的在线漫画阅读体验。

## 💻 必备依赖

开始前，请确保您的环境中已安装以下软件：

- **Node.js**: `^16.0.0` 或更高版本。
- **Git**: 用于克隆项目仓库。

您可以通过在终端执行 `node -v` 和 `git --version` 来检查它们的版本。

## 🚀 安装并运行

1.  **克隆项目**
    在您想要存放项目的文件夹中打开终端，并执行以下命令：

    ```bash
    git clone https://github.com/HuaHua-Technophile/ChickenComic.git
    ```

2.  **安装依赖**
    本项目使用 `pnpm` 进行依赖管理，以获得更好的性能和磁盘空间效率。

    ```bash
    cd ChickenComic
    # 如果您尚未安装 pnpm，请先执行： npm install -g pnpm
    pnpm install
    ```

3.  **启动项目**
    执行以下命令启动本地开发服务器：
    ```bash
    pnpm dev
    ```

> 💡 **提示**: 该项目主要为移动端设计。请在浏览器开发者工具中切换到移动端视图（推荐 iPhone XR 尺寸）以获得最佳体验。

## 📂 项目结构

```
.
├── src
│   ├── api         # API 请求模块
│   ├── components  # 公共组件
│   ├── font        # 字体文件
│   ├── img         # 图片资源
│   ├── router      # 路由配置
│   ├── scss        # 全局 SCSS 样式
│   ├── stores      # Pinia 状态管理
│   ├── utils       # 工具函数
│   ├── views       # 视图页面
│   ├── App.vue     # 根组件
│   └── main.ts     # 入口文件
├── auto-imports.d.ts # 自动导入类型定义
├── components.d.ts # 组件类型定义
├── index.html      # 入口 HTML
├── package.json    # 项目依赖
├── README.md       # 项目文档
└── vite.config.ts  # Vite 配置文件
```

## 🛠️ 技术栈

| 核心技术                                                                          | UI 框架 & 库                                                                            | 其他工具                                                              |
| :-------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------- | :-------------------------------------------------------------------- |
| ![Vue.js](https://img.shields.io/badge/Vue.js-3.x-4FC08D?logo=vue.js)             | ![Vant](https://img.shields.io/badge/Vant-4.x-00BFFF?logo=vant)                         | ![Lodash](https://img.shields.io/badge/Lodash-4.x-3492FF?logo=lodash) |
| ![Vue Router](https://img.shields.io/badge/Vue_Router-4.x-4FC08D?logo=vue.js)     | ![Element Plus](https://img.shields.io/badge/Element_Plus-2.x-409EFF?logo=element-plus) | ![VUE QR](https://img.shields.io/badge/VUE_QR-4.x-green)              |
| ![Pinia](https://img.shields.io/badge/Pinia-2.x-FFD83A)                           | ![Bootstrap](https://img.shields.io/badge/Bootstrap-5.x-7952B3?logo=bootstrap)          | ![Js-md5](https://img.shields.io/badge/Js--md5-0.7.x-blue)            |
| ![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript) | ![Swiper](https://img.shields.io/badge/Swiper-9.x-6332F6?logo=swiper)                   | ![Clipboard.js](https://img.shields.io/badge/Clipboard.js-2.x-7854F7) |
| ![Axios](https://img.shields.io/badge/Axios-1.x-5A29E4?logo=axios)                | ![Better Scroll](https://img.shields.io/badge/Better_Scroll-2.5-orange)                 | ![Popper.js](https://img.shields.io/badge/Popper.js-2.x-F82D76)       |
| ![Sass](https://img.shields.io/badge/Sass-CC6699?logo=sass)                       |                                                                                         |                                                                       |

_数据来源: 哔哩哔哩漫画 API 接口_

## 💖 设计理念

**紙櫻漫畫 (ChickenComic)** 是一款旨在为二次元爱好者提供极致阅读体验的 Web 应用。我们相信，优秀的漫画作品能够像樱花一样，在纸上绽放，虽是虚拟，却能触动人心。

- **满足心理需求**：提供一个逃离现实压力，追寻梦想与热爱的空间。
- **内容丰富多样**：涵盖热血、恋爱、科幻等多种题材，满足不同口味。
- **传播便捷高效**：借助现代网络技术，轻松分享与交流。
- **致敬经典文化**：融合了深厚的日漫文化与汉文化元素，易于理解与共鸣。

项目 UI 采用**深蓝/深紫**与**浅粉/浅蓝**的霓虹撞色方案，结合精细的内发光与外阴影，营造出富有层次感和活力的视觉效果，致力于为年轻用户带来沉浸式的阅读享受。

## ✨ 功能与特点

- **🎨 双主题切换**：内置暗色与亮色主题，适应不同环境。
- **⚡️ 极致性能**：全面采用虚拟列表、图片懒加载及非线性过渡动画，确保流畅体验。
- **📱 现代化 UI**：霓虹主题设计，精致且富有立体感。
- **👁️ 阅读页自定义**：支持调节护眼模式，夜间阅读更舒适。
- **🖐️ 解放双手**：提供自动播放功能，触摸屏幕即可暂停。
- **🔍 手势缩放**：双指轻松缩放，细节尽收眼底。
- **🧠 智能推荐**：搜索页内置“猜你想搜”，更懂你的喜好。
- **📚 海量分类**：16 × 2 × 2 种分类，精准找到心仪作品。
- **🏆 权威排行**：聚合 8 大排行榜，轻松掌握热门趋势。

## 🖼️ 项目预览

|                                                        &nbsp;                                                        |                                                        &nbsp;                                                        |                                                        &nbsp;                                                        |
| :------------------------------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------------------------: |
| <img src="https://www.imageoss.com/images/2023/07/31/Snipaste_2023-06-24_20-26-275def23e5e988d3ce.png" width="250"/> | <img src="https://www.imageoss.com/images/2023/07/31/Snipaste_2023-06-24_20-27-302d065137886c0a1b.png" width="250"/> | <img src="https://www.imageoss.com/images/2023/07/31/Snipaste_2023-06-24_20-27-347d129bc6f1b3a49c.png" width="250"/> |
| <img src="https://www.imageoss.com/images/2023/07/31/Snipaste_2023-06-24_20-28-13c0d92308baef1523.png" width="250"/> | <img src="https://www.imageoss.com/images/2023/07/31/Snipaste_2023-06-24_20-31-07cf38a68eac77af1e.png" width="250"/> | <img src="https://www.imageoss.com/images/2023/07/31/Snipaste_2023-06-24_20-31-117b8dc24193897c37.png" width="250"/> |
| <img src="https://www.imageoss.com/images/2023/07/31/Snipaste_2023-06-24_20-31-17d5b12ae37235c72c.png" width="250"/> | <img src="https://www.imageoss.com/images/2023/07/31/Snipaste_2023-06-24_20-35-27e2ee04d8cc85803f.png" width="250"/> | <img src="https://www.imageoss.com/images/2023/07/31/Snipaste_2023-06-24_20-35-5395c5cb18108166fb.png" width="250"/> |
| <img src="https://www.imageoss.com/images/2023/07/31/Snipaste_2023-06-24_20-36-02ef38e463204651c6.png" width="250"/> | <img src="https://www.imageoss.com/images/2023/07/31/Snipaste_2023-06-24_20-36-15546c1784ee76da5d.png" width="250"/> | <img src="https://www.imageoss.com/images/2023/07/31/Snipaste_2023-06-24_20-36-25e2fc6c09bedc2fca.png" width="250"/> |
| <img src="https://www.imageoss.com/images/2023/07/31/Snipaste_2023-06-24_20-36-407c3b3b917d89c6cd.png" width="250"/> | <img src="https://www.imageoss.com/images/2023/07/31/Snipaste_2023-06-24_20-37-39aca7f4d592355360.png" width="250"/> | <img src="https://www.imageoss.com/images/2023/07/31/Snipaste_2023-06-24_20-37-50f2e774a181196179.png" width="250"/> |
| <img src="https://www.imageoss.com/images/2023/07/31/Snipaste_2023-06-24_20-38-28db4a7c3674a6de97.png" width="250"/> | <img src="https://www.imageoss.com/images/2023/07/31/Snipaste_2023-06-24_20-38-38c6b91dd971af4520.png" width="250"/> | <img src="https://www.imageoss.com/images/2023/07/31/Snipaste_2023-06-24_20-42-501ad47e03e01b683c.png" width="250"/> |
| <img src="https://www.imageoss.com/images/2023/07/31/Snipaste_2023-06-24_20-43-27e239d266a2511c2a.png" width="250"/> | <img src="https://www.imageoss.com/images/2023/07/31/Snipaste_2023-06-24_20-44-273e3776ab3c4933d6.png" width="250"/> | <img src="https://www.imageoss.com/images/2023/07/31/Snipaste_2023-06-24_20-44-34a404c33483baa645.png" width="250"/> |
| <img src="https://www.imageoss.com/images/2023/07/31/Snipaste_2023-06-24_20-44-49e5427ac486f20c0e.png" width="250"/> | <img src="https://www.imageoss.com/images/2023/07/31/Snipaste_2023-06-24_20-45-508e61e01cdb89465d.png" width="250"/> | <img src="https://www.imageoss.com/images/2023/07/31/Snipaste_2023-06-24_20-46-00966592a45a284b79.png" width="250"/> |
| <img src="https://www.imageoss.com/images/2023/07/31/Snipaste_2023-06-24_20-46-15890e1239a3947df2.png" width="250"/> | <img src="https://www.imageoss.com/images/2023/07/31/Snipaste_2023-06-24_20-46-4572e1f9b78bd5b8d5.png" width="250"/> | <img src="https://www.imageoss.com/images/2023/07/31/Snipaste_2023-06-24_20-47-203d2f9421cb848f27.png" width="250"/> |
| <img src="https://www.imageoss.com/images/2023/07/31/Snipaste_2023-06-24_20-47-321d06ded2b1d85efd.png" width="250"/> | <img src="https://www.imageoss.com/images/2023/07/31/Snipaste_2023-06-24_20-47-41f6e75e9242040ee9.png" width="250"/> | <img src="https://www.imageoss.com/images/2023/07/31/Snipaste_2023-06-24_20-47-52b725561a162de40c.png" width="250"/> |
| <img src="https://www.imageoss.com/images/2023/07/31/Snipaste_2023-06-24_20-48-003eb44cfaf7bab0ce.png" width="250"/> | <img src="https://www.imageoss.com/images/2023/07/31/Snipaste_2023-06-24_20-48-06ee668e294121683c.png" width="250"/> | <img src="https://www.imageoss.com/images/2023/07/31/Snipaste_2023-06-24_20-48-11bff2c1545123937f.png" width="250"/> |
| <img src="https://www.imageoss.com/images/2023/07/31/Snipaste_2023-06-24_20-48-27ffc30f08baebb0d1.png" width="250"/> | <img src="https://www.imageoss.com/images/2023/07/31/Snipaste_2023-06-24_20-49-07d0c6ced5500a75f9.png" width="250"/> | <img src="https://www.imageoss.com/images/2023/07/31/Snipaste_2023-06-24_20-51-54f3db310e238fcb36.png" width="250"/> |

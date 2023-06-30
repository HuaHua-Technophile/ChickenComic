[![VIFBj8.png](https://i.imgloc.com/2023/06/25/VIFBj8.png)](https://github.com/HuaHua-Technophile/ChickenComic)

<h1 align="center" style="color:pink;">「 紙櫻漫畫(ChickenComic) 」</h1>

<h4 align="center" style="color:#ED93AD;">霓虹就像紙上綻放的櫻花，觸手可得</h4>

<br />
<br />
<br />
<br />

[🐛 必备依赖](#必备依赖)

[📦 安装并运行](#安装并运行)

[👻 技术栈](#技术栈)

[📖 设计理念](#设计理念)

[📚 功能与特点](#功能与特点)

# 必备依赖

1. 在开始前，请先检查您的电脑是否已经安装了 node.js 环境.
2. 按下<kbd>win</kbd>+<kbd>R</kbd>按键。输入 `cmd`,打开命令终端
3. 在终端中,执行`node -v`,查看 node 版本,若未提示版本号,或版本号提示`<16`,则需安装最新版.若`>16`,则请移步至第 6 步
4. 若 node.js 版本过低,或未安装.则进入[https://nodejs.org/zh-cn](https://nodejs.org/zh-cn)官网,点击下载`长期维护版`.文件下载完毕后双击执行安装.安装过程中一直` next` `下一步 `即可.
5. 安装完毕后,重复第 3 步,查看 node.js 版本号.若`>16`,即可下一步.否则查阅更多`node`安装教程
6. 在命令终端(第 2 步)中执行`Git --version`,若未提示版本号表示未安装.若已安装,则请移步至[📦 安装并运行](#安装并运行)
7. 打开[https://git-scm.com/download/win](https://git-scm.com/download/win),点击安装'Standalone Installer'版本下的 64bit.文件下载完毕后双击执行安装.安装过程中一直` next` `下一步 `即可.
8. 安装完毕后,重复第 6 步,查看 git 版本号.若已安装,即可下一步

# 安装并运行

1. 在要存放项目的文件夹中打开终端(资源管理器地址栏输入`cmd`即可),执行`git clone https://github.com/HuaHua-Technophile/ChickenComic.git`.将项目克隆至本地
2. 若人在国内,推荐安装'淘宝镜像源'.在命令终端中执行`$ npm install -g cnpm --registry=https://registry.npmmirror.com`即可
3. 在命令终端中执行`cd .\ChickenComic`,移至项目文件夹内(ChickenComic)
4. 在命令终端中执行`cnpm i`或`cnpm install`,使用淘宝镜像源安装项目依赖
5. 在命令终端中执行`npm run dev`,启动服务器(请耐心等待).

> 该项目基于移动端设计.请在浏览器中<kbd>右键</kbd>,选择最下方的`检查`.然后按下<kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>M</kbd>切换至移动端模式.并选择合适的"设备尺寸"(推荐 iPhone XR),然后在右侧'缩放比例'中选择'适合窗口大小'
>
> <div style="display:flex;align-items:center;"><img src="https://i.imgloc.com/2023/05/31/VWgTPv.png"style="width:25%"/><img src="https://i.imgloc.com/2023/05/31/VWg1W3.png"style="width:25%"/><img src="https://i.imgloc.com/2023/05/31/VWgu48.png"style="width:25%"/><img src="https://i.imgloc.com/2023/05/31/VWxZNZ.png"style="width:25%"/></div>

# 技术栈

核心

- ## VUE ^3.3.2(最新)
- ## VUE-Router ^4.2.0(最新)
- ## Pina ^2.0.36(最新)
- ## TypeScript ^5.0.4(最新)
- ## axios ^1.4.0(最新)

---

框架

- #### Vant ^4.4.1(最新)
- #### Element-Plus ^2.3.6(最新)
- #### NutUI ^3.3.7(最新)
- #### Bootstrap ^5.3.0(最新)
- #### Swiper ^9.3.2(最新)
- #### Better Scroll ^2.5.1(最新)

---

其他

- ###### Lodash ^4.17.21(最新)
- ###### VUE QR ^4.0.9(二维码生成)
- ###### Js-md5 ^0.7.3(md5 加密与解析)
- ###### Clipboard ^2.0.11(最强大的剪切板插件)
- ###### popperjs ^2.11.8(最强大的 JS 定位插件)

---

数据来源

- ###### 哔哩哔哩漫画 API 接口

# 设计理念

紙櫻漫畫(ChickenComic)是一款基于 VUE3 的单页面<strong>日系</strong>漫画阅读项目,耗时 20 个夜晚。

二次元文化，一般指的是以动画、漫画、游戏等为代表的虚拟世界文化，它与现实世界的一次元文化形成对比。二次元文化源自日本，也受到了日本文化的深刻影响，因此很多人也把它和日漫文化联系在一起。现代年轻人越来越青睐于日漫文化/二次元文化

- **满足心理需求**。日漫文化/二次元文化能够提供给年轻人一个逃离现实压力、寻求梦想和自我实现的空间。在这个空间里，年轻人可以找到自己喜欢的角色、故事、主题和风格，可以感受到快乐、激情、温暖和归属感。日漫文化/二次元文化也能够满足年轻人的好奇心、创造力和想象力，让他们探索不同的可能性和世界观
- **丰富多样的内容**。日漫文化/二次元文化拥有非常广泛和细致的分类，涵盖了各种题材、风格、受众和形式。无论是热血、恋爱、搞笑、科幻、历史、美食、体育等等，都能找到相应的动画、漫画、游戏等作品。而且，这些作品往往具有高度的原创性和创造力，不断地推陈出新，引领潮流和风向
- **便捷高效的传播**。随着移动互联网、智能终端和社交媒体的发展，日漫文化/二次元文化的传播成本大大降低，覆盖面大大扩大。年轻人可以通过各种平台和渠道，方便地获取和分享日漫文化/二次元文化的信息和资源，也可以更自由地表达和交流自己的观点和感受。同时，互联网也促进了日漫文化/二次元文化与其他领域的跨界合作和创新，形成了更多的商业机会和社会价值
- **深厚历史的渊源**。日漫文化/二次元文化虽然是近几十年才兴起的现象，但它其实有着悠久而丰富的历史根源。从浮世绘到北斋漫画，从手冢治虫到宫崎骏，从《铁臂阿童木》到《火影忍者》，日本动漫产业经历了不断的发展和变革，积累了大量的经典作品和优秀作者。而且，由于日本与中国有着千丝万缕的联系，日本动漫中也保留了许多汉字和中华文化的元素，让中国的年轻人更容易理解和认同

该项目由发起人负责所有页面的设计，采用了深蓝/深紫 与 浅粉/浅蓝 的 暗色/亮色 活力系霓虹撞色
大量图片的预加载应用了非线性过渡，采用了极其灵动的动画效果，使得漫画阅读更加的舒适
恰到好处的立体内发光与外阴影，更加展现界面设计的层次感，更加符合年轻人的审美。

发起人的设计理念是想让用户便捷的，随时随地的，醉心于那霓虹的精彩中，仿若故乡的樱花就盛开在眼前，在二次元的虚拟世界中短暂的放空自己，不被尘世的纷扰所纠缠。因此，“<span style="color:#ED93AD">霓虹就像紙上綻放的櫻花，觸手可得</span>”，是非常合适的品牌理念

在这里，随时随地享受正版、高清、海量的日本漫画内容。无论什么类型的漫画，纸樱漫画都能为你提供最适合你的推荐和阅读体验。纸樱，让你与霓虹零距离接触，感受不一样的文化魅力和创意想象。

# 功能与特点

- 暗色主题/亮色主题适配。夜间/白日无缝切换
- 虚拟列表、图片预加载+不可见自动销毁 100%覆盖，精调非线性过渡.界面渲染压力小，纵享德芙般丝滑
- 霓虹主题，现代化 UI 设计界面，切到好处的内发光与外阴影，立体感拉满，简约且精致
- 漫画阅读页可调护眼程度，夜间畅游二次元
- 漫画阅读页自动播放，触屏后自动停止，解放双手
- 漫画阅读页双指缩放，放大再放大，每根毛都看得清清楚楚~
- 搜索页具有大数据推荐模块，“猜你想搜”，更加懂二刺螈的口味。
- 16 × 2 × 2 种分类，满足你的需求~
- 8 大排行榜，各领域最流行漫画一网打尽！

![VIEgB3.png](https://i.imgloc.com/2023/06/24/VIEgB3.png)
![VIExJy.png](https://i.imgloc.com/2023/06/24/VIExJy.png)
![VIEEA5.png](https://i.imgloc.com/2023/06/24/VIEEA5.png)
![VIEer8.png](https://i.imgloc.com/2023/06/24/VIEer8.png)
![VIEz5Z.png](https://i.imgloc.com/2023/06/24/VIEz5Z.png)
![VIEFZF.png](https://i.imgloc.com/2023/06/24/VIEFZF.png)
![VIEGOH.png](https://i.imgloc.com/2023/06/24/VIEGOH.png)
![VIEdeQ.png](https://i.imgloc.com/2023/06/24/VIEdeQ.png)
![VIEhaE.png](https://i.imgloc.com/2023/06/24/VIEhaE.png)
![VIES0C.png](https://i.imgloc.com/2023/06/24/VIES0C.png)
![VIEoBP.png](https://i.imgloc.com/2023/06/24/VIEoBP.png)
![VIEsJX.png](https://i.imgloc.com/2023/06/24/VIEsJX.png)
![VIE9Dt.png](https://i.imgloc.com/2023/06/24/VIE9Dt.png)
![VIEJrJ.png](https://i.imgloc.com/2023/06/24/VIEJrJ.png)
![VIEK5c.png](https://i.imgloc.com/2023/06/24/VIEK5c.png)
![VIEMiA.png](https://i.imgloc.com/2023/06/24/VIEMiA.png)
![VIEPOo.png](https://i.imgloc.com/2023/06/24/VIEPOo.png)
![VIETzN.png](https://i.imgloc.com/2023/06/24/VIETzN.png)
![VIEa1V.png](https://i.imgloc.com/2023/06/24/VIEa1V.png)
![VIEQ0d.png](https://i.imgloc.com/2023/06/24/VIEQ0d.png)
![VIEYXb.png](https://i.imgloc.com/2023/06/24/VIEYXb.png)
![VIEqJq.png](https://i.imgloc.com/2023/06/24/VIEqJq.png)
![VIeZDz.png](https://i.imgloc.com/2023/06/24/VIeZDz.png)
![VIei3w.png](https://i.imgloc.com/2023/06/24/VIei3w.png)
![VIeV5a.png](https://i.imgloc.com/2023/06/24/VIeV5a.png)
![VIeyix.png](https://i.imgloc.com/2023/06/24/VIeyix.png)
![VIe4bk.png](https://i.imgloc.com/2023/06/24/VIe4bk.png)
![VIeAzL.png](https://i.imgloc.com/2023/06/24/VIeAzL.png)
![VIeD1p.png](https://i.imgloc.com/2023/06/24/VIeD1p.png)
![VIenCU.png](https://i.imgloc.com/2023/06/24/VIenCU.png)
![VIetXv.png](https://i.imgloc.com/2023/06/24/VIetXv.png)
![VIeWK3.png](https://i.imgloc.com/2023/06/24/VIeWK3.png)
![VIe0Uy.png](https://i.imgloc.com/2023/06/24/VIe0Uy.png)
![VIeC35.png](https://i.imgloc.com/2023/06/24/VIeC35.png)
![VIelS8.png](https://i.imgloc.com/2023/06/24/VIelS8.png)
![VIe2VZ.png](https://i.imgloc.com/2023/06/24/VIe2VZ.png)

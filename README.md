[![VI7nFL.png](https://i.imgloc.com/2023/06/24/VI7nFL.png)](https://github.com/HuaHua-Technophile/ChickenComic)

<h1 align="center" style="color:pink;">「 紙櫻漫畫(ChickenComic) 」</h1>

<h4 align="center" style="color:#ED93AD;">精彩就像紙上綻放的櫻花，觸手可得。</h4>

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

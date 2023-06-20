<script setup lang="ts">
  import { ref, onMounted } from "vue";
  import { storeToRefs } from "pinia";
  import BScroll from "better-scroll"; //导入Better scroll核心
  import { useThemeStore } from "../stores/theme"; //导入pinia
  import { showToast } from "vant";
  import "vant/es/toast/style";
  //---------------bs实例化相关-----------
  let settingAbout = ref();
  let bs = ref({}); //Better scroll实例化后对象的存储
  onMounted(() => {
    bs.value = new BScroll(settingAbout.value, {
      click: true,
    });
  });
  //--------------主题色修改------------------
  let store = useThemeStore();
  let { theme } = storeToRefs(store);
  let { changeTheme } = store;
  console.log(changeTheme);
  let settingChangeTheme = () => {
    changeTheme();
  };
  //--------------遮罩层修改------------------
  let overlayShow = ref(false);
  let overlayInfo = ref("");
</script>
<template>
  <div ref="settingAbout" class="settingAbout w-100 h-100 noScrollBar">
    <!-- 滚动内容 -->
    <div class="ps-3 pe-3 overflow-hidden" style="min-height: calc(100% + 1px)">
      <!-- 头部图片信息 -->
      <div class="ps-5 pe-5" style="margin-top: 30%">
        <img src="@/img/logo.png" class="w-100 h-100 rounded-3" />
        <div class="mt-3 text-center fs-5 t-shadow-2">
          すばらしさは、紙上に咲く桜の花のように、手に取ることができます。
        </div>
      </div>
      <!-- 夜间模式切换 -->
      <div
        class="form-check form-switch pt-3 pb-3 bg-body-secondary bg-opacity-50 rounded-pill fs-5 mb-3 insetShadow-3-4"
        style="margin-top: 30%">
        <input
          class="form-check-input"
          type="checkbox"
          role="switch"
          id="flexSwitchCheckDefault"
          style="margin-left: -1.5rem"
          :checked="theme == 'dark'"
          @click="settingChangeTheme" />
        <label class="form-check-label ms-3" for="flexSwitchCheckDefault"
          >ナイトモードです</label
        >
      </div>
      <!-- 关于 -->
      <div
        class="ps-3 pe-3 bg-body-secondary bg-opacity-50 rounded-pill fs-5 pt-2 pb-2 mb-3 insetShadow-3-4"
        @click="
          overlayShow = true;
          overlayInfo =
            'あなたは中国のアニメが好きですか?いつでもどこでも素晴らしいストーリーや映像を楽しみたいと思いませんか?他のアニメ好きと感想を語り合いたいと思いませんか?もしあなたが「はい」と答えたら、ぜひ「紙桜漫画」というアプリをダウンロードしてみてはいかがでしょうか。\n\n「紙桜漫画」は中国のアニメファンのために作られたプラットフォームで、最新の人気作品や名作を含む高精細アニメの膨大なリソースをここで見つけることができます。自分の好みや興味に応じて、様々なジャンル、スタイル、テーマのアニメを選ぶことができます。お笑い、ホラー、sf、恋愛、冒険などが好きな人に合ったアニメを見つけることができます。\n\n「紙桜漫画」は良質な視聴体験を提供するだけでなく、豊富なインタラクティブ機能を提供しています。各話のコメント欄にあなたの意見や評価を投稿し、他の視聴者とあなたの考えや感じたことを共有することができます。また、フォーラムで様々な話題の討論に参加することもできます。他のアニメファンと一緒にストーリー、キャラクター、声、画風などについて議論することもできます。また、「紙桜漫画」にお気に入りのアニメを保存したり、リマインダーを設置したりすることもできます。\n\n「紙桜漫画」は中国のアニメの世界に没入できるアプリで、アニメの魅力や楽しさを感じることができます。早く来て「紙の桜の漫画」をダウンロードしましょう、あなたの生活をもっと多彩で面白いです!';
        ">
        <i class="bi bi-info-square fs-3 ms-3 me-4"></i>
        <span>紙桜漫画についてです</span>
      </div>
      <!-- 隐私协议 -->
      <div
        class="ps-3 pe-3 bg-body-secondary bg-opacity-50 rounded-pill fs-5 pt-2 pb-2 mb-3 insetShadow-3-4"
        @click="
          overlayShow = true;
          overlayInfo = `「紙さくらコミック」ではユーザーのプライバシーとセキュリティを非常に重視しており、以下のようなプライバシープロトコルを作成していますので、よく読んで了承してください。

「紙桜漫画」を利用する際には、下記のような個人情報を収集することができます。

-モデル、オペレーティングシステム、IPアドレスなどのデバイス情報です。
-ユーザー名、パスワード、プロフィール画像、ニックネームなどのアカウント情報です。
-あなたの閲覧と視聴の記録は、あなたが検索して見たアニメ、あなたが投稿したコメントや参加した議論などです;
あなたの連絡先、例えばメールアドレス、電話番号などです。

情報収集の目的はこうです

-私達のサービスを提供して改善して、例えばあなたが興味を持つかもしれないアニメを推薦して、私達のインターフェースと機能を最適化します;
-私達の合法的な権益を保護して、詐欺、侵害、違法などの行為を防止して処理します;
-あなたの苦情、提案、問い合わせなどの処理のような要求とフィードバックに応答します;
-更新、キャンペーン、特典などのお知らせと広告をお送りします。

私たちはあなたの箇人情報を保護するために最善を尽くし、あなたの箇人情報の漏洩、改ざん、紛失、不正アクセスや使用を防ぐために合理的な技術と管理を行います。あなたの個人情報を第三者に売却、譲渡、開示することはありません。

-あなたは事前に同意または許可します;
-私達は第三者と協力してサービスを提供する必要があります、例えば決済プラットフォーム、物流会社など;
法を遵守したり、司法や行政機関の要求に応じなければなりません。

「紙さくら漫画」には、他のサイトやアプリへのリンクが含まれている場合があります。これらのサイトやアプリには独自のプライバシーポリシーがあります。これらのサイトやアプリへのアクセスには責任を負いません。

法律やサービスの変更に応じて、本プライバシー契約を不定期に更新することがあります。本プライバシー契約を更新する際には、「紙さくらコミックス」内でお知らせいたしますので、再読の上ご了承ください。更新されたプライバシー規約に同意しない場合は、「紙さくらマンガ」の使用を中止することができます。

プライバシーに関するご質問やご提案がございましたら、ご連絡ください:zhijing@comics.com

「紙桜漫画」を選んでくださってありがとうございます。`;
        ">
        <i class="bi bi-shield-lock fs-3 ms-3 me-3"></i>
        <span>プライバシー協定です</span>
      </div>
      <!-- 检查更新 -->
      <div
        class="ps-3 pe-3 bg-body-secondary bg-opacity-50 rounded-pill fs-5 pt-2 pb-2 mb-3 insetShadow-3-4"
        @click="showToast('さいしんばんです')">
        <i class="bi bi-arrow-repeat fs-3 ms-3 me-4"></i>
        <span>更新をチェックします</span>
      </div>
      <!-- 版本号 -->
      <div class="text-center opacity-50">Versions 1.0.1 Beta</div>
    </div>
    <!-- 返回层 -->
    <back-component class="position-fixed"></back-component>
    <!-- 弹出层 -->
    <van-overlay :show="overlayShow" @click="overlayShow = false">
      <div class="w-100 h-100 overflow-scroll blur-5 noScrollBar">
        <div
          class="ps-5 pe-5 text-light min-vh-100 d-flex align-items-center opacity-75"
          style="white-space: pre-line">
          {{ overlayInfo }}
        </div>
      </div>
    </van-overlay>
  </div>
</template>
<style lang="scss"></style>

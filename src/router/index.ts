import { createRouter, createWebHashHistory } from "vue-router";

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: "/home",
    },
    {
      path: "/home",
      name: "home",
      component: () => import("@/views/HomeView.vue"),
    },
    {
      path: "/userHome",
      name: "userHome",
      component: () => import("@/views/userHome.vue"),
      // 独享路由守卫
      beforeEnter: (to, from, next) => {
        let token = window.localStorage.getItem("userId");
        // 判断是否登录
        if (!token) {
          next("/login");
          return;
        } else {
          next();
        }
      },
    },
    {
      path: "/login",
      name: "login",
      component: () => import("@/views/loginView.vue"),
      meta: {
        comicReadShow: true,
      },
    },
    {
      path: "/comicCover",
      name: "comicCover",
      component: () => import("@/views/comicCover.vue"),
      meta: {
        comicReadShow: true,
      },
    },
    {
      path: "/content",
      name: "content",
      component: () => import("@/views/ContentView.vue"),
      meta: {
        comicReadShow: true,
      },
    },
    {
      path: "/settingAbout",
      name: "settingAbout",
      component: () => import("@/views/SettingAbout.vue"),
      meta: {
        comicReadShow: true,
      },
    },
    {
      path: "/SearchInput",
      name: "SearchInput",
      component: () => import("@/views/SearchInput.vue"),
    },
    {
      path: "/SearchResults",
      name: "SearchResults",
      component: () => import("@/views/SearchResults.vue"),
    },
    {
      path: "/ranking",
      name: "ranking",
      component: () => import("@/views/RankingView.vue"),
    },
    {
      path: "/RecommendedComics",
      name: "RecommendedComics",
      component: () => import("@/views/RecommendedComics.vue"),
    },
    {
      path: "/ComicClassification",
      name: "ComicClassification",
      component: () => import("@/views/ComicClassification.vue"),
    },
  ],
});

export default router;

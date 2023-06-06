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
      path: "/comicCover",
      name: "comicCover",
      component: () => import("@/views/comicCover.vue"),
    },
    {
      path: "/content",
      name: "content",
      component: () => import("@/views/ContentView.vue"),
    },
    {
      path: "/settingAbout",
      name: "settingAbout",
      component: () => import("@/views/SettingAbout.vue"),
    },
    {
      path: '/SearchInput',
      name: 'SearchInput',
      component: () => import("@/views/SearchInput.vue"),
    }

  ],
});

export default router;

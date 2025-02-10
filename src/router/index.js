import { createRouter, createWebHashHistory } from "vue-router";
import store from "@/store";
import nProgress from "nprogress";

const routes = [
  {
    path: "/",
    name: "Landing",
    redirect: "/home",
  },
  {
    path: "/home",
    name: "Home",
    component: () => import("@/views/Home.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/Login.vue"),
  },
  {
    path: "/about",
    name: "About",
    component: () => import("@/views/About.vue"),
  },

  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: () => import("@/views/404.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
//getinfo请求了2次
let isgetInfo = false;
//全局前置路由守卫
router.beforeEach(async (to, from, next) => {
  nProgress.start();
  //获取token
  const tokenStr = window.sessionStorage.getItem("token");
  //如果未登录跳转到登录页面
  if (!tokenStr && to.path !== "/login") return next("/login");
  //如果已登录避免重复登录
  if (tokenStr && to.path == "/login") {
    return next({ path: from.path ? from.path : "/" });
  }
  let hasNewRoutes = false;
  //如果用户登录成功，调用Vuex方法，存储用户信息
  if (tokenStr && !isgetInfo) {
    const res = await store.dispatch("getUserInfo");
    isgetInfo = true;
    //动态添加路由
    //hasNewRoutes = addRoutes(res.data.menus)
  }
  //手动指定路由
  //如果确实有新路由加入手动指定路由，否则直接放行
  hasNewRoutes ? next(to.fullPath) : next();
  // next();
});
//全局后置路由守卫
router.afterEach((to, from) => {
  nProgress.done();
});
//共享路由实例对象
export default router;

import Vue from "vue";
import Router, { Route } from "vue-router";
import Home from "./views/Home.vue";

Vue.use(Router);

const router: Router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/About.vue")
    }
  ]
});

// 简单权限控制
const whiteList: string[] = ["login", "signup", "home"];
const isLogin: boolean = false;
router.beforeEach((to: Route, form: Route, next: Function) => {
  // 不在白名单内，没有登陆
  if (whiteList.indexOf(to.name as string) === -1 && !isLogin) {
    next("/login");
  }
  next();
});

export default router;

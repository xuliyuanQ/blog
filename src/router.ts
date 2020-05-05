import Vue from "vue"
import Router from "vue-router"
Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("./views/home.vue")
    },
    // {
    //   path: "/",
    //   name: "article",
    //   component: () => import("./views/article.vue")
    // },
    // {
    //   path: "/",
    //   name: "articleList",
    //   component: () => import("./views/articleList.vue")
    // },
    // {
    //   path: "/",
    //   name: "articleDetail",
    //   component: () => import("./views/articleDetail.vue")
    // },
  ]
});
import Router from "vue-router";
import Vue from "vue";

import HomePageComponent from "@/Home.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "home-page",
      component: HomePageComponent
    },
    {
      path: "*",
      redirect: "/"
    }
  ]
});

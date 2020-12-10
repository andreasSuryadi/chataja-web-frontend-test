import Vue from "vue";
import VueRouter from "vue-router";
// import store from "@/store";

Vue.use(VueRouter);

const routes = [
  // For Login
  {
    path: "/login",
    name: "login",
    component: () => import("@/components/auth/Login.vue")
  },

  // For confirmation login
  {
    path: "/login-confirmation",
    name: "loginConfirmation",
    component: () => import("@/components/auth/ConfirmLogin.vue")
  },

  // For chatbox view
  {
    path: "/chatbox",
    name: "chatbox",
    component: () => import("@/components/chatbox/Chatbox.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  // base: process.env.BASE_URL,
  // linkActiveClass: "is-active",
  routes,
  scrollBehavior() {
    window.scrollTo(0, 0);
  }
});

// router.beforeEach((to, from, next) => {
//   next({ name: "login" })
//   // if (
//   //   to.matched.some(record => record.meta.requiresAuth)
//   // ) {
//   //   next({ name: "login" });
//   // } else if (
//   //   (to.name == "login")
//   // ) {
//   //   next("/");
//   // } else {
//   //   next();
//   // }
// });

export default router;
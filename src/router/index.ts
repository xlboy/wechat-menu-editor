import { createRouter, createWebHashHistory, createWebHistory, RouteRecordRaw } from 'vue-router';
import HomeLayout from '../layouts/HomeLayout.vue';
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: HomeLayout,
    redirect: '/menuEditor',
    children: [
      {
        path: '/menuEditor',
        name: 'MenuEditor',
        component: () => import(/* webpackChunkName: "MenuEditor" */ 'pages/MenuEditor/index.vue'),
      }
    ]
  }
];

const router = createRouter({
  history: createWebHashHistory('/'),
  routes
});

export default router;

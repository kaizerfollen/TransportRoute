import Vue from 'vue';
// eslint-disable-next-line import/no-extraneous-dependencies
import VueRouter from 'vue-router';
import MainView from '../views/MainView.vue';
import RouteView from '../views/RouteView.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'MainView',
    component: MainView,
  },
  {
    path: '/route/:id',
    component: RouteView,
  },
];

const router = new VueRouter({
  routes,
  mode: 'history',
});

export default router;

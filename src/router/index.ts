import Vue from 'vue';
import VueRouter, { RawLocation, Route } from 'vue-router';
import Login from '@/views/Login.vue';
import Register from '@/views/Register.vue';
import Dashboard from '@/views/Dashboard.vue';
import Home from '@/views/Home.vue';
import store from '../store';

Vue.use(VueRouter);

const routes = [{
  path: '/',
  name: 'Home',
  component: Home,
  beforeEnter: (to: Route, from: Route, next: (to?: RawLocation | false | Function | void) => void): void => {
    if (store.state.user.loggedIn) return next({ name: 'Dashboard' });
    return next();
  },
}, {
  path: '/dashboard',
  name: 'Dashboard',
  component: Dashboard,
  beforeEnter: (to: Route, from: Route, next: (to?: RawLocation | false | Function | void) => void): void => {
    if (!store.state.user.loggedIn) return next({ name: 'Login' });
    return next();
  },
}, {
  path: '/login',
  name: 'Login',
  component: Login,
  beforeEnter: (to: Route, from: Route, next: (to?: RawLocation | false | Function | void) => void): void => {
    if (store.state.user.loggedIn) return next({ name: 'Dashboard' });
    return next();
  },
}, {
  path: '/register',
  name: 'Register',
  component: Register,
  beforeEnter: (to: Route, from: Route, next: (to?: RawLocation | false | Function | void) => void): void => {
    if (store.state.user.loggedIn) return next({ name: 'Dashboard' });
    return next();
  },
}];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;

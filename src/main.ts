import Vue from 'vue';
import '@/registerServiceWorker';
import router from '@/router';
import store from '@/store';
import App from '@/App.vue';
import firebase from 'firebase';

Vue.config.productionTip = false;

firebase.auth().onAuthStateChanged(async (user: firebase.User | null): Promise<void> => {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  let replace = () => {};
  if (!store.state.user.loggedIn && user !== null) {
    replace = router.replace.bind(router, { name: 'Dashboard' });
  } else if (store.state.user.loggedIn && user === null) {
    replace = router.replace.bind(router, { name: 'Home' });
  }
  await store.dispatch('user/fetch', user);
  replace();
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');

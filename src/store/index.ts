import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';
import RootStateInterface from '@/store/Interfaces/RootStateInterface';
import Benefits from '@/store/Benefits/Benefits';
import Rewards from '@/store/Rewards/Rewards';
import User from '@/store/User/User';
import createLogger from 'vuex/dist/logger';
import { vuexfireMutations } from 'vuexfire';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

const storeOptions: StoreOptions<RootStateInterface> = {
  modules: {
    benefits: Benefits,
    rewards: Rewards,
    user: User,
  },
  mutations: {
    ...vuexfireMutations,
  },
  // strict: debug,
  plugins: debug ? [createLogger()] : [],
};

const store = new Vuex.Store(storeOptions);

export default store;

import { firestoreAction } from 'vuexfire';
import RootStateInterface from '@/store/Interfaces/RootStateInterface';
import firebaseDb from '@/api/Firebase';
import { ActionTree, GetterTree } from 'vuex';
import RewardsStateInterface, { RewardStateInterface } from '@/store/Rewards/RewardsStateInterface';
import firebase from 'firebase';

const rewardsState: RewardsStateInterface = {
  items: [],
};

const rewardsGetterTree: GetterTree<RewardsStateInterface, RootStateInterface> = {
  items(state) {
    return state.items;
  },

  getRewardsItemById: (state) => (id: string) => state.items.find(
    (rewardsItem: RewardStateInterface) => rewardsItem.id === id,
  ),
};

const rewardsActionTree: ActionTree<RewardsStateInterface, RootStateInterface> = {
  setRewardsRef: firestoreAction<RewardsStateInterface, RootStateInterface>(
    ({
      bindFirestoreRef,
    }) => bindFirestoreRef('items', firebaseDb.collection('rewards')),
  ),
  setUserReward: ({ state, getters, rootState }, rewardId: string) => {
    const userPoints = rootState.user.points.value;
    const rewardPoints = getters.getRewardsItemById(rewardId).points;
    if (rootState.user.data === null || userPoints === null
      || userPoints < rewardPoints) return state;
    firebaseDb.collection('requests').add({
      userUid: rootState.user.data.uid,
      userEmail: rootState.user.data.email,
      reward: firebaseDb.collection('rewards').doc(rewardId),
      timestamp: firebase.firestore.Timestamp.now(),
    });

    return state;
  },
};

const rewardsMutationTree = {};

export default {
  namespaced: true,
  state: rewardsState,
  getters: rewardsGetterTree,
  actions: rewardsActionTree,
  mutations: rewardsMutationTree,
};

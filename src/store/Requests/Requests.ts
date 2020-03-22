import { firestoreAction } from 'vuexfire';
import RootStateInterface from '@/store/Interfaces/RootStateInterface';
import firebaseDb from '@/api/Firebase';
import { ActionTree, GetterTree } from 'vuex';
import firebase from 'firebase';
import BenefitsStateInterface, { BenefitStateInterface } from '@/store/Benefits/BenefitsStateInterface';

const benefitsState: BenefitsStateInterface = {
  items: [],
};

const benefitsGetterTree: GetterTree<BenefitsStateInterface, RootStateInterface> = {
  items(state) {
    return state.items;
  },

  getBenefitsItemById: (state) => (id: string) => state.items.find(
    (benefitItem) => benefitItem.id === id,
  ),
};

const benefitsActionTree: ActionTree<BenefitStateInterface[], RootStateInterface> = {
  setRequestsRef: firestoreAction<BenefitStateInterface[], RootStateInterface>(
    ({
      bindFirestoreRef,
    }) => bindFirestoreRef('items', firebaseDb.collection('benefits')),
  ),
  addBenefitRequest: ({ state, getters, rootState }, benefitId: string) => {
    const userData: null | firebase.UserInfo = rootState.user.data;
    if (userData === null) return state;
    firebaseDb.collection('points').doc(userData.uid).get()
      .then((currentValue) => {
        const data = currentValue.data();
        if (data === undefined) return;
        const benefitPoints = getters.getBenefitsItemById(benefitId).points;
        firebaseDb.collection('points').doc(userData.uid).update({
          value: data.value - benefitPoints,
          timestamp: firebase.firestore.Timestamp.now(),
        });
        if (rootState.user.data === null || data.value < benefitPoints) return;
        firebaseDb.collection('requests').add({
          userUid: userData.uid,
          userEmail: userData.email,
          benefit: firebaseDb.collection('benefits').doc(benefitId),
          timestamp: firebase.firestore.Timestamp.now(),
        });
      });

    return state;
  },
};

const benefitsMutationTree = {};

export default {
  namespaced: true,
  state: benefitsState,
  getters: benefitsGetterTree,
  actions: benefitsActionTree,
  mutations: benefitsMutationTree,
};

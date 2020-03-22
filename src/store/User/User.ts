import { ActionTree, GetterTree, MutationTree } from 'vuex';
import firebase from 'firebase';
import UserStateInterface from '@/store/User/UserStateInterface';
import RootStateInterface from '@/store/Interfaces/RootStateInterface';
import { firestoreAction } from 'vuexfire';
import firebaseDb from '@/api/Firebase';

const userState = {
  loggedIn: false,
  data: null,
  points: {
    value: 0,
  },
};

const userGetterTree: GetterTree<UserStateInterface, RootStateInterface> = {
  user(state: UserStateInterface): UserStateInterface {
    return state;
  },
  points(state: UserStateInterface): number {
    return state.points.value;
  },
};

const userActionTree: ActionTree<UserStateInterface, RootStateInterface> = {
  async register(context, { userEmail, userPassword, userName }): Promise<void> {
    const data: firebase.auth.UserCredential = await firebase.auth()
      .createUserWithEmailAndPassword(userEmail, userPassword);
    if (data.user === null) return;
    await data.user.updateProfile({ displayName: userName });
    await data.user.sendEmailVerification();
    firebaseDb.collection('points').doc(data.user.uid).set({ value: 0 });
  },
  async login(context, { userEmail, userPassword }): Promise<void> {
    await firebase.auth().signInWithEmailAndPassword(userEmail, userPassword);
  },
  async logout(): Promise<void> {
    await firebase.auth().signOut();
  },
  async reset(context, { userEmail }): Promise<void> {
    await firebase.auth().sendPasswordResetEmail(userEmail);
  },
  fetch({ commit }, user: null | firebase.User): void {
    commit('SET_LOGGED_IN', user !== null);

    if (user) {
      commit('SET_USER', user);
    } else {
      commit('SET_USER', null);
    }
  },
  setPointsRef: firestoreAction<UserStateInterface, RootStateInterface>(
    ({
      state,
      bindFirestoreRef,
    }) => {
      if (state.data === null) return state;
      return bindFirestoreRef('points', firebaseDb.collection('points').doc(state.data.uid));
    },
  ),
  addUserPointsRef: ({ state, rootState }, points: number) => {
    const userData: null | firebase.UserInfo = rootState.user.data;
    if (userData === null) return state;
    firebaseDb.collection('points').doc(userData.uid).get()
      .then((currentValue) => {
        const data = currentValue.data();
        if (data === undefined) return;
        firebaseDb.collection('points').doc(userData.uid).update({
          value: +(+data.value + +points).toFixed(2),
          timestamp: firebase.firestore.Timestamp.now(),
        });
      });

    return state;
  },
};

const userMutationTree: MutationTree<UserStateInterface> = {
  SET_LOGGED_IN(state, value: boolean): void {
    state.loggedIn = value;
  },
  SET_USER(state, data: null | firebase.User): void {
    state.data = data;
  },
};

export default {
  namespaced: true,
  state: userState,
  getters: userGetterTree,
  actions: userActionTree,
  mutations: userMutationTree,
};

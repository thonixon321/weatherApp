import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
  //data goes here
  state: {
    currentData : {}
  },


  //retrieve data with these methods (step 1)
  getters: {
    getCurrentData: state => {
      return state.getCurrentData;
    }
  },


  //set/update/add data with these methods (step 3)
  mutations: {
    updateCurrentData (state, currentData) {
      state.currentData = Object.assign(
        {},
        state.currentData,
        currentData
      );
    }
  },


  //call mutations and getters from here (step 2)
  actions: {
    callUpdateCurrentData (state, currentData) {
      //(mutation name, data-to-pass-in)
      state.commit('updateCurrentData', currentData);
    }
  }

});